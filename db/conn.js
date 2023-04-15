const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config({ path: './config.env' });

const ATLAS_URL = process.env.ATLAS_URL;

// mongodb connect
mongoose.connect(ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected.');
  })
  .catch((err) => {
    console.log('Error in Connection!', err);
  });
