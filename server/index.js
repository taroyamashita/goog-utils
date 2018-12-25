const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
let PORT = 7069 || process.env.PORT || 7069;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get('/', (req, res)=> {
  res.send('howdy world')
})

