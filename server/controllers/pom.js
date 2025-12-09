// const Account = require('../../models/Account')

// CountPom: (req, res) => {    
//   const email = req.session.user.email
//   Account.findByIdAndUpdate( req.body.id, {
//     $inc:{"likes.total":1}, $push:{"likes.who": email}
//   } ).exec((err, doc) => {


//     if (err) {
//       throw err;
//     }
//     else {
//       res.status(201).send(doc)
//     }
//     //redirect back to the previous page 
//   })
// }

// module.exports = CountPom