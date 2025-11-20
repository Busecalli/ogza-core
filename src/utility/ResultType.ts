import { VALUE } from "@/core/constants/Value";
import { BaseException } from "../base/BaseException";

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: BaseException | string;
  private value: T | any;

  public constructor(
    isSuccess: boolean,
    value: T | any,
    error: BaseException | string,
  ) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue(): T | any {
    return this.value;
  }

  public getError() {
    return this.error;
  }

  public getErrorMessage(): string {
    if (typeof this.error === "string") {
      return this.error;
    }

    if (this.error instanceof BaseException) {
      return `${this.error.cause.cause} Hata Kodu: ${this.error.code}${this.error.cause.code}`;
    }

    return "Unknown error";
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, value, VALUE.EMPTY);
  }

  public static fail<U>(error: BaseException | string): Result<U> {
    return new Result<U>(false, null, error);
  }
}
