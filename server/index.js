const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
let PORT = 7069 || process.env.PORT || 7069;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


