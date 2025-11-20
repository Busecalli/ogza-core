import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class MaxLengthCause extends BaseCause {
  constructor(cause: any) {
    super(CauseCode.maxLength, cause);
  }
}
