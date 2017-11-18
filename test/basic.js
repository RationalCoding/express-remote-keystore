var test = require('tape')
var erk = require('./../index')
var http = require('http')

var storage = require('node-persist')
var express = require('express')

var app = express()
  
var e = erk()
app.use('/get', e.get)
app.use('/set', e.set)

app.listen(8080)

function set(key, value, cb) {
  http.get('http://localhost:8080/set?key='+key+'&value='+value, function (res) {
    cb()
  })
}

function get (key, cb) {
  http.get('http://localhost:8080/get?key='+key, function (res) {
    var data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      cb(data)
    })
  })
}

test('test get/set/get', function (t) {

  get('abc', data => {
    t.equals(data, '', 'is empty')
    set('abc', '123', () => {
      get('abc', data => {
        t.equals(data, '123', 'is correct value')
        t.end()
      })
    })
  })
})

test('SUMMARY', function (t) {
  t.end()
  process.exit(0)
})