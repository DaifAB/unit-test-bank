const express = require('express')
const router = express.Router();
const Gab = require('../modules/gab')
router.get("/", async (req, res) => {
  try {
    const gabs = await Gab.find();
    res.json(gabs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const gab = new Gab({
    creditCard_id: req.body.creditCard_id,
    money_requested: req.body.money_requested
  });

  try {
    const newGab = await gab.save();
    res.status(200).json(newGab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getGab, (req, res) => {
  res.send(res.gab);
});

router.delete("/:id", getGab, async (req, res) => {
  try {
    await res.gab.remove();
    res.json({ message: "gab deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getGab, async (req, res) => {
   try {
    const updateGab = await res.gab.save();
    res.json(updateAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getGab(req, res, next) {
  let gab;
  try {
    gab = await Gab.findById(req.params.id);

    if (gab == null) {
      return res.status(404).json({ message: "No gab found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.gab = gab;
  next();
}
module.exports = router 