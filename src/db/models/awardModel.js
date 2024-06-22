const { model } = require('mongoose');
const awardSchema = require('../schemas/Award');
const AwardModel = model('Award', awardSchema);

module.exports = AwardModel;
