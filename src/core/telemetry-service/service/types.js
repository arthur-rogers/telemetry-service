/**
 * @typedef {Object} PreviousAndAverage
 * @property {number} prevSpeed
 * @property {number} avgSpeed
 * @property {number} speedChange
 * @property {number} prevEngineTemp
 * @property {number} avgEngineTemp
 * @property {number} prevFuelLevel
 * @property {number} fuelLevelChangeRate
 * @property {number} distanceTraveledMeters
 * @property {number} maxPossibleDistanceMeters
 * @property {string} prevTimestamp
 * @property {number} timestampAgeSec
 */

/**
 * @typedef {Object} SpeedAggregate
 * @property {number} prevSpeed
 * @property {number} avgSpeed
 * @property {number} speedChange
 */

/**
 * @typedef {Object} EngineTempAggregate
 * @property {number} prevEngineTemp
 * @property {number} avgEngineTemp
 */

/**
 * @typedef {Object} FuelAggregate
 * @property {number} prevFuelLevel
 * @property {number} fuelLevelChangeRate
 */

/**
 * @typedef {Object} DistanceAggregate
 * @property {number} distanceTraveledMeters
 * @property {number} maxPossibleDistanceMeters
 */

/**
 * @typedef {Object} TimestampAggregate
 * @property {string} prevTimestamp
 * @property {number} timestampAgeSec
 */

export {};
