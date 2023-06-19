const User = require("../models/user_model.js");


const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find Users' });
  }
};


const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};


const createUser = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const newUser = await User.create({ email, password, isAdmin });
    console.log(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Bus' });
  }
};


const updateUser = async (req, res) => {
  try {
    const { email, score, responses } = req.body;
    console.log(req.body);

    const updateUser = await User.findOneAndUpdate(
      { email },
      { score, responses },
      { new: true }
    );

    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};



const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleteUser = await User.findByIdAndDelete(_id);

    if (deleteUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete User' });
  }
};

const addScore = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { score: score },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: 'Score updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update score' });
  }
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addScore
}