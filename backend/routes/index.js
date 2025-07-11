 const express = require('express');
 const userRouter = require("./user");
 const accountRouter = require("./account");

 const router = express.Router();
//  module.exports = router;

router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports = router;