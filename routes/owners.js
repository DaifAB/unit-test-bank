const express = require('express')
const router = express.Router()
const Owner = require('../modules/owners')

//Getting all
router.get('/', async (req,res) => {
    try {
        const owners = await Owner.find()
        res.json(owners)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
//Getting one
router.get('/:id', getOwner, (req,res) => {
res.send(res.owner)
})
//Creating one
router.post('/', async (req,res) => {
    const owner = new Owner({
        first_name : req.body.first_name,
        phone : req.body.phone,
        cin : req.body.cin
    })

    try {
        const newOwner = await owner.save()
        res.status(201).json(newOwner)
    } catch (error) {
        res.status(400).json({message : error.message})
        
    }
})
//Updating one
router.patch('/:id', getOwner , async (req,res) => {
    if (req.body.first_name != null) {
        res.owner.first_name = req.body.first_name
    }
    if (req.body.phone != null) {
        res.owner.phone = req.body.phone
    }
    if (req.body.cin != null) {
        res.owner.cin = req.body.cin
    }

    try {
        const updatedOwner = await res.owner.save()
        res.json(updatedOwner)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})
//Deleting one
router.delete('/:id', getOwner ,async (req,res) => {
    try {
        await res.owner.remove()
        res.json({message : 'Deleted Owner'})
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
})

async function getOwner(req, res, next) {
    try {
        owner = await Owner.findById(req.params.id)
        if (owner == null) {
            return res.status(404).json({message : 'Cannot find owner'})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }

    res.owner = owner
    next()
}

module.exports = router 