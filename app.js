// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const attendanceRoutes = require('./routes/attendanceRoutes');
// const sequelize = require('./config/database');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Connect to the database using Sequelize
// sequelize
//   .sync()
//   .then(() => {
//     console.log('Connected to MySQL database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to database', err);
//   });

// app.use('/', attendanceRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./routes/attendanceRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to the database using Sequelize
sequelize
  .sync()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

app.use('/', attendanceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
