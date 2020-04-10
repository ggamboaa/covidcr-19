const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.set('port', (process.env.PORT || 5000));

// Start node server
app.listen(app.get('port'), function () {
  console.log('Node server is running on port ' + app.get('port'));
});

// const port = process.env.PORT || 8080
// app.listen(port)
// console.log(`app is listening on port: ${port}`)