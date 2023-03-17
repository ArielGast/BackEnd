import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";
import passport from "passport";
import { hashPassword, comparePasswords } from "../utils.js";

const router = Router();


//Mongo

//registro sin passport
/* router.post('/registro', async(req,res) => {
    const {email, password} = req.body;
    const existeUsuario = await usersModel.find({email, password})
    if (existeUsuario.length !==0) {
        res.redirect('/views/errorRegistro')
    } else {
        await usersModel.create(req.body)
        res.redirect('/views/login');
    }
}) */

//registro con passport
router.post(
    '/registro', 
    passport.authenticate('registro', {
        failureRedirect: '/views/errorRegistro',
        successRedirect: '/views/perfil',
        passReqToCallback: true,
    }/* , (req,res) => {
        res.redirect('/views/perfil');
    }  */)
)


router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const hashedPassword = hashPassword(password)
    const usuario =  await usersModel.find({email}); 
    if (usuario.length !==0) {
        const isPassword = await comparePasswords(password, usuario[0].password);
        console.log(isPassword);
        if (isPassword) {
            for (const key in req.body) {
                req.session[key] = req.body[key]
            }
            req.session.logged = true;
            if(email === 'adminCoder@coder.com'){ //Pass: adminCod3r123
                req.session.isAdmin = true;
            }else {
                req.session.isAdmin = false;
            } 
        }
        res.redirect('/views/perfil')
    }else {
        res.redirect('/views/errorLogin')
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/views/login')
        }
    })
})

router.get('/registroGithub',
    passport.authenticate('githubRegistro', {scope : ['user.email']})
)

router.get('/github', passport.authenticate('githubRegistro', {failureRedirect: '/views/errorRegistro'}),  (req,res) => {
    req.session.email = req.user.email;
    req.session.isAdmin = false;
    req.session.logged = true;
    res.redirect('/views/perfil');

})

export default router