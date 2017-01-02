const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

mongoose.Promise = global.Promise;
const DB_URL = 'mongodb://localhost:27017/pinche'
let modelFolder = '../models'
mongoose.connect(DB_URL)
mongoose.connection.on('error', (err) => {
  console.error('mongodb connection error: %s', err)
  process.exit(-1)
})
mongoose.connection.once('open', console.log.bind(console, 'mongodb connection success!'))

function jsonFile(baseName) {
  let conf = require(path.join(__dirname, modelFolder, baseName + '.json'))
  let fn = require(path.join(__dirname, modelFolder, baseName + '.js'))
  let schema = new mongoose.Schema(conf.prototype)
  fn(schema)
  let model = mongoose.model(conf.name, schema)
  return model
}
function loadModels () {
  const files = fs.readdirSync(path.join(__dirname, modelFolder));
  let Models = {};
  files.forEach((file) => {
    let ext = path.extname(file).substr(1)
    if (ext === 'json') {
      let baseName = path.basename(file, '.json')
      Models[baseName] = jsonFile(baseName)
    }
  });
  return Models
}

module.exports = loadModels()
