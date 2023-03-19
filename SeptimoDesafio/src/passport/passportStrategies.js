import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as githubStrategy } from "passport-github2";
import { usersModel } from "../dao/models/users.model.js";
import { hashPassword } from "../utils.js";
import { refreshToken } from "firebase-admin/app";

//local
passport.use(
    'registro',
    new localStrategy ({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const usuario = await usersModel.find({email});
        if (usuario.length !== 0) {
            return done(null, false)
        }
        const hashNewPassword = await hashPassword(password);
        const newUser = {...req.body, password: hashNewPassword};
        const newUserDB = await usersModel.create(newUser);
        done(null, newUserDB)
    }
    )
)

// Github

passport.use(
    'githubRegistro',
    new githubStrategy ({
        clientID: 'Iv1.16e7d925bd574b88',
        clientSecret: 'c5ecdbd92ce47626b2536878216e532c96805d0b',
        callbackURL: 'http://localhost:8080/users/github'
    },
    async (accesToken, refreshToken, profile, done) => {
        const usuario = await usersModel.findOne({email: profile._json.email})
        if(!usuario) {
            const newUser = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || '',
                email: profile._json.email,
                password: ''
            }
            const dbResult = await usersModel.create(newUser);
            done(null, dbResult);
        }else {
            done(null, usuario)
        }
    }
    )
)

passport.serializeUser((usuario, done) => {
    done(null, usuario._id)
})

passport.deserializeUser(async(_id, done) => {
    const usuario = await usersModel.findById(_id);
    done(null, usuario)
})