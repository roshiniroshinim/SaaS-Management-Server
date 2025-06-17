const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.1g2uc.mongodb.net/tenantdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

const tenantRoutes = require('./routes/tenantRoutes');
app.use('/api/tenants', tenantRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
