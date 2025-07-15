const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    const newTeam = new Team({
      name,
      members,
      createdBy: req.user.id  
    });

    const savedTeam = await newTeam.save();

    res.status(201).json({
      message: 'Team created successfully',
      team: savedTeam
    });

  } catch (err) {
    console.error('Team Creation Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyTeams = async (req, res) => {
    try {
      const myTeams = await Team.find({
        members: req.user.id
      }).populate('members', 'name email');
  
      res.status(200).json({
        message: 'Your teams fetched successfully',
        teams: myTeams
      });
  
    } catch (err) {
      console.error('Get Teams Error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  