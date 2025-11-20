import { BaseDto } from "./BaseDto";

export abstract class BaseRequest extends BaseDto {
  data? = {};
  conditions? = {};
  filter? = {};
  pagination?: any;

  constructor({
    data = {},
    conditions = {},
    filter = {},
    pagination,
  }: {
    data?: { [key: string]: any };
    conditions?: { [key: string]: any };
    filter?: { [key: string]: any };
    pagination?: { page: number; pageSize: number };
  }) {
    super();
    this.data = { ...data };
    this.conditions = { ...conditions };
    this.filter = { ...filter };

    if (pagination) {
      this.pagination = {
        size: pagination.page,
        pageSize: pagination.pageSize,
      };
    }
  }
}
