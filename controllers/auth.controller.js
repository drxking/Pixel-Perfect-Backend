const jwt = require('jsonwebtoken');




const LoginController = (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Username: " + username + " Password: " + password);
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful' });

        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.log("error " + err);

    }
}


module.exports = { LoginController };