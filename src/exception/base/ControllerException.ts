import { BaseException } from "../../base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "../../base/BaseCause";

export class ControllerException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.controller, ExceptionCode.controller.toString(), cause);
  }
}
