import { BaseDto } from "./BaseDto";

export class BaseEncryptedDto extends BaseDto {
  payload: string;
  tag: string;

  constructor(payload: string, tag: string) {
    super();
    this.payload = payload;
    this.tag = tag;
  }
}
