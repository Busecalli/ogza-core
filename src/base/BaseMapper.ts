import { IMapper } from "@/core/base/IMapper";
import { Result } from "@/core/utility/ResultType";
import { MapperException } from "@/core/exception/base/MapperException";
import { UnknownCause } from "@/core/cause/UnknownCause";

export abstract class BaseMapper<BaseDomain, BaseDto>
  implements IMapper<BaseDomain, BaseDto>
{
  abstract toDomain(dto: BaseDto): Result<BaseDomain>;
  abstract toDto(model: BaseDomain): Result<BaseDto>;

  protected handleMapperError(
    functionName: string,
  ): Result<BaseDomain | BaseDto> {
    return Result.fail(new MapperException(new UnknownCause(functionName)));
  }

  mapToDomain(dto: BaseDto): Result<BaseDomain> {
    try {
      return this.toDomain(dto);
    } catch (error) {
      console.error(`Error in ${this.constructor.name}.mapToDomain:`, error);
      return this.handleMapperError(this.constructor.name);
    }
  }

  mapToDTO(model: BaseDomain): Result<BaseDto> {
    try {
      return this.toDto(model);
    } catch (error) {
      return this.handleMapperError(this.constructor.name);
    }
  }
}
