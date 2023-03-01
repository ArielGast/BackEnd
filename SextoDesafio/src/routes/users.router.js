import { Router } from "express";
import { usersModel } from "../dao/models/users.model.js";

const router = Router();
//const users = [];

//files
/* router.post('/registro', (req,res) => {
    const existeUsuario = users.some(u => u.email === req.body.email);
    if (existeUsuario) {
        res.redirect('/views/errorRegistro')
    } else {
        users.push(req.body);
        console.log(users)
        res.redirect('/views/login');
    }
})

router.post('/login', (req,res) => {
    const {email, password} = req.body;
    const usuario = users.find(u => u.email === email);
    console.log(usuario);
    if (usuario && usuario.password === password) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
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
}) */

//Mongo

router.post('/registro', async(req,res) => {
    const {email, password} = req.body;
    const existeUsuario = await usersModel.find({email, password})
    if (existeUsuario.length !==0) {
        res.redirect('/views/errorRegistro')
    } else {
        await usersModel.create(req.body)
        res.redirect('/views/login');
    }
})

router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const usuario =  await usersModel.find({email, password})
    if (usuario.length !==0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
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

export default router