const express = require('express')
const router = express.Router();
const Agency = require('../modules/agencies')
router.get("/", async (req, res) => {
  try {
    const agencies = await Agency.find();
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const agency = new Agency({
    name: req.body.name,
    city: req.body.city,
  });

  try {
    const newAgency = await agency.save();
    res.status(200).json(newAgency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getAgency, (req, res) => {
  res.send(res.agency);
});

router.delete("/:id", getAgency, async (req, res) => {
  try {
    await res.agency.remove();
    res.json({ message: "agency deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getAgency, async (req, res) => {
  if (req.body.name != null) {
    res.agency.name = req.body.name;
  }
  if (req.body.city != null) {
    res.agency.city = req.body.city;
  }

  try {
    const updateAgency = await res.agency.save();
    res.json(updateAgency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAgency(req, res, next) {
  let agency;
  try {
    agency = await Agency.findById(req.params.id);

    if (agency == null) {
      return res.status(404).json({ message: "No Agency found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.agency = agency;
  next();
}
module.exports = router 