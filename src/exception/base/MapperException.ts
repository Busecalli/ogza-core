import { BaseException } from "@/core/base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "@/core/base/BaseCause";

export class MapperException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.mapper, ExceptionCode.mapper.toString(), cause);
  }
}
