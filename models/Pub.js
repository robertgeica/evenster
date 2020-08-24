const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PubSchema = new Schema({
  userId: {
    type: Object,
    required: true
  },

  pubName: {
    type: String,
    required: true
  },
  rentPrice: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },

  additionalPersonnel: [
    {
      workerType: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ],

  additionalServices: [
    {
      serviceType: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ]

});


module.exports = Pub = mongoose.model('pub', PubSchema);