var express = require('express');
var router = express.Router();
var Product = require('../models/product');

//all products
router.get("/products",(req,res, next)=>{
Product.find({},(err, products)=>{
    if(err) return next (err)
    res.render('adminProduct',{products})
})
})
// create page
router.get("/products/create",(req,res, next)=>{
    res.render('productCreated')
});

//creating products
router.post('/products',(req,res,next)=>{
Product.create(req.body,(err, product)=>{
    res.redirect('/admin/products')
})
});

// admin products details
router.get('/produts/:id', (req,res,next)=>{
    let id = req.params.id
    product.findById(id,(err, product)=>{
        if (err) return next(err);
        res.render('adminProductDetails',{product})
    })
})

//admin product edit
router.get('/products/:id/edit',(req,res,next)=>{
   
Product.findById(id,(err, products)=>{
    if(err) return next(err)
    res.render("productEditForm", {product})
})
})
// edit products

router.post('/products/:id',(req,res, next)=>{
    let id = req.params.id
    Product.findByIdByUpdate(id, req.body,(err, product)=>{
        if(err) return next(err)
       res.redirect('/admin/products'+id) 
    })
})

// delete products
router.get('/products/:id/delete', (req, res, next) => {
let id = req.params.id;
Product.findByIdAndDelete(id, (err, product) => {
    if(err) return next(err);
    res.redirect('/admin/products');
})
})


//increment likes
router.get('/products/:id/likes', (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products/' + id);
    })
});

//decrement likes
router.get('/products/:id/dislikes', (req, res, next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/products/' + id);
    })
});








module.exports = router;