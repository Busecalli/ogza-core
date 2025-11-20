import { BaseException } from "@/core/base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "@/core/base/BaseCause";

export class ControllerException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.controller, ExceptionCode.controller.toString(), cause);
  }
}
