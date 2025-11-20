import { Result } from "../utility/ResultType";
import { ServiceException } from "../exception/base/ServiceException";
import { UnknownCause } from "../cause/UnknownCause";
import { IService } from "./IService";

export abstract class BaseService<BaseRequest, BaseResponse>
  implements IService
{
  protected abstract executer(
    request?: BaseRequest,
  ): Promise<Result<BaseResponse>>;

  async execute(request: BaseRequest): Promise<Result<BaseResponse>> {
    try {
      return await this.executer(request);
    } catch (error) {
      return Result.fail<Response>(
        new ServiceException(new UnknownCause(this.constructor.name)),
      );
    }
  }
}
