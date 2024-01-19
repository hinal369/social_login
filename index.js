    require('dotenv').config();
    const express = require('express');
    const passport = require('passport');
    const expressSession = require('express-session');

    const app = express();
    const port = 5000;

    require('./passport-setup');

    app.set('view engine', "ejs");
    app.use(expressSession({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: true, saveUninitialized: true }));
    app.get('/', (req, res) => {    
        res.render("pages/index");  
    })

    app.get('/success', (req, res) => {    
        res.render("pages/profile");  
    })

    app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

    app.get('/google/callback', passport.authenticate(
        'google', 
        {failureRedirect: '/failed'}
    ),
    function(req, res) {
        res.redirect('/success')
    })

    app.listen(port, () => {
        console.log(`Running on port: ${port}`);
    })