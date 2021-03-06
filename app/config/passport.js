const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const AdminModel = require('../model/admin');

passport.use(new LocalStrategy(
    (username, password, cb) => {
        AdminModel.findOne({ username })
            .then(user => {
                if (user && user.password === md5(password)) {
                    return cb(null, user, { message: 'Đăng nhập thành công' });
                }
                return cb(null, false, { message: "Đăng nhập thất bại" });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    (jwtPayload, cb) => {
        return AdminModel.findOne({ _id: jwtPayload.user._id })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports = passport;