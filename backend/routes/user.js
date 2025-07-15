const express = require("express");

const router = express.Router();
// const app = express();
const zod = require("zod");
const {User,Account} = require("../db");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");
const  {authMiddleware} = require("../middleware");

// app.use(express.json());

//signup and sigin routes

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async(req,res)=>{
    // const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs "
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

//..........................Create new Account.............................
    
   await Account.create({
    userId,
    balance:1+Math.random()*10000
   })

//.......................................

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin",async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            message: "Signin Sucessfully",
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddleware,async(req,res)=>{
    const {success} = updateSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error wile updating information"
        })
    }
await User.updateOne(req.body, {
        id: req.userId
    })
    res.json({
        message:"Updated Successfully"
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex" : filter
            }
        },{
            lastName:{
                "$regex" : filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})


module.exports = router;