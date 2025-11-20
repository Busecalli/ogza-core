import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class NotValidEmailCause extends BaseCause {
  constructor(cause: any) {
    super(CauseCode.notValidEmail, cause);
  }
}
