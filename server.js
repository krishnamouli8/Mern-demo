const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

var old_members = [];

app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post(['/login-submit'], (req, res) => {
    const { email, password } = req.body;
    if (old_members.includes(email)) {
        res.send([
            'Welcome again!!',
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

app.post('/register-submit', (req, res) => {
    const { name, email, password } = req.body;
    if (old_members.includes(email)) {
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
        old_members.push(email);
    }
    res.send(['Registration successfull!!',
        {
            Name: name,
            Email: email,
            Password: password
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});