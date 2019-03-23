// require to read .env file
require('dotenv').config();

// setup express js
const app = require('./src/app');

app.listen(process.env.SERVER_PORT, function(){
  console.log(`Node server listening on port ${process.env.SERVER_PORT}`);
});
