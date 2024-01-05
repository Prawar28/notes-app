import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import pool from '../config/db.js'


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'key', //replace with secret key in env file
};

passport.use(new Strategy(opts, async (jwtPayload, done) => {

    const user = await pool.query("SELECT * FROM users WHERE username=$1", [
    jwtPayload.username
  ])
    
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

export default passport;
