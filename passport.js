const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require ("bcryptjs");

function InitPassport(passport, getUserByEmail){
    const auth = async (email, password, done) => {
        var user = await getUserByEmail(email);
        
        if (user[0] == null){
            return done(null, false, {message: "Email not valid"});
            // NO USER WITH EMAIL
        }
        try{
            if (bcrypt.compareSync(password, user[0].password)){ // Checks password
                // MATCHES
                return done(null, user);
            } else {
                // PASSWORD WRONG
                return done(null, false, {message: "Incorrect password"});
            }
        } catch (e) { return done(e); }
    }

    if (passport != null){
        passport.use(new LocalStrategy({usernameField: "email"}, auth)); // Password not needed as it is already set to defualt
        
    }
    passport.serializeUser((user, done) => {
        done(null, user[0].email)})
    passport.deserializeUser((email, done) => { 
        done(null, getUserByEmail(email))
    })
}
module.exports.InitPassport = InitPassport;