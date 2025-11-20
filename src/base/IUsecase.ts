import { Result } from "../utility/ResultType";

export interface IUsecase<BaseDomain> {
  execute(model: BaseDomain): Promise<Result<BaseDomain>>;
}
