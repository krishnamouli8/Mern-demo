const express = require('express');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/user');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post(['/login-submit'], async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
        res.send([
            'Welcome back!!',
            {
                Email: email,
                Password: password
            }
        ]);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Form Submission</title>
                <script>
                    alert('No account found with ${email}');
                    window.location.href = '/register';
                </script>
            </head>
            <body>
            </body>
            </html>
        `);
    }  
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register-submit', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.send(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Form Submission</title>
                <script>
                    alert('${email} is already a member! Please login to continue.');
                    window.location.href = '/login';
                </script>
            </head>
            <body>
            </body>
            </html>`
        );
    }
    else{
        const newUser = new User({
            name, email, password
        });

        await newUser.save();

        res.send(['Registration successfull!!',
            {
                Name: name,
                Email: email,
                Password: password
            }
        ]);
    }
});

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
