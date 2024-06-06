const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');

module.exports = function(app) {
    app.post('/signup', async (req, res) => {
        const { name, email, password, age } = req.body;
    
        if (!name || !email || !password || !age) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists with this email' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, age });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error creating user ' + error });
        }
    })
    
    
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found, kindly register' });
        }
    
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.name }, "uwhi827", { expiresIn: '1h' });
            res.status(200).json({ email: user.email, token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    });
    
    
    app.put('/updateUser', async (req, res) => {
        const { name, email, password, age } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        try {
            const decoded = jwt.verify(token, "uwhi827");
    
            const userId = decoded.id;
    
            const updatedData = {
                name:name,
                email:email,
                age:age
            };
            if (password) updatedData.password = await bcrypt.hash(password, 10);
    
            const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            res.status(201).json({ message: "User updated successfully", user });
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: "Invalid token" });
            }
            res.status(500).json({ error: "Error updating user: " + error.message });
        }
    });
    
    
    app.get('/getUser', async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, "uwhi827");
            const userId = decoded.id;
            const user = await User.findById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error fetching user: " + error.message });
        }
    })
    
    app.get('/test', async (req, res) => {
        
        try {
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from('<h2>Test String</h2>'));
        } catch (error) {
            res.status(500).json({ error: "Error fetching user: " + error.message });
        }
    })
};