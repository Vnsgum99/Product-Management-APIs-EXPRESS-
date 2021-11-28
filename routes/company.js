const express = require('express');
const router = express.Router();
//const app = express();
app.use(express.json());
//const port = 5000;
const companyList = require("../module/company");



app.get('/', (req, res) => res.send('company api!'));
//add new company
router.post("/add", (req, res) => {
    const { company } = req.body;
    companyList.push(company);

    res.json({data : "Company added!"});
});

//fetch company details based on product name
router.get("/:productName", (req,res) => {
    const productName = req.params.productName;
    const productList = require("../models/product")
    var companies = [];
    const product = productList.filter((prd) => (prd.title === productName));
    
    if(product.length > 0){
        companies = companyList.filter((cmp) => (cmp.cid === product[0].cid));
    } else {
        companies = "No product found :(!"
    }
    res.json({data : companies});
});

//update company (add/remove products)

router.put("/change/:id", (req, res) => {
    const companyID = req.params.id;
    const { product } = req.body;
    const company = companyList.filter((company) => company.cid === companyID);

    if(company.length > 0){
        companyList[companyList.indexOf(company[0])].pid = product;
        res.json({data : "Company's product changed!"});
    } else {
        res.json({data : "Company not found :(!"});
    }
});


router.get("/list",(req,res) => {
    res.json({data : companyList});
});

router.delete("/delete/:id", (req, res) => {
    const companyID = req.params.id;
    const company = companyList.filter((company) => company.cid === companyID);

    if(company.length > 0){
        var companyIndex = companyList.indexOf(company[0]);
        companyList.splice(companyIndex,1);
        res.json({data : "Company deleted!"});
    } else {
        res.json({data : "Company not found:(!"});
    }
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));