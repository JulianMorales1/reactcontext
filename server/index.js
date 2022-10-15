

const express = require('express');
const connectDB = require('./db.js')

const User = require('./models/User')
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json())
const PORT = 5000;
app.listen(PORT, function () {
    console.log('server is running at PORT: ' + PORT)
});

//connect database
connectDB();

app.get('/test', function (req, res) {
    res.send('test backend url')
})

app.post('/register', async function (req, res) {

    const { email, password } = req.body;

    let token = ''
    const user = await User.create({ email, password })

    if (user) {
        token = user.getSignedToken();
    }
    res.status(200).json({
        success: true,
        data: user,
        jwt_token: token,
    })


})

app.get('/login', async (req, res) => {



    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    };

    if (!token) {
        res.status(400).json({
            success: false,
            message: 'jwt token not found'
        })
    }

    try {
        const decoded = jwt.verify(token, 'xyzabc789');
        const user = await User.findById(decoded.id);
        if (user) {
            res.status(200).json({
                success: true,
                data: user,
                message: 'user logged in successfully'
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})