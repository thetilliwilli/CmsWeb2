const router = require("express").Router();


router.all("*", ()=>{
    res.send("welcome");
});

// router.get("/welcome",(req,res)=>{
//     res.send("Welcome to TAG ContentManger");
// });

module.exports = router;