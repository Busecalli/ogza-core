import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class ValidationErrorCause extends BaseCause {
  constructor(cause: string) {
    super(CauseCode.validationError, cause);
  }
}
