import { BaseException } from "../../base/BaseException";
import { ExceptionCode } from "../ExceptionCode";
import { BaseCause } from "../../base/BaseCause";

export class MapperException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.mapper, ExceptionCode.mapper.toString(), cause);
  }
}
