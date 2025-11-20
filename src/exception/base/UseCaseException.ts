import { BaseException } from "@/core/base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "@/core/base/BaseCause";

export class UseCaseException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.usecase, ExceptionCode.usecase.toString(), cause);
  }
}
