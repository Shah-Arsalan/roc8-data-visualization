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
  try {
    const { email, firstname, lastname, password } = req.body;
    const newUser = new user({ email, firstname, lastname, password });
    await newUser
      .save()
      .then((savedUser) => {
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
    const { email, password } = req.body;
    const foundUser = await user.find({ email: email });
    if (foundUser.length !== 0) {
      const { lastname, firstname } = foundUser[0];
      if (password === foundUser[0].password) {
        const token = jwt.sign(
          {
            userId: foundUser[0].email,
          },
          secret,
          { expiresIn: "1h" }
        );
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
