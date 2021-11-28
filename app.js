const express = require('express')
const app = express()
app.use(express.json());
const port = 5000


const productRoute = require("./routes/product");
const companyRoute = require("./routes/company");
const sellerRoute = require("./routes/seller"); 

app.use("/product",productRoute);
app.use("/company",companyRoute);
app.use("/seller",sellerRoute);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
