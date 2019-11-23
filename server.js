const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
connectDB();
app.use(express.json({ extended: false }));
app.use(cors());
app.use('/api/entry', require('./Routes/api/UserEntry'));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

