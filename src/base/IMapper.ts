import { Result } from "../utility/ResultType";

export interface IMapper<BaseDomain, BaseDto> {
  mapToDomain(dto: BaseDto): Result<BaseDomain>;
  mapToDTO(model: BaseDomain): Result<BaseDto>;
}
