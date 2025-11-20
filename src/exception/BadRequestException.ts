import { BaseCause } from "../base/BaseCause";
import { BaseException } from "../base/BaseException";
import { ExceptionCode } from "./ExceptionCode";

export class BadRequestException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.badRequest, ExceptionCode.service.toString(), cause);
  }
}
