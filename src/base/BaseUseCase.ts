import { IUsecase } from "@/core/base/IUsecase";
import { Result } from "@/core/utility/ResultType";
import { UseCaseException } from "@/core/exception/base/UseCaseException";
import { UnknownCause } from "@/core/cause/UnknownCause";

export abstract class BaseUseCase<BaseDomain> implements IUsecase<BaseDomain> {
  protected handleUseCaseError(functionName: string): Result<BaseDomain> {
    return Result.fail(new UseCaseException(new UnknownCause(functionName)));
  }

  abstract execute(model: BaseDomain): Promise<Result<BaseDomain>>;

  async executeWithErrorHandling(
    model: BaseDomain,
  ): Promise<Result<BaseDomain>> {
    try {
      return await this.execute(model);
    } catch (error) {
      return this.handleUseCaseError(this.constructor.name);
    }
  }
}
