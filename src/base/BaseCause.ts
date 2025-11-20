import { CauseCode } from "../cause/CauseCode";

export class BaseCause {
  readonly code: CauseCode;
  readonly cause: string;

  /* istanbul ignore next */
  constructor(code: CauseCode, cause: string) {
    this.code = code;
    this.cause = cause;
  }
}
