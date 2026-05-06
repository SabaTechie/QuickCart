const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // validation
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    //  Hash Password security
    const hashedPassword = await bcrypt.hash(password, 10);




    // creating  user
    const user = new User({
      username,
      fullname,
      email,
      password: hashedPassword
    });

    await user.save();



    res.json({ message: "Signup successful ✅" });

  } catch (err) {
    console.error(err); // shows real error in terminal
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }


//Login Verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }




    // JWT Authentication
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );


    //Response
    res.json({
      message: "Login successful ✅",
      token,
      userId: user._id,
      username: user.username  
    });

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};