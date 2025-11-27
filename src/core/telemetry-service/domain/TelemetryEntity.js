//@ts-check
/**
 * @typedef ILocation
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} ITelemetry
 * @property {string} vehicleId
 * @property {string} timestamp
 * @property {number} speed
 * @property {number} engineTemp
 * @property {number} fuelLevel
 * @property {ILocation} location
 */

/**
 * @typedef {Object} ITelemetryAggregated
 * @property {boolean} isNewState
 * @property {string} vehicleId
 * @property {number} speed Speed in kmph
 * @property {number} prevSpeed Speed from previous record in kmph
 * @property {number} avgSpeed Average speed in kmph
 * @property {number} speedChange Positive or negative number showing speed change in kmph
 * @property {number} engineTemp Engine temperature in celcius degrees
 * @property {number} prevEngineTemp Previous engine temperature in celcius degrees
 * @property {number} avgEngineTemp Average engine temperature in celcius degrees
 * @property {number} fuelLevel Amount of fuel in liters
 * @property {number} prevFuelLevel Previous amount of fuel in liters
 * @property {number} fuelLevelChangeRate Fuel change delta (measured in percents)
 * @property {number} distanceTraveledMeters Distance traveled since previous telemetry record
 * @property {number} maxPossibleDistanceMeters Possible max distance according to speed metrics
 * @property {string} timestamp Timestamp when current metric was created by sender
 * @property {string} prevTimestamp Timestamp of previous metric creation
 * @property {number} timestampAgeSec Difference between timestamps in seconds to invalidate too old or inconsistent data
 * @property {number} lat Latitude
 * @property {number} lng Longitude
 */

// TODO: think about adding some sort of session id to be able to analyze telemetry over specific intervals and rides
/**
 * @typedef {Object} ITelemetryPersistent
 * @property {string} vehicleId
 * @property {string} timestamp
 * @property {number} speed
 * @property {number} engineTemp
 * @property {number} fuelLevel
 * @property {number} lat
 * @property {number} lng
 * @property {number} avgSpeed
 * @property {number} avgEngineTemp
 * @property {number} distanceTraveledMeters
 * @property {string} status VALID, REJECTED or MANUAL_REVIEW
 * @property {number} lat
 * @property {number} lng
 * @property {string} [reason]
 * @property {Array<string>} [effectedBy]
 */

export {};
