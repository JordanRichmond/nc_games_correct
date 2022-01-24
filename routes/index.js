const endPoints = require('../endpoints.json')

exports.index = function (req, res) {
  res.send(endPoints);
}