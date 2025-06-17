const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: String,
  email: String,
  domain: String,
  subscription: String, // use "plan" or "subscription" consistently
  status: String,
  products: Number,
  createdDate: String,
  products: Number
});

module.exports = mongoose.model('Tenant', tenantSchema);
