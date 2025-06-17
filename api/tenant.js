// api/tenant.js
const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');

// 🔁 GET all tenants
router.get('/tenants', async (req, res) => {
  const tenants = await Tenant.find();
  res.json(tenants);
});

// ➕ POST - Add new tenant
router.post('/tenants', async (req, res) => {
  try {
    const newTenant = new Tenant(req.body);
    await newTenant.save();
    res.status(201).json({ message: 'Tenant created' });
    console.log("Products Added");
  } catch (err) {
    res.status(500).json({ error: 'Error saving tenant' });
  }
});

// ✏️ PUT - Update tenant
router.put('/tenants/:id', async (req, res) => {
  try {
    await Tenant.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Tenant updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating tenant' });
  }
});

// ❌ DELETE - Remove tenant
router.delete('/tenants/:id', async (req, res) => {
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tenant deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting tenant' });
  }
});

module.exports = router;
