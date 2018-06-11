var express = require('express');
var cors = require('cors');
var App = express();
const dataBaseData = require('./dataBase/entry1.json');
var port = process.env.PORT || 3000;

function idFinder(dataBaseData, id) {
  for (let i = 0; i < dataBaseData.length; i++) {
    if (dataBaseData[i].id == id) {
      return dataBaseData[i];
    }
  };
  return false;
}
App.use(cors());
App.get('/', (req, res) => {
  res.status(200).json({
    data: dataBaseData
  });
});
App.get('/:id', (req, res) => {
  var entry = idFinder(dataBaseData, req.params.id);
  if (entry === false) {
    res.status(404).json({
      error: {
        "message": "No record found!"
      }
    });
  }
  else {
    res.status(200).json({
      data: entry
    });
  };
});
App.listen(port);
