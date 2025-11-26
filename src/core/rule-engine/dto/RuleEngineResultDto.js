//@ts-check
/**
 * @import {IRuleEngineExecutionResult} from "../domain/RuleEngineEntity"
 */

import { DTOError } from '../../errors/DtoError';

/**
 * @class RuleEngineResultDTO
 */
export class RuleEngineResultDTO {
  /**
   * @param {IRuleEngineExecutionResult} data
   */
  constructor(data) {
    if (!data.result || typeof data.result !== 'string') {
      throw new DTOError(
        'result is required and must be a string',
        this.constructor.name
      );
    }

    if (data.reason !== undefined && typeof data.reason !== 'string') {
      throw new DTOError(
        'reason must be a string if provided',
        this.constructor.name
      );
    }

    if (data.effectedBy !== undefined) {
      if (
        !Array.isArray(data.effectedBy) ||
        !data.effectedBy.every((v) => typeof v === 'string')
      ) {
        throw new DTOError(
          'effectedBy must be an array of strings if provided',
          this.constructor.name
        );
      }
    }
    Object.assign(this, data);
  }
}
