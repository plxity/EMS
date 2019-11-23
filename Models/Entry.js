const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  visitorName: {
    type: String,
    required: true
  },
  visitorEmail: {
    type: String,
    required: true
  },
  visitorPhone: {
    type: Number,
    required: true
  },
  visitorCheckin: {
    type: Date,
    default: new Date().getTime(),
  },
  visitorCheckout: {
    type: Date,
    default: null,
  },
  hostName: {
    type: String,
    required: true
  },
  hostEmail: {
    type: String,
    required: true
  },
  hostPhone: {
    type: Number,
    required: true
  }
});

module.exports = UserEntry = mongoose.model("entry", entrySchema);
