import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class MinLengthCause extends BaseCause {
  constructor(cause: string) {
    super(CauseCode.minLength, cause);
  }
}
