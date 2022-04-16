const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const Joi = require("joi")

const sha256 = require("sha256");
const user = require("../models/newUser");
const validate = require("../utilities/newUserValidation");
const verifyToken = require("../middlewares/verifyToken");


app.use(express.json());

router.post("/createAccount", async (req, res) => {

    const { mail } = req.body;

    // Validate with Joi
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Does the account already exists ?
    let userInfos = await user.findOne({mail})

    if (userInfos) return res.status(400).send("Error! User already exists!")

    // If account doesn't exists, create account and generate token
    
    const newUser = new user({
        mail: req.body.mail,
        password: sha256.x2(req.body.password)
    })

    await newUser.save();

    const token = jwt.sign({id: newUser._id}, "secretKey")

    res.status(200).json({
        user : newUser,
        token
    })

})

router.get("/accountInfos", verifyToken, async (req, res) => {
    
    const userAuth = req.user.id;

    const User = await user.findById(userAuth).select("-password");

    res.send(User);
})

router.post("/editInfos", verifyToken, async (req, res) => {
    const userAuth = req.user.id;
    try {

        const doc = await user.findById(userAuth);
        doc.overwrite({
            nom: req.body.nom,
            prenom: req.body.prenom,
            telephone: req.body.telephone,
            mail: req.body.mail,
            password: sha256.x2(req.body.password)

        })
    
        await doc.save()
    
        res.send(doc);
    } catch (err) {
        res.send(err.message);
    }
    
})


module.exports = router;