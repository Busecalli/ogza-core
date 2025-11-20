import { Result } from "../utility/ResultType";
import { BaseValidator } from "../base/BaseValidator";
import { StringValueObject } from "../value-object/StringValueObject";
import { ValidationException } from "../exception/ValidationException";
import { NullValueCause } from "../cause/NullValueCause";
import { EmptyValueCause } from "../cause/EmptyValueCause";
import { MinLengthCause } from "../cause/MinLengthCause";
import { MaxLengthCause } from "../cause/MaxLengthCause";
import { VALUE } from "../constants/Value";

export class StringValidator extends BaseValidator<StringValueObject> {
  validate(model: StringValueObject): Result<StringValueObject> {
    if (!model) {
      return Result.fail(
        new ValidationException(
          new NullValueCause("StringValueObject zorunludur"),
        ),
      );
    }

    const value = model.getValue();

    // String değeri doğrula
    const validationResult = this.validateStringValue(value);
    if (validationResult.isFailure) {
      return Result.fail(validationResult.getError());
    }

    return this.createSuccess(model);
  }

  validateField(fieldName: keyof StringValueObject, value: any): Result<any> {
    if (fieldName === "getValue" && typeof value === "function") {
      const stringValue = value();

      const validationResult = this.validateStringValue(stringValue);
      if (validationResult.isFailure) {
        return Result.fail(validationResult.getError());
      }

      return this.createSuccess(stringValue);
    }

    return Result.fail(
      new ValidationException(
        new NullValueCause(`Bilinmeyen alan: ${String(fieldName)}`),
      ),
    );
  }

  private validateStringValue(
    value: string,
    fieldName: string = "Değer",
    minLength?: number,
    maxLength?: number,
  ): Result<string> {
    // Null/undefined kontrolü
    if (!value) {
      return Result.fail(
        new ValidationException(new NullValueCause(`${fieldName} zorunludur`)),
      );
    }

    // Boş string kontrolü
    if (value.trim().length === 0) {
      return Result.fail(
        new ValidationException(new EmptyValueCause(`${fieldName} boş olamaz`)),
      );
    }

    // Minimum uzunluk kontrolü
    if (minLength !== undefined && value.length < minLength) {
      return Result.fail(
        new ValidationException(
          new MinLengthCause(
            `${fieldName} en az ${minLength} karakter olmalıdır`,
          ),
        ),
      );
    }

    // Maximum uzunluk kontrolü
    if (maxLength !== undefined && value.length > maxLength) {
      return Result.fail(
        new ValidationException(
          new MaxLengthCause(
            `${fieldName} en fazla ${maxLength} karakter olabilir`,
          ),
        ),
      );
    }

    return Result.ok(value);
  }

  /**
   * Statik string değeri doğrulama metodu
   */
  public static validateValue(
    value: string | null | undefined,
    isRequired: boolean = VALUE.TRUE,
    fieldName: string = "Değer",
    minLength?: number,
    maxLength?: number,
  ): Result<string | null> {
    // Null/undefined kontrolü
    if (value === VALUE.NULL || value === VALUE.UNDEFINED) {
      if (isRequired) {
        return Result.fail(
          new ValidationException(
            new NullValueCause(`${fieldName} zorunludur`),
          ),
        );
      }
      return Result.ok(VALUE.NULL);
    }

    // Boş string kontrolü
    if (value.trim().length === VALUE.ZERO) {
      if (isRequired) {
        return Result.fail(
          new ValidationException(
            new EmptyValueCause(`${fieldName} boş olamaz`),
          ),
        );
      }
      return Result.ok(null);
    }

    // Minimum uzunluk kontrolü
    if (minLength !== undefined && value.length < minLength) {
      return Result.fail(
        new ValidationException(
          new MinLengthCause(
            `${fieldName} en az ${minLength} karakter olmalıdır`,
          ),
        ),
      );
    }

    // Maximum uzunluk kontrolü
    if (maxLength !== undefined && value.length > maxLength) {
      return Result.fail(
        new ValidationException(
          new MaxLengthCause(
            `${fieldName} en fazla ${maxLength} karakter olabilir`,
          ),
        ),
      );
    }

    return Result.ok(value);
  }

  /**
   * Null/undefined kontrolü yapar
   */
  public static againstNullOrUndefined(
    value: string | null | undefined,
    fieldName: string = "Değer",
  ): Result<string> {
    if (value === null || value === undefined) {
      return Result.fail(
        new ValidationException(new NullValueCause(`${fieldName} zorunludur`)),
      );
    }
    return Result.ok(value);
  }

  /**
   * Boş string kontrolü yapar
   */
  public static againstEmpty(
    value: string,
    fieldName: string = "Değer",
  ): Result<string> {
    if (value.trim().length === 0) {
      return Result.fail(
        new ValidationException(new EmptyValueCause(`${fieldName} boş olamaz`)),
      );
    }
    return Result.ok(value);
  }

  /**
   * Minimum uzunluk kontrolü yapar
   */
  public static againstMinLength(
    value: string,
    minLength: number,
    fieldName: string = "Değer",
  ): Result<string> {
    if (value.length < minLength) {
      return Result.fail(
        new ValidationException(
          new MinLengthCause(
            `${fieldName} en az ${minLength} karakter olmalıdır`,
          ),
        ),
      );
    }
    return Result.ok(value);
  }

  /**
   * Maksimum uzunluk kontrolü yapar
   */
  public static againstMaxLength(
    value: string,
    maxLength: number,
    fieldName: string = "Değer",
  ): Result<string> {
    if (value.length > maxLength) {
      return Result.fail(
        new ValidationException(
          new MaxLengthCause(
            `${fieldName} en fazla ${maxLength} karakter olabilir`,
          ),
        ),
      );
    }
    return Result.ok(value);
  }

  /**
   * Validasyon kuralları ile string doğrulama yapar
   */
  public static validateWithRules(
    value: string | null | undefined,
    rules: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      fieldName?: string;
    } = {},
  ): Result<string | null> {
    const {
      required = VALUE.TRUE,
      minLength,
      maxLength,
      fieldName = "Değer",
    } = rules;

    // Null/undefined kontrolü
    if (value === null || value === undefined) {
      if (required) {
        return Result.fail(
          new ValidationException(
            new NullValueCause(`${fieldName} zorunludur`),
          ),
        );
      }
      return Result.ok(null);
    }

    // Boş string kontrolü
    if (value.trim().length === 0) {
      if (required) {
        return Result.fail(
          new ValidationException(
            new EmptyValueCause(`${fieldName} boş olamaz`),
          ),
        );
      }
      return Result.ok(null);
    }

    // Minimum uzunluk kontrolü
    if (minLength !== undefined) {
      const minLengthResult = StringValidator.againstMinLength(
        value,
        minLength,
        fieldName,
      );
      if (minLengthResult.isFailure) {
        return minLengthResult;
      }
    }

    // Maximum uzunluk kontrolü
    if (maxLength !== undefined) {
      const maxLengthResult = StringValidator.againstMaxLength(
        value,
        maxLength,
        fieldName,
      );
      if (maxLengthResult.isFailure) {
        return maxLengthResult;
      }
    }

    return Result.ok(value);
  }
}
