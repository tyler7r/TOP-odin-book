const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username }, { profilePic: 0 }).exec();
        if (!user) {
            return done(null, false, {
                message: 'Incorrect Username'
            })
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password' })
            }
        })
    } catch (err) {
        return done(err)
    }
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
}, async(jwtPayload, done) => {
    try {
        return done(null, jwtPayload.user)
    } catch (err){
        return done(err)
    }
}))

