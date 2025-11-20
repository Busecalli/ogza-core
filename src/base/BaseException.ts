import i18n from "@/presentation/language/i18n";
import { ExceptionCode } from "../exception/ExceptionCode";
import { BaseCause } from "./BaseCause";
import { SWAL_MESSAGES } from "@/domain/constants/SwalMessages";

export class BaseException extends Error {
  readonly code: ExceptionCode;
  readonly message: string;
  readonly cause: BaseCause;

  /* istanbul ignore next */
  constructor(code: ExceptionCode, message: string, cause: BaseCause) {
    super(message);
    this.code = code;
    this.message = message;
    this.cause = cause;
  }

  toString(): string {
    return `${this.message}. ${i18n.global.t(SWAL_MESSAGES.ERROR.ERROR_CODE)} ${
      this.code
    } - ${this.cause.code}`;
  }
}
