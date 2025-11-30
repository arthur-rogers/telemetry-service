import mongoose from 'mongoose';

const jsonRuleSchema = new mongoose.Schema({
  name: String,
  conditions: Object,
  event: Object,
});

export const JsonRuleModel = mongoose.model('JsonRuleModel', jsonRuleSchema);
