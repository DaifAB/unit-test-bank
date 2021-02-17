const express = require('express')
const router = express.Router();
const Upload = require('../modules/upload')
router.get("/", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const upload = new Upload({
    money_provider_id: req.body.money_provider_id,
    gab_id: req.body.gab_id,
    total_up:req.body.total_up
  });

  try {
    const newUpload = await upload.save();
    res.status(200).json(newUpload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getUpload, (req, res) => {
  res.send(res.upload);
});

router.delete("/:id", getUpload, async (req, res) => {
  try {
    await res.upload.remove();
    res.json({ message: "upload deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getUpload, async (req, res) => {
   try {
    const updateUpload = await res.upload.save();
    res.json(updateUpload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getUploads/joinProv', async (req,res) => {
    try {
    
        const uploads = await Upload.aggregate([
            
            { $lookup:
               {
                 from: 'moneyproviders',
                 localField: 'money_provider_id',
                 foreignField: '_id',
                 as: 'moneyprovider'
               }
             }
            ])
                res.json(uploads)
            
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.get('/getUploads/joinGab', async (req,res) => {
    try {
    
        const uploads = await Upload.aggregate([
            
            { $lookup:
               {
                 from: 'gabs',
                 localField: 'gab_id',
                 foreignField: '_id',
                 as: 'gab'
               }
             }
            ])
                res.json(uploads)
            
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

async function getUpload(req, res, next) {
  let upload;
  try {
    upload = await Upload.findById(req.params.id);

    if (upload == null) {
      return res.status(404).json({ message: "No Account found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.upload = upload;
  next();
}
module.exports = router 