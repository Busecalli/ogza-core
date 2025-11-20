import { Result } from "@/core/utility/ResultType";
import { BaseValidator } from "@/core/base/BaseValidator";
import { EmailValueObject } from "@/core/value-object/EmailValueObject";
import { StringValidator } from "./StringValidator";
import { VALUE } from "@/core/constants/Value";
import { ValidationException } from "@/core/exception/ValidationException";
import { NotValidEmailCause } from "@/core/cause/NotValidEmailCause";

export class EmailValidator extends BaseValidator<EmailValueObject> {
  validate(model: EmailValueObject): Result<EmailValueObject> {
    if (!model) {
      return this.createError("EmailValueObject zorunludur");
    }

    const email = model.getValue();

    const stringValidation = StringValidator.validateValue(
      email,
      true,
      "E-posta",
      VALUE.UNDEFINED,
      254, // Email maksimum uzunluğu // TODO: GÜNCELLENECEK
    );

    if (stringValidation.isFailure) {
      return Result.fail(stringValidation.getError());
    }

    // Email format kontrolü
    const emailFormatValidation = EmailValidator.againstInvalidEmailFormat(
      email,
      "E-posta",
    );
    if (emailFormatValidation.isFailure) {
      return Result.fail(emailFormatValidation.getError());
    }

    return this.createSuccess(model);
  }

  validateField(fieldName: keyof EmailValueObject, value: any): Result<any> {
    if (fieldName === "getValue" && typeof value === "function") {
      const emailValue = value();

      const validationResult = EmailValidator.validateValue(
        emailValue,
        true,
        "E-posta",
      );
      if (validationResult.isFailure) {
        return Result.fail(validationResult.getError());
      }

      return this.createSuccess(emailValue);
    }

    return this.createError(`Bilinmeyen alan: ${String(fieldName)}`);
  }

  /**
   * Email formatını doğrular
   * @param email - Doğrulanacak email değeri
   * @param fieldName - Hata mesajları için alan adı
   * @returns Başarı veya başarısızlığı gösteren Result
   */
  public static againstInvalidEmailFormat(
    email: string | null | undefined,
    fieldName: string = "E-posta",
  ): Result<string> {
    // Null/value.undefined kontrolü
    if (email === null || email === VALUE.UNDEFINED) {
      return Result.fail(
        new ValidationException(
          new NotValidEmailCause(`${fieldName} zorunludur`),
        ),
      );
    }

    // Email format kontrolü
    if (!VALUE.EMAIL_REGEX.test(email)) {
      return Result.fail(
        new ValidationException(
          new NotValidEmailCause(
            `Lütfen ${fieldName.toLowerCase()}nızı uygun formatta giriniz`,
          ),
        ),
      );
    }

    return Result.ok(email);
  }

  /**
   * Email string değerini doğrular
   * @param email - Doğrulanacak email değeri
   * @param isRequired - Email'in zorunlu olup olmadığı
   * @param fieldName - Hata mesajları için alan adı
   * @returns Başarı veya başarısızlığı gösteren Result
   */
  public static validateValue(
    email: string | null | undefined,
    isRequired: boolean = VALUE.TRUE,
    fieldName: string = "E-posta",
  ): Result<string | null> {
    // StringValidator ile temel validasyonları yap
    const stringValidation = StringValidator.validateValue(
      email,
      isRequired,
      fieldName,
      VALUE.UNDEFINED,
      254, // Email maksimum uzunluğu
    );

    if (stringValidation.isFailure) {
      return stringValidation;
    }

    // Eğer required değilse ve boş ise null döndür
    if (!isRequired && (!email || email.trim().length === 0)) {
      return Result.ok(null);
    }

    // Email format validasyonları
    const emailFormatValidation = EmailValidator.againstInvalidEmailFormat(
      email!,
      fieldName,
    );
    if (emailFormatValidation.isFailure) {
      return emailFormatValidation;
    }

    return Result.ok(email!);
  }
}
