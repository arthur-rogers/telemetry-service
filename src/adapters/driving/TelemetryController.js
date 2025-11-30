//@ts-check
/**
 * @import {ITelemetry} from '../../core/telemetry-service/domain/TelemetryEntity'
 */
import { TelemetryDTO } from '../../core/telemetry-service/dto/TelemetryDto';
import { GetTelemetryResultPort } from '../../core/telemetry-service/ports/driving/GetTelemetryResultPort';

export class TelemetryController {
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
