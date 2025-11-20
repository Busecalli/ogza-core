import { Result } from "../utility/ResultType";
import { ValidationException } from "../exception/ValidationException";
import { ValidationErrorCause } from "../cause/ValidationErrorCause";

export abstract class BaseValueObject<T> {
  protected _value: T;

  protected constructor(value: T) {
    this._value = value;
  }

  protected static createError(message: string): Result<any> {
    return Result.fail(
      new ValidationException(new ValidationErrorCause(message)),
    );
  }

  protected static createSuccess<U>(value: U): Result<U> {
    return Result.ok(value);
  }

  getValue(): T {
    return this._value;
  }
}
