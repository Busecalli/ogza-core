import { BaseValueObject } from "@/core/base/BaseValueObject";
import { Result } from "@/core/utility/ResultType";
import { ValidationException } from "@/core/exception/ValidationException";
import { NullValueCause } from "@/core/cause/NullValueCause";
import { EmptyValueCause } from "@/core/cause/EmptyValueCause";
import { MinLengthCause } from "@/core/cause/MinLengthCause";
import { MaxLengthCause } from "@/core/cause/MaxLengthCause";
import { VALUE } from "../constants/Value";

export class StringValueObject extends BaseValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(
    value: string | null | undefined,
    isRequired: boolean = VALUE.TRUE,
    fieldName: string = "Değer",
    minLength?: number,
    maxLength?: number,
  ): Result<StringValueObject> {
    // Null/undefined kontrolü
    if (value === null || value === undefined) {
      if (isRequired) {
        return Result.fail(
          new ValidationException(
            new NullValueCause(`${fieldName} zorunludur`),
          ),
        );
      }
      return StringValueObject.createSuccess(new StringValueObject(""));
    }

    // Boş string kontrolü
    if (value.trim().length === 0) {
      if (isRequired) {
        return Result.fail(
          new ValidationException(
            new EmptyValueCause(`${fieldName} boş olamaz`),
          ),
        );
      }
      return StringValueObject.createSuccess(new StringValueObject(""));
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

    return StringValueObject.createSuccess(new StringValueObject(value));
  }

  /**
   * Statik validasyon metodu - sadece string değeri doğrular
   */
  public static validateValue(
    value: string | null | undefined,
    isRequired: boolean = VALUE.TRUE,
    fieldName: string = "Değer",
    minLength?: number,
    maxLength?: number,
  ): Result<string | null> {
    // Null/undefined kontrolü
    if (value === null || value === undefined) {
      if (isRequired) {
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
}
