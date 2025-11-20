import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class UnknownCause extends BaseCause {
  constructor(cause: any) {
    super(CauseCode.unknown, cause);
  }
}
