import { BaseException } from "@/core/base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "@/core/base/BaseCause";

export class RepositoryException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.repository, ExceptionCode.repository.toString(), cause);
  }
}
