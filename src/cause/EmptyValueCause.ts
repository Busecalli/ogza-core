import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class EmptyValueCause extends BaseCause {
  constructor(cause: string) {
    super(CauseCode.emptyValue, cause);
  }
}
