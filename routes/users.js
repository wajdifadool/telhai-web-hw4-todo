const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Create User, Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return res.status(409).json({ message: 'user already exist' });
    }
    console.log('not called');
    // todo validation (un the ffrontend)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // save to the datebase
    const myRes = await newUser.save();
    // TODO: dispatch user somewheere , download user data ,
    // save user to local stroage,save user Log in  to session storage
    /**
     * it won't be possible to get the wrong username if there's another username variable in the scope.
     * JavaScript will always prioritize the most immediate variable in the scope. In this case, the username from myRes will be prioritized
     * over any other variable named username in the scope.
     * So, even if there's another username variable in the scope, it won't affect the destructuring of myRes in the .json() method.
     * we can do this:
     * user: { _id: myRes._id, email, username },
     */
    res.status(201).json({
      message: 'User created successfully',
      user: { _id: myRes._id, email: myRes.email, username: myRes.username },
    });
  } catch (error) {
    console.error('Sign Up Error');
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login User , Signin
router.post('/signin', async (req, res) => {
  console.log('clled');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      //   return res.status(401).json({ error: 'User not found' });
      return res.status(401).json({ error: 'Worng credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      //   return res.status(401).json({ error: 'Invalid password' });
      return res.status(401).json({ error: 'Worng credentials' });
    }
    res.status(200).json({
      message: 'Login successful',
      user: { _id: user._id, email: user.email, username: user.username },
    });

    // TODO: dispatch user somewheere , download user data ,
    // save user to local stroage,save user Log in  to session storage
  } catch (error) {
    console.error('Sign In Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
