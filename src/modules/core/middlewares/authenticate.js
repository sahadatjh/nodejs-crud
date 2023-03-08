const { findUser } = require('../../users/user.controller');

function authenticate(req, res, next) {  
    let {email, token} = req.body;
    let {email: emailFromParams} = req.params;

    email = email || emailFromParams;

    const user = findUser(email);
     
    if(!user) return res.status(404).send('Not found! ');

    if(user.token === token) return res.status(401).send('Unauthenticated');

    next();
}