const express = require('express')
const router = express.Router()
const CreditCard = require('../modules/creditCards')

//Getting all
router.get('/', async (req,res) => {
    try {
        const creditCards = await CreditCard.find()
        res.json(creditCards)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
//Getting one
router.get('/:id', getCreditCard, (req,res) => {
res.send(res.creditCard)
})

//get populate

router.get('/test/a', async (req,res) => {
    try {
    
        const creditCards = await CreditCard.aggregate([
            
            { $lookup:
               {
                 from: 'accounts',
                 localField: 'account_id',
                 foreignField: '_id',
                 as: 'ccdeatails'
               }
             }
            ])
                res.json(creditCards)
            
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
//Creating one
router.post('/', async (req,res) => {
    const creditCard = new CreditCard({
        account_id : req.body.account_id,
        pin : req.body.pin,
        type : req.body.type
    })

    try {
        const newCreditCard = await creditCard.save()
        res.status(201).json(newCreditCard)
    } catch (error) {
        res.status(400).json({message : error.message})
        
    }
})
//Updating one
router.patch('/:id', getCreditCard , async (req,res) => {
    try {
        const updatedCreditCard = await res.creditCard.save()
        res.json(updatedCreditCard)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})
//Deleting one
router.delete('/:id', getCreditCard ,async (req,res) => {
    try {
        await res.creditCard.remove()
        res.json({message : 'Deleted Cc'})
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
})

async function getCreditCard(req, res, next) {
    try {
        creditCard = await CreditCard.findById(req.params.id)
        if (creditCard == null) {
            return res.status(404).json({message : 'Cannot find owner'})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }

    res.creditCard = creditCard
    next()
}

module.exports = router 