const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
    ship_date: {
      type: String,
      required: true,
      trim: true
    },
    tracking_number: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    shipping_carrier: {
      type: String,
      required: true,
      trim: true
    },
    shipping_method: {
      type: String,
      required: true,
      trim: true
    },
    tracking_url: {
      type: String,
      required: true,
      trim: true
    },
    timeStamp: {
      type: Date
    }
});

const Tracking = mongoose.model('Tracking', TrackingSchema);

module.exports = { Tracking };
