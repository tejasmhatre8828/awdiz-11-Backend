import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Seller from "../models/seller.schema.js";


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({ message: "All fields asre reuired.", success: false })
        }
        const isUserExists = await User.findOne({ email: email });

        if (!isUserExists) {
            var isSellerExists = await Seller.findOne({ email: email });
        }
        console.log(isUserExists, "isUserExists");
        if (!isUserExists && !isSellerExists) {
            return res.status(404).json({ message: "Email not found", success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, isUserExists ? isUserExists.password : isSellerExists.password)

        console.log(isPasswordValid, "isPasswordValid")
        if (!isPasswordValid) {
            return res.status(404).send({ message: "Invalid Password", success: false })
        }

        // 1. token generation

        const token = jwt.sign({ userId: isUserExists ? isUserExists._id : isSellerExists._id, role: isUserExists ? "user" : "seller", }, process.env.JWT_SECRET);
        console.log(token, "token")

        // 2. set cookies - token

        res.cookie("token", token, {
            httpOnly: true
        })
        res.status(200).send({
            message: "Login successful", success: true, user: {
                name: isUserExists ? isUserExists.name : isSellerExists.name,
                userId: isUserExists ? isUserExists._id : isSellerExists._id,
                role: isUserExists ? "user" : "seller",
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in login", success: false })
    }
}

export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(name, email, password);

        const isUserExists = await User.findOne({ email: email });
        console.log(isUserExists, "isUserExists");
        if (role == "user") {
            const isUserExistForOne = await User.findOne({ email: email });
            console.log(isUserExistForOne, "isUserExistForOne");
            if (isUserExistForOne) {
                return res
                    .status(400)
                    .json({ message: "Email already exists.", success: false });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            // console.log(encryptedPassword, "encryptedPassword", password);
            const newUser = User({ name: name, email, password: encryptedPassword });
            // console.log(newUser, "newUser");
            await newUser.save();

            return res
                .status(201)
                .json({ message: "User Registered Successfully", success: true });
        } else if (role == "seller") {
            const isSellerExistForOne = await Seller.findOne({ email: email });
            console.log(isSellerExistForOne, "isSellerExistForOne");
            if (isSellerExistForOne) {
                return res
                    .status(400)
                    .json({ message: "Email already exists.", success: false });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            // console.log(encryptedPassword, "encryptedPassword", password);
            const newSeller = Seller({
                name: name,
                email,
                password: encryptedPassword,
            });
            // console.log(newSeller, "newSeller");
            await newSeller.save();
            return res
                .status(201)
                .json({ message: "Seller Registered Successfully", success: true });
        } else if (role == "admin") {
        }
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in Registering user", success: false });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        // const token = req.cookies.token;
        // console.log("Token from cookies", token)
        console.log("req.userId", req.userId)

        const isUserExists = await User.findById(req.userId);
        if (!isUserExists) {
            var isSellerExists = await Seller.findById(req.userId);
            if (!isSellerExists) {
                return res
                    .status(404)
                    .json({ message: "User not found", success: false });
            }

            return res.status(200).json({
                message: "Login Successful",
                success: true,
                user: {
                    name: isSellerExists.name,
                    userId: isSellerExists._id,
                    role: "seller",
                },
            });
        }

        return res.status(200).json({
            message: "Login Successful",
            success: true,
            user: { name: isUserExists.name, userId: isUserExists._id, role: "user" },
        });
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in getting current user", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ success: true, message: "Logout succesfull." });
    } catch (error) {
        console.log("error", error);
        res
            .status(500)
            .send({ message: "Error in getting current user", success: false });
    }
};