import { BaseException } from "@/core/base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "@/core/base/BaseCause";

export class ServiceException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.service, ExceptionCode.service.toString(), cause);
  }
}
