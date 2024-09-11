require('dotenv').config();
const express = require("express");
const mongoose=require("mongoose");
const morgan = require("morgan");
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes');
// const orderRoutes = require('./routes/order.routes');
const router = require('./routes/cart.routes');



const dbURL = process.env.MONGO_URL;

const app =express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded ({extended:false}));
app.use( express.static('images'));

// app.set("view engine",'ejs');

//register the user routes
app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts",router)
// app.use("/api/orders",orderRoutes)


app.get("/",(req,res)=>{
    res.send("Wel come to server");
});



app.listen(8001,()=>{
    mongoose
        .connect(dbURL)
        .then(()=> console.log("Database connection success....."))
        .catch((err)=>console.log(err));
        console.log(`Server start at http://localhost:8001`);
        
});