const express = require("express");

const router = express.Router();
// const app = express();
const zod = require("zod");
const {User,Account} = require("../db");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");
const  {authMiddleware} = require("../middleware");
const argon2 = require("argon2");

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

    const hashedPassword = await argon2.hash(req.body.password);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

//..........................Create new Account.............................
    
   await Account.create({
    userId,
    balance: parseFloat((1 + Math.random() * 10000).toFixed(2))
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
    });

    if(!user){
        return res.status(411).json({
            message: "User not found"
        });
    }

    const passwordMatch = await argon2.verify(user.password, req.body.password);
    if(!passwordMatch){
        return res.status(411).json({
            message: "Invalid Credentials"
        });
    }

    
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            message: "Signin Successfully",
            token: token
        });
    });


const updateSchema = zod.object({
    // password: zod.string().optional(),
    // firstName: zod.string().optional(),
    // lastName: zod.string().optional(),
    balance: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    const { balance } = req.body;

    // 🟡 Only update Account, not User
    if (balance !== undefined && balance !== "") {
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: Number(balance) } }
        );
    } else {
        return res.status(400).json({
            message: "Balance is required"
        });
    }

    res.json({
        message: "Updated Successfully"
    });
});

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
                "$regex" : filter,
                "$options" : "i"
            }
        },{
            lastName:{
                "$regex" : filter,
                "$options" : "i"

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