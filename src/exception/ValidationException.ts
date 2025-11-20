import { BaseCause } from "../base/BaseCause";
import { BaseException } from "../base/BaseException";
import { ExceptionCode } from "./ExceptionCode";

export class ValidationException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.validation, ExceptionCode.validation.toString(), cause);
  }
}
