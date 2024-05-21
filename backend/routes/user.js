const express = require("express");
const {User} = require("../db");
const {addUser,verifyUser,changeUser} = require("../types");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config')
const router = express.Router();
const {authverification} = require('../middleware');


// change the user name,email,password

router.put("/" , authverification,async(req,res)=>{
    const userBody = req.body();
    const userParse = changeUser.safeParse(userBody);

    if(userParse.success)
    {
        try
        {
            await User.updateOne({ _id: req.userId }, userBody);
        }
        catch(error)
        {
            res.status(400).send("Invalid change user data");
            return;
        }
    }
    else
    {
        res.status(400).send("Invalid change user data");
        return;
    }
})

// SignUp
router.post("/signup", async(req, res) => {
    const userbody = req.body();
    const userParse = addUser.safeParse(userbody); // zod verification

    if(userParse.success)
    {
        try
        {
            const exituser = await User.findOne({
                email:userbody.email
            }); // checking if user email exits

            if(exituser)
            {
                res.status(400).send("User already exists");
                return;
            }
            const NUser = await User.create(userbody);
            const userId = NUser._id;

            const token = jwt.sign({
                userId
            },JWT_SECRET)

            res.status(201).json({
                msg: "User created successfully",
                token:token
            });
        }
        catch
        {
            res.status(400).send("Invalid add user data");
            return;
        }
    }
    else
    {
        res.status(400).send("Invalid add user data");
        return;
    }
});

// SignIn
router.post("/signin",async(req,res) => {
    const userBody = req.body();
    const userParse = verifyUser.safeParse(userBody);

    if(userParse.success)
    {
        try
        {
            const exituser = await User.findOne({
                email:userBody.email,
                password:userBody.password
            });

            if(exituser)
            {
                const userId = exituser._id;
                const token = jwt.sign({
                    userId
                },JWT_SECRET)

                res.status(200).json({
                    msg: "User login successfully",
                    token:token
                });
            }
            else
            {
                res.status(400).send("user does not exits !");
                return;
            }
        }
        catch
        {
            res.status(400).send("Invalid Login user data");
            return;
        }
    }
    else
    {
        res.status(400).send("Invalid Login user data");
        return;
    }
    
})


module.exports = router;