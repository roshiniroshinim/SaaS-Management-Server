const mongoose = require('mongoose');

const productFeaturesSchema = new mongoose.Schema({
    id: String,
    name: String,
    enabled: Boolean
})

const tenantsSchema = new mongoose.Schema({
    tenantsName: String,
    domain: String,
    email: String,
    subscription: String,
    status: String,
    products: Number,
    features: [productFeaturesSchema],
    createdDate: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('TenantList', tenantsSchema);
