require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDb = require('./config/db.config');

connectDb();

const app = express();
require('./app')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app lisning : localhost:${PORT}`);
});
