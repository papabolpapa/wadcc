const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// App setup
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number
});
const User = mongoose.model('User', userSchema);

// CREATE: POST /users
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// READ: GET All /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// READ: GET /users/:id
app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ message: 'User not found' });
      res.send(user);
    } catch (err) {
      res.status(400).send({ error: 'Invalid user ID' });
    }
});
// UPDATE: PUT /users/:id
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE: DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

