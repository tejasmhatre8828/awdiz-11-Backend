import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({ message: "All fields asre reuired.", success: false })
        }
        const isUserExists = await User.findOne({ email: email });

        if (!isUserExists) {
            return res.status(404).send({ message: "Email not found", success: false })
        }
        const isPasswordValid = await bcrypt.compare(password, isUserExists.password)

        console.log(isPasswordValid, "isPasswordValid")
        if (!isPasswordValid) {
            return res.status(404).send({ message: "Invalid Password", success: false })
        }

        const token = jwt.sign({ userId: isUserExists._id }, process.env.JWT_SECRET);
        console.log(token, "token")

        res.cookie("token", token, {
            httpOnly: true
        })
        res.status(200).send({ message: "Login successful", success: true, user: { name: isUserExists.name, userId: isUserExists._id } });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in login", success: false })
    }
}

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email, password);

        const isUserExists = await User.findOne({ email: email });
        console.log(isUserExists, "isUserExists");
        if (isUserExists) {
            return res.status(400).send({ message: "Email already exists", success: false })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        // console.log(encryptedPassword, "encryptedPassword", password)
        const newUser = User({ name: name, email, password: encryptedPassword });
        // console.log(newUser, "newUser");
        await newUser.save();
        res.status(201).send({ message: "User registered successfully", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in registration", success: false })
    }

}

export const getCurrentUser = async (req, res) => {
    try {
        // const token = req.cookies.token;
        // console.log("Token from cookies", token)
        console.log("req.userId", req.userId)

        const isUserExists = await User.findById(req.userId)
        if(!isUserExists){
            return res.status(404).json({message: "User not found", success: false})
        }
    
        res.status(200).send({ message: "Login successful", success: true, user: { name: isUserExists.name, userId: isUserExists._id } });
    } catch (error) {
        console.log("error", error)
        res.status(500).send({ message: "Error in getting current user", success: false });
    }
}

