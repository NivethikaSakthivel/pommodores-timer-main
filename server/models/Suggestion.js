const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    /*
      document ID is set by default via MongoDB - next line is deprecated
      _id: mongoose.Schema.Types.ObjectId,
    */

    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
  }
)

// {title: 'BBC sport', url: 'https://www.bbc.co.uk/sport', category: 'sport'},
// {title: 'Go for a walk', url: '', category: 'exercise'},
// {title: 'Guess the weather in Norway', url: 'https://www.bbc.co.uk/weather/3143244', category: 'fun'}

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = 'Suggestion'

module.exports = mongoose.model(modelName, instance)
