const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')
const Suggestion = require('../../models/Suggestion')

async function allSuggestions(request, response, next) {
    Suggestion.find({},
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc);
        })
    }

module.exports = allSuggestions