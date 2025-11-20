import { BaseValueObject } from "@/core/base/BaseValueObject";
import { Result } from "@/core/utility/ResultType";
import { EmailValidator } from "@/core/validator/EmailValidator";
import { VALUE } from "../constants/Value";

export class EmailValueObject extends BaseValueObject<string> {
  private constructor(email: string) {
    super(email);
  }

  static create(
    email: string,
    isRequired: boolean = VALUE.TRUE,
    fieldName: string = "E-posta",
  ): Result<EmailValueObject> {
    const validationResult = EmailValidator.validateValue(
      email,
      isRequired,
      fieldName,
    );

    if (validationResult.isFailure) {
      return Result.fail(validationResult.getError());
    }

    const validatedEmail = validationResult.getValue();

    if (validatedEmail === null) {
      return EmailValueObject.createSuccess(new EmailValueObject(""));
    }

    return EmailValueObject.createSuccess(new EmailValueObject(validatedEmail));
  }
}
