import { Result } from "../utility/ResultType";
import { ValidationException } from "../exception/ValidationException";
import { ValidationErrorCause } from "../cause/ValidationErrorCause";

export abstract class BaseValidator<T> {
  public createError(message: string): Result<T> {
    return Result.fail(
      new ValidationException(new ValidationErrorCause(message)),
    );
  }

  public createSuccess(data: T): Result<T> {
    return Result.ok(data);
  }

  abstract validate(model: T): Result<T>;
  abstract validateField(fieldName: keyof T, value: any): Result<any>;

  static create<U>(this: new () => BaseValidator<U>): BaseValidator<U> {
    return new this();
  }
}
