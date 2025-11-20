import { BaseCause } from "../base/BaseCause";
import { CauseCode } from "./CauseCode";

export class BadRequestCause extends BaseCause {
  constructor(cause: string) {
    super(CauseCode.badRequest, cause);
  }
}
