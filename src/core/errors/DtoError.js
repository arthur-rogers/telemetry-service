export class DTOError extends Error {
  /**
   *
   * @param {*} msg
   * @param {string} dtoName
   */
  constructor(msg, dtoName) {
    super(msg);
    this.dtoName = dtoName;
  }
}
