const Account = require('../../models/Account')
const { mongoose } = require('../../utils/mongo')

async function deleteTodos(request, response, next) {
    console.log(request.body)
    console.log(request.body.index)
    console.log(request.params.username)
    const foundAccount = await Account.findOne({
        username: request.params.username
        })

        await foundAccount.todos.splice(request.body.index, 1)
        
        foundAccount.save()
console.log(foundAccount)
}

module.exports = deleteTodos