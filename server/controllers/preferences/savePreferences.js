const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')

async function savePreferences(request, response, next) {

    Account.findOneAndUpdate(
        {username: request.body.username},
        {categoryPreferences: request.body.preferences},
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc);
        })
}

module.exports = savePreferences