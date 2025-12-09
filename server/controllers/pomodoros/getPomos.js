const { mongoose } = require('../../utils/mongo')
const Account = require('../../models/Account')

const getPomos = async (request, response, next) => {

    // try {

  
      Account.find(
        {username: request.params.username},
        (err, doc) => {
            if (err) {
                throw err
            }
            response.status(201).send(doc.map(oneDoc=> oneDoc.completedPomodoros));
        })
  }
  
  
  
  module.exports = getPomos;