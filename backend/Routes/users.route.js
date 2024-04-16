import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

dotenv.config(); 

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));

const secret = process.env.AUTH_SECRET;

router.route("/signup").post(async (req, res) => {
  console.log("coming in signup");
  console.log("the req body is", req.body);
  try {
    console.log("coming in signup 2");
    const { email, firstname, lastname, password } = req.body;
    console.log("the email", email);
    const newUser = new user({ email, firstname, lastname, password });
    await newUser
      .save()
      .then((savedUser) => {
        console.log("going forward");
        res.status(201).json({ success: true, message: "User Created" });
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.code == 11000);
        if (err.code == 11000) {
          res
            .status(422)
            .json({ success: false, message: "User already exists" });
          return;
        } else {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error in code" });
          return;
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    console.log("in login api");
    const { email, password } = req.body;
    console.log("email , password", email, password);
    const foundUser = await user.find({ email: email });
    if (foundUser.length !== 0) {
      console.log("The found user is", foundUser);
      console.log("founduser.password", foundUser[0].password);
      console.log("the email of founduser is", foundUser[0].email);
      const { lastname, firstname } = foundUser[0];
      console.log("last name is", lastname);
      console.log("fistname is", firstname);
      if (password === foundUser[0].password) {
        console.log("password match");
        console.log("secret is" , secret);
        const token = jwt.sign(
          {
            userId: foundUser[0].email,
          },
          secret,
          { expiresIn: "1h" }
        );
        console.log("the token is", token)
        res.status(201).json({ email, token, firstname, lastname });
      } else {
        res.status(401).json({ message: "password entered is wrong" });
      }
    } else {
      res.status(404).json({ message: "email entered not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
