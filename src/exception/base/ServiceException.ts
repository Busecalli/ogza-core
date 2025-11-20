import { BaseException } from "../../base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "../../base/BaseCause";

export class ServiceException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.service, ExceptionCode.service.toString(), cause);
  }
}
