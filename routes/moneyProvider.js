const express = require('express')
const router = express.Router();
const MoneyProvider = require('../modules/moneyProvider')
router.get("/", async (req, res) => {
  try {
    const moneyProvider = await MoneyProvider.find();
    res.json(moneyProvider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const moneyProvider = new MoneyProvider({
    matricule: req.body.matricule
  });

  try {
    const newMoneyProvider = await moneyProvider.save();
    res.status(200).json(newMoneyProvider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getMoneyProvider, (req, res) => {
  res.send(res.moneyProvider);
});

router.delete("/:id", getMoneyProvider, async (req, res) => {
  try {
    await res.moneyProvider.remove();
    res.json({ message: "money Provider deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getMoneyProvider, async (req, res) => {
   try {
    const updateMoneyProvider = await res.moneyProvider.save();
    res.json(updateMoneyProvider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getMoneyProvider(req, res, next) {
  let moneyProvider;
  try {
    moneyProvider = await MoneyProvider.findById(req.params.id);

    if (moneyProvider == null) {
      return res.status(404).json({ message: "No Account found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.moneyProvider = moneyProvider;
  next();
}
module.exports = router 