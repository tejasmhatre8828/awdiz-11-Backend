import User from "../models/user.schema.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({ message: "All fields asre reuired." })
        }
        const isUserExists = await User.findOne({ email: email });
        if (!isUserExists) {
            return res.status(404).send({ message: "User not found" })
        }
        if (isUserExists.password !== password) {
            return res.status(404).send({ message: "Invalid Password" })
        }

        res.status(200).send({ message: "Login successful" });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in login" })
    }
}

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email, password);

        const isUserExists = await User.findOne({ email: email });
        console.log(isUserExists, "isUserExists");
        if (isUserExists) {
            return res.status(400).send({ message: "Email already exists" })
        }
        const newUser = User({ name: name, email, password });
        // console.log(newUser, "newUser");
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in registration" })
    }
    
}

