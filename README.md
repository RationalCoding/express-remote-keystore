# express-remote-keystore
Express middleware for accessing a keystore over HTTP.

Uses [node-persist](https://github.com/simonlast/node-persist), so not suitable for system without a persistent filesystem.

```javascript

var app = express()
var e = erk()
app.use('/get', e.get)
app.use('/set', e.set)


// example client
http.get('http://localhost:8080/set?key='+key+'&value='+value)
http.get('http://localhost:8080/set?key='+key)
```