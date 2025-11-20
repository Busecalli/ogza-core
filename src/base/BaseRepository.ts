import { UnknownCause } from "../cause/UnknownCause";
import { RepositoryException } from "../exception/base/RepositoryException";
import { Result } from "../utility/ResultType";
import { IRepository } from "./IRepository";

export abstract class BaseRepository<BaseRequest, BaseResponse>
  implements IRepository
{
  protected abstract executer(
    request: BaseRequest,
  ): Promise<Result<BaseResponse>>;

  async execute(request: BaseRequest): Promise<Result<BaseResponse>> {
    try {
      return await this.executer(request);
    } catch (error) {
      return Result.fail<Response>(
        new RepositoryException(new UnknownCause(this.constructor.name)),
      );
    }
  }
}
