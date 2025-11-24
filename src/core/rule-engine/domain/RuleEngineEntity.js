//@ts-check
/**
 * @module RuleEngineDomain
 */

/**
 * @typedef {Object} IEngineTelemetryData
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
 * @property {number} timestamp Timestamp when current metric was created by sender
 * @property {number} prevTimestamp Timestamp of previous metric creation
 * @property {number} timestampAgeSec Difference between timestamps in seconds to invalidate too old or inconsistent data
 * @property {number} lat Latitude
 * @property {number} lng Longitude
 */

/**
 * @typedef {'REJECTED' | 'MANUAL_REVIEW' | 'VALID'} RuleEngineResultType
 */

/** @type {Record<string, RuleEngineResultType>} */
export const RuleResults = {
  Valid: 'VALID',
  Rejected: 'REJECTED',
  Manual: 'MANUAL_REVIEW',
};

/**
 * @typedef {Object} IRuleEngineExecutionResult
 * @property {RuleEngineResultType} result
 * @property {string} [reason] A brief descriprion of what caues the status
 * @property {Array<string>} [effectedBy] List of metrics which effected the result
 */

export {};
