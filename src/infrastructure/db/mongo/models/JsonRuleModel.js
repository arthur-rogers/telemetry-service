//@ts-check
import mongoose from 'mongoose';

const jsonRuleSchema = new mongoose.Schema(
  {
    name: String,
    conditions: Object,
    event: Object,
  },
  {
    toObject: {
      transform: function (doc, ret) {
        // @ts-ignore
        delete ret._id;
      },
    },
  }
);

export const JsonRuleModel = mongoose.model('json_rules', jsonRuleSchema);
