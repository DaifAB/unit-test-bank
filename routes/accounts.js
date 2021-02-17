const express = require('express')
const router = express.Router();
const Account = require('../modules/accounts')
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const account = new Account({
    owner_id: req.body.owner_id,
    agency_id: req.body.agency_id,
    solde:req.body.solde
  });

  try {
    const newAccount = await account.save();
    res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getAccount, (req, res) => {
  res.send(res.account);
});

router.delete("/:id", getAccount, async (req, res) => {
  try {
    await res.account.remove();
    res.json({ message: "account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getAccount, async (req, res) => {
   try {
    const updateAccount = await res.account.save();
    res.json(updateAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAccount(req, res, next) {
  let account;
  try {
    account = await Account.findById(req.params.id);

    if (account == null) {
      return res.status(404).json({ message: "No Account found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.account = account;
  next();
}
module.exports = router 