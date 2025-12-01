//@ts-check
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Telemetry = sequelize.define(
  'Telemetry',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sessionId: {
      type: DataTypes.STRING(40),
      field: 'session_id',
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.STRING(20),
      field: 'vehicle_id',
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      field: '_timestamp',
      get() {
        const raw = this.getDataValue('timestamp');
        return raw ? raw.toISOString() : null;
      },
    },
    speed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('speed'));
      },
    },
    engineTemp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'engine_temp',
      get() {
        return parseFloat(this.getDataValue('engineTemp'));
      },
    },
    fuelLevel: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'fuel_level',
      get() {
        return parseFloat(this.getDataValue('fuelLevel'));
      },
    },
    lat: {
      type: DataTypes.DECIMAL(7, 5),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('lat'));
      },
    },
    lng: {
      type: DataTypes.DECIMAL(7, 5),
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('lng'));
      },
    },
    avgSpeed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'avg_speed',
      get() {
        return parseFloat(this.getDataValue('avgSpeed'));
      },
    },
    avgEngineTemp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'avg_engine_temp',
      get() {
        return parseFloat(this.getDataValue('avgEngineTemp'));
      },
    },
    distanceTraveledMeters: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: 'distance_traveled_meters',
      get() {
        return parseFloat(this.getDataValue('distanceTraveledMeters'));
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    reason: { type: DataTypes.STRING(150) },
    effectedBy: {
      type: DataTypes.STRING(50),
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('effectedBy', value.join(','));
        }
      },
      get() {
        return this.getDataValue('effectedBy')?.split(',');
      },
      field: 'effected_by',
    },
  },
  {
    tableName: 'telemetry',
    timestamps: false,
  }
);
