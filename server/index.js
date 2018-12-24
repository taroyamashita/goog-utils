const express = require("express");
const app = express();

let PORT = 7069 || process.env.PORT || 7069;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
