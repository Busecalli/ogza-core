import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class NullValueCause extends BaseCause {
  constructor(cause: any) {
    super(CauseCode.nullValue, cause);
  }
}
