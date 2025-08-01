const Note = require('../model/note.model');

const NoteService = {

    WelcomeNote: async (req, res) => {
        try {
            const user = req.user;
            const note = new Note({
                title: 'Welcome to the Notes App!',
                content: `Hello ${user.fname}, welcome to your personal notes space!`,
                user: user._id
            });
            await note.save();
            res.status(201).json({ message: 'Welcome note created successfully', note });
        } catch (error) {
            console.error('Error creating welcome note:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = NoteService;