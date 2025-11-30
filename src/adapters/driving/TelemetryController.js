//@ts-check
/**
 * @import {ITelemetry} from '../../core/telemetry-service/domain/TelemetryEntity'
 */
import { TelemetryDTO } from '../../core/telemetry-service/dto/TelemetryDto.js';
import { GetTelemetryResultPort } from '../../core/telemetry-service/ports/driving/GetTelemetryResultPort.js';
import { GetTelemetryResultUseCase } from '../../core/telemetry-service/usecases/GetTelemetryReulstUseCase.js';
import { RulesRepository } from '../driven/RulesEngine/RulesRepository.js';
import { TelemetryRepository } from '../driven/TelemetryService/TelemetryRepository.js';

class TelemetryController {
  /**
   *
   * @param {GetTelemetryResultPort} telemetryResult
   */
  constructor(telemetryResult) {
    this.telemetryResult = telemetryResult;
  }

  /**
   *
   * @param {ITelemetry} body
   */
  async getResult(body) {
    try {
      const data = new TelemetryDTO(body);
      return await this.telemetryResult.getResults(data);
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
