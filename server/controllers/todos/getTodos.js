const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')

async function getTodos(request, response, next) {
    console.log('hi')
    Account.findOne({username: request.params.username},
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc.todos);
        })
}

module.exports = getTodos