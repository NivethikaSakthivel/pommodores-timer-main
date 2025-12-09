const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')

async function saveTodos(request, response, next) {
    Account.findOneAndUpdate(
        {username: request.body.username},
        {$push: {todos: request.body.todo}},
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc);
        })
}

module.exports = saveTodos