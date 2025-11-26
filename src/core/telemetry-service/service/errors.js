export class MissingValidTelemetryError extends Error {
  /**
   * @param {string} msg - Error message
   * @param {string} effectedBy - Optional numeric code
   */
  constructor(msg, effectedBy) {
    super(msg);
    (this.name = 'MissingValidTelemetryError'), (this.effectedBy = effectedBy);
  }
}
