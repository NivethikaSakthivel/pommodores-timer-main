const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')
const Suggestion = require('../../models/Suggestion')

async function getSuggestions(request, response, next) {
    if (request.params.username === null) {

    } else {
    const preferences = await Account.findOne({username: request.params.username})

    Suggestion.find({ category:{$in: preferences.categoryPreferences} },
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc);
        })
    }
}

module.exports = getSuggestions