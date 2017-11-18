var storage = require('node-persist')
var url = require('url')

store = {}

store.get = function (req, res, next) {
  var key = String(url.parse(req.url, true).query.key)
  var value = storage.getItemSync(key)
  res.send(value, {'Content-Type': 'text/plain'}, 200)
}

store.set = function (req, res, next) {
  var key = String(url.parse(req.url, true).query.key)
  var value = String(url.parse(req.url, true).query.value)
  storage.setItemSync(key, value)
  res.status(200)
  res.end()
}

module.exports = function (opts) {
  storage.initSync(opts)
  return store
}