const express = require('express');
const router = express.Router();
router.use(express.json());
const sellerList = require("../module/seller");
app.get('/', (req, res) => res.send('seller api'));

//add new seller

router.post("/add", (req, res) => {
    const { seller } = req.body;
    sellerList.push(seller);

    res.json({data : "Seller added!"});
});

//fetch seller details based on product name
router.get("/:productName", (req, res) => {
    const productName = req.params.productName;
    const productList = require("../models/product");
    var sellers = [];
    const product = productList.filter((prd) => (prd.title === productName));

    if(product.length > 0){
        sellers = sellerList.filter((slr) => (slr.sid === product[0].sid));
    } else{
        sellers = "No product found :(!"
    }

    res.json({data : sellers});
});

//update seller (add/remove products)

router.put("/change/:id", (req, res) => {
    const sellerID = req.params.id;
    const { product } = req.body;
    const seller = sellerList.filter((seller) => seller.sid=== sellerID);

    if(seller.length > 0){
        sellerList[sellerList.indexOf(seller[0])].pid = product;
        res.json({data : "Seller's product changed!"});
    }else{
        res.json({data : "Seller not found :(!"});
    }
});


router.get("/list",(req,res) => {
    res.json({data : sellerList});
});

router.delete("/delete/:id", (req, res) => {
    const sellerID = req.params.id;
    const seller = sellerList.filter((seller) => seller.sid=== sellerID);

    if(seller.length > 0){
        const sellerIndex = sellerList.indexOf(seller[0]);
        sellerList.splice(sellerIndex,1);
        res.json({data : "Seller deleted!"});
    } else {
        res.json({data : "Seller not found :(!"});
    }
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));