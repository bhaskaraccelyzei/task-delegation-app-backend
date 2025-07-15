const Task = require('../models/Tasks');
const Team = require('../models/Team');




exports.getMyTasks = async (req, res) => {
    try {
      // Find team IDs where user is a member
      const userTeams = await Team.find({ members: req.user.id }).select('_id');
      const teamIds = userTeams.map(team => team._id);
  
      // Find tasks assigned to the user OR any of their teams
      const tasks = await Task.find({
        $or: [
          { assignedTo: req.user.id },
          { assignedTeam: { $in: teamIds } }
        ]
      })
        .populate('assignedTo', 'name email')
        .populate('assignedTeam', 'name')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        message: 'Tasks for you',
        tasks
      });
  
    } catch (error) {
      console.error('Get My Tasks Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, assignedTeam } = req.body;

    // Validation: At least one assignment is required
    if (!assignedTo && !assignedTeam) {
      return res.status(400).json({ message: 'Assign to either a user or a team' });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      assignedTo: assignedTo || null,
      assignedTeam: assignedTeam || null,
      createdBy: req.user.id
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      message: 'Task created successfully',
      task: savedTask
    });

  } catch (err) {
    console.error('Task Creation Error:', err.message,err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDelegatedTasks = async (req, res) => {
    try {
      const statusFilter = req.query.status;
  
      const query = {
        createdBy: req.user.id
      };
  
      if (statusFilter) {
        query.status = statusFilter;
      }
  
      const tasks = await Task.find(query)
        .populate('assignedTo', 'name email')
        .populate('assignedTeam', 'name')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ message: 'Delegated tasks', tasks });
  
    } catch (err) {
      console.error('Delegated filter error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  exports.updateTaskStatus = async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.body;
  
      const allowedStatuses = ['pending', 'in-progress', 'completed'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Authorization: only assigned user or creator can update
      const userId = req.user.id;
      const isAssigned = task.assignedTo && task.assignedTo.toString() === userId;
      const isCreator = task.createdBy.toString() === userId;
  
      if (!isAssigned && !isCreator) {
        return res.status(403).json({ message: 'Not allowed to update this task' });
      }
  
      task.status = status;
      await task.save();
  
      res.status(200).json({ message: 'Task status updated', task });
  
    } catch (error) {
      console.error('Update status error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Only creator can delete
      if (task.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not allowed to delete this task' });
      }
  
      await Task.findByIdAndDelete(taskId);
  
      res.status(200).json({ message: 'Task deleted successfully' });
  
    } catch (err) {
      console.error('Delete task error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  


