export function auth(req, res, next) {
    if (req.session.logged) {
        next();
    }else {
        res.redirect('/');
    }
}

export function isLogged(req,res,next) {
    if (req.session.logged) {
        res.redirect('/views/perfil')
    }else {
        next();
    }
}

export function isAdmin(req,res,next) {
    let role;
    if (req.session.isAdmin) {
        req.session.role = 'Admin'
        
    }else {
         req.session.role = 'User'
    }
    next();
    
}