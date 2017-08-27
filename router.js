const router = require("express").Router();


router.all("*", (req, res)=>{
    res.send("welcome");
});

// router.get("/welcome",(req,res)=>{
//     res.send("Welcome to TAG ContentManger");
// });

module.exports = router;