const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rootRoute = require('./routes/rootRoute');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', rootRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
