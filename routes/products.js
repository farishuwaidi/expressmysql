const express = require('express')
var router =  express.Router()
const Validator = require('fastest-validator')
const v = new Validator()
const { Products } = require("../models");


//GET
router.get("/", async (req, res, next)=>{
    const products = await Products.findAll()
    return res.json({
        status: 200,
        message: "success get all data",
        data: products,
    })
})

//GET DATA BY ID
router.get("/:id", async (req, res, next)=>{
    const id = req.params.id
    //Check id in table product
    let product = await Products.findByPk(id)
    if(!product) {
        return res.status(404).json({ status: 404, message: "Data tidak notfound" })
    } else {
        return res.status(404).json({ status: 200, message: "Success get data", data: product })
    }
})

//POST
router.post("/", async (req, res,next) => {
    //VALIDATION
    const schema = {
        name: "string",
        price: "number",
        stock: "number"
    }
    const validate = v.validate(req.body, schema)

    if(validate.length) {
        return req.status(400).json(validate)
    }
    //PROSES CREATE
    const product = await Products.create(req.body)
    res.json({
        status: 200,
        message: "Success create data",
        data: product,
    })
})

//PUT
router.put("/:id", async (req,res, next) => {
    const id = req.params.id
    let product = await Products.findByPk(id)
    if(!product) {
        return res.status(404).json({ status: 404, message: "Data tidak notfound" })
    }

    //Validation
    const schema = {
        name: "string|optional",
        price: "number|optional",
        stock: "number|optional"
    }
    const validate = v.validate(req.body, schema)
    if(validate.length) {
        return res.status(400).json(validate)
    }
    //Proses Update
    product = await product.update(req.body)
    res.json({
        status: 200,
        message: "Success update data",
        data: product
    })
})

//DELETE
router.delete("/:id", async (req, res, next)=>{
    const id = req.params.id
    //Check id in table product
    let product = await Products.findByPk(id)
    if(!product) {
        return res.status(404).json({ status: 404, message: "Data tidak notfound" })
    } 
    //Proses delete data
    await product.destroy()
    res.json({
        status: 200,
        message: "success delete data",
    })
})

module.exports = router