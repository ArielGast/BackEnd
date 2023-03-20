import { Router } from "express";

const router = Router();

router.get('/current', (req,res) => {
    if (req.session){
        const auth = req.session.auth
        res.send(`Usuario autenticado mediante ${auth}`)
    } else {
        res.send('No se ha iniciado sesión');
    }
})

export default router;
