const users = [ {"name":"Mr Sahadat", "email":"sahadat@gmail.com"} ]

function getUsers( req, res ) {
    res.send(users);
}

function getUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );

    if( !user ) return res.send("User not found!");

    res.send( user );
}

function createUser ( req, res ) {
    const body = req.body;

    const user = users.find( user => user.email === body.email );

    if( user ) return res.status(400).send("User already exists!");

    users.push( body );

    res.status(201).send(body);
}

function updateUser( req, res ) {  
    const body = req.body;

    const user = users.find( user => user.email === req.params.email );

    if(!user) return res.status(404).send("User not found!");

    user.name = body.name;

    res.send(user);
}

function deleteUser( req, res ) {
    const user = users.find( user => user.email === req.params.email );
    
    if( !user ) return res.send("User not found!");

    users = users.filter( user => user.email !== req.params.email ); //reasign user array
    
    res.send(user);
}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;