// // We can /api/ideas to this files in server.js
// const express = require('express');
// const router = express.Router();

// // const Idea = require('../models/Idea');

// // http://localhost:8001/api/todos
// // Get all Ideas Route update to async await or await then
// router.get('/', (req, res) => {
//   // when we use our model is async
//   try {
//     res.json({ success: true, message: 'get all todos ' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Something went worng' }); // send an object this is the common way
//   }
// });

// // get All todos for specifc user using query param (:Userid)
// router.get('/:userid', async (req, res) => {
//   // TODO: fetch the data for spefic user base in the user Id
//   try {
//     //@TODO:  make the model
//     // const idea = await Idea.findById(req.params.id);
//     // TODO: chnage to real data
//     const todos = [
//       {
//         text: '1',
//         date: '233,22',
//       },
//       {
//         text: '1',
//         date: '233,22',
//       },
//     ];
//     res.json({ success: true, data: todos });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: 'Resource not Found' }); // not found
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const ToDo = require('../models/todoModel');

// Create ToDo for a specific user TESTED
router.post('/:userId', async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  try {
    const { userId } = req.params;
    const { title } = req.body;

    const newToDo = new ToDo({
      user: userId,
      title,
    });
    await newToDo.save();

    res
      .status(201)
      .json({ message: 'ToDo created successfully', todo: newToDo });
  } catch (error) {
    console.error('Create ToDo Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all todos for a user TESTED
router.get('/:userId', async (req, res) => {
  console.log('called get todos');
  try {
    const { userId } = req.params;
    const todos = await ToDo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    console.error('Get Todos Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a todo for a user  NOT TESTED
router.get('/:userId/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const todo = await ToDo.findOne({ user: userId, _id: todoId });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Get Todo Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo for a user NOT TESTED
router.put('/:userId/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await ToDo.findOneAndUpdate(
      { user: userId, _id: todoId },
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error('Update Todo Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo for a user TESTED
router.delete('/:userId/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const deletedTodo = await ToDo.findOneAndDelete({
      user: userId,
      _id: todoId,
    });
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete Todo Error');
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
