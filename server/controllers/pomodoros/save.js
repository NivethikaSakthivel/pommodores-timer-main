const { mongoose } = require('../../utils/mongo')
const Account = require('../../models/Account')

const save = async (request, response, next) => {

  // try {
    const {username, name, minutes} = request.body

    Account.findOneAndUpdate(
      {username: username},
      {$push: {completedPomodoros: {name: name, minutes: minutes}}},
      (err, doc) => {
          if (err) {
              throw err
          }
          response.status(201).send(doc);
      })
      

    // response.status(201).json({
    //   message: 'Succesfully saved pomodoro',
    //   data: newAccount,
    // })
  // }
}



module.exports = save;