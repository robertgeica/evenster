const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PubSchema = new Schema({
  pubImage: {
    type: String
  },
  pubName: {
    type: String,
    required: true
  },
  pubAdress: {
    type: String
  },
  rentPrice: {
    type: Number,
    required: true
  },
  pubCapacity: {
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