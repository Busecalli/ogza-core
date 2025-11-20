import { BaseCause } from "../base/BaseCause";
import { BaseException } from "../base/BaseException";
import { ExceptionCode } from "./ExceptionCode";

export class UnknownException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.unknown, ExceptionCode.unknown.toString(), cause);
  }
}
