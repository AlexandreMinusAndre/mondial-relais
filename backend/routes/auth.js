const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const _ = require("lodash");

const sha256 = require("sha256");
const user = require("../models/newUser");
const validate = require("../utilities/newUserValidation");
app.use(express.json());

router.post("/login", async (req, res) => {
    

    const { mail } = req.body;

    // Validate with Joi
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Does the account already exists ?
    let userInfos = await user.findOne({mail})

    if (!userInfos) return res.status(400).send("Error! Invalid email or password!")

    const token = jwt.sign({id: userInfos._id}, 'secretKey');

    res.send(token);
})

module.exports = router;