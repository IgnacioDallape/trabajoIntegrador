const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;

passport.use(
    'github',
    new GithubStrategy(
        {
            clientID: '8900374dae795e798920',
            clientSecret: '28bac667a29a2583eea25d55fdf5b138b096fc2a',
            callbackURL: 'http://localhost:8080/auth/github/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            done(null, profile);
        }
    )
);

module.exports = passport;
