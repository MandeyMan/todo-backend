const Todo = require('../models/Todo');


// get all todos

exports.getTodos = async(req ,res )=>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(error){
        res.status(500).json({message : error.message});
    }
};

// create a new todo

exports.createTodo = async (req, res) =>{
    const {title} = req.body;

    try{
        const newTodo = new Todo({title});
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch(error)
    {
        res.status(400).json({message : error.message});
    }
};

// update a todo

exports.updateTodo = async (req,res) =>{
    const {id} = req.params;
    const {title , completed} = req.body;
      try{
         const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {title , completed},
            {new : true}
         );
         res.json(updatedTodo);
      }catch(error){
        res.status(400).json({message : error.message});
      }
};

//Delete a todo

exports.deleteTodo = async (req , res) =>{
    const {id} = req.params;
    try{
        await Todo.findByIdAndDelete(id);
        res.json({messsage : 'Todo Deleted'});
    }catch(error){
        res.status(400).json({message : error.message});
    }
};
