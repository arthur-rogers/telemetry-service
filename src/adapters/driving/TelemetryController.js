//@ts-check
import { TelemetryDTO } from '../../core/telemetry-service/dto/TelemetryDto.js';
import { GetTelemetryResultPort } from '../../core/telemetry-service/ports/driving/GetTelemetryResultPort.js';
import { GetTelemetryResultUseCase } from '../../core/telemetry-service/usecases/GetTelemetryReulstUseCase.js';
import { RulesRepository } from '../driven/RulesEngine/RulesRepository.js';
import { TelemetryRepository } from '../driven/TelemetryService/TelemetryRepository.js';

/**
 * @typedef {Object} ControllerResponseHeaders
 * @property {string} XSessionId
 */

/**
 * @typedef {Object} ConstrollerResposnseBody
 * @property {string} result
 * @property {string} [reason]
 */

/**
 * @typedef {Object} ControllerResponse
 * @property {ConstrollerResposnseBody} body
 * @property {ControllerResponseHeaders} headers
 */

class TelemetryController {
  /**
   *
   * @param {GetTelemetryResultPort} telemetryResult
   */
  constructor(telemetryResult) {
    /** @type {GetTelemetryResultPort} */
    this.telemetryResult = telemetryResult;
  }

  /**
   *
   * @param {TelemetryDTO} body
   * @returns {Promise<ControllerResponse>}
   */
  async getResult(body) {
    try {
      console.debug(
        `GetResult incoming data: ${JSON.stringify(body, null, 2)}`
      );
      const data = new TelemetryDTO(body);
      const { result, reason, sessionId } =
        await this.telemetryResult.getResults(data);
      return {
        body: {
          result,
          reason,
        },
        headers: {
          XSessionId: sessionId,
        },
      };
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  }
}

const telemetryRepository = new TelemetryRepository();
const rulesRepository = new RulesRepository();
const usecase = new GetTelemetryResultUseCase(
  telemetryRepository,
  rulesRepository
);
export const controller = new TelemetryController(usecase);
