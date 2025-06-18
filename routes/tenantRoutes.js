const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');

// 🔁 Get all tenants
router.get('/', async (req, res) => {
  const tenants = await Tenant.find();
  res.json(tenants);
});

// 🔁 Add new tenant
router.post('/', async (req, res) => {
  const tenant = new Tenant(req.body);
  await tenant.save();
  res.json(tenant);
});

// 🔁 Update tenant
router.put('/:id', async (req, res) => {
  const updated = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
  console.log('edit')
});

// 🔁 Delete tenant
router.delete('/:id', async (req, res) => {
  await Tenant.findByIdAndDelete(req.params.id);
  res.json({ success: true });
  console.log('delete...')
});

router.get('/:id/features', async (req, res) => {
    try {
        const { id } = req.params;
        const tenants = await Tenant.findById(id);
        res.status(201).json(tenants);
        // console.log('Get Features Data!');
    } catch (err) {
        res.status(500).json({ error: "Failed to Fetch Data" });
        console.log(err);
    }
})

router.put('/:id/features', async (req, res) => {
    try {
        const { id } = req.params;
        const { features } = req.body;
        const updatedTenant = await Tenant.findByIdAndUpdate(id, { features: features }, { new: true });
        if (!updatedTenant) return res.status(404).json({ error: 'Tenant not found' });
        res.status(200).json({ msg: 'Features updated successfully!', tenant: updatedTenant });
        console.log('Features updated successfully!')
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update features" });
    }
});

module.exports = router;


