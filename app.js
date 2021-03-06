/**
 * To get started install
 * express bodyparser jsonwebtoken express-jwt
 * via npm
 * command :-
 * npm install express bodyparser jsonwebtoken express-jwt --save
 */

// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

// Instantiating the express app
const app = express();


// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const secret = '289160db0d9f39f9ae1754c4ec9c16f90b50e32e09c5fb5481ae642b3d3d1a36';

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: secret
});


// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'teste123',
        password: 'teste123'
    },
    {
        id: 2,
        username: 'test2',
        password: 'asdf12345'
    }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);

    let user = users.filter((usr) => {
        return (username == usr.username) && (password == usr.password);
    });

    if(user.length > 0) {
        user = user[0];

        let token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: 129600 }); // Sigining the token
        res.json({
            sucess: true,
            err: null,
            token
        });

    } else {

        res.status(401).json({
            sucess: false,
            token: null,
            err: 'Username or password is incorrect'
        });

    }

});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling 
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});
