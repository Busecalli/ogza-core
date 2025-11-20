import { BaseCause } from "../base/BaseCause";
import { BaseException } from "../base/BaseException";
import { ExceptionCode } from "./ExceptionCode";

export class AuthException extends BaseException {
  constructor(cause: BaseCause) {
    super(ExceptionCode.auth, ExceptionCode.auth.toString(), cause);
  }
}
