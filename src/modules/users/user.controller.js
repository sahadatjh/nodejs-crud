const bcrypt = require('bcrypt');

const users = []

function getUsers(req, res) {
    res.send(users);
}

function homePage(req, res) {  
    res.send('Welcome to our Homepage....');
}

function getUser(req, res) {
    const user = users.find(user => user.email === req.params.email);

    if(!user) return res.send("User not found!");

    res.send(user);
}

function createUser (req, res) {
    const {firstName, lastName, email, password } =  req.body;

    const user = users.find(user => user.email === email);

    if(user) return res.status(400).send("User already exists!");

    const hashedPassword = bcrypt.hashSync(password, 9);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    }

    users.push(newUser);
    
    // delete newUser.password

    res.status(201).send(newUser);
}

function updateUser(req, res) {  
    const body = req.body;

    const user = users.find(user => user.email === req.params.email);

    if(!user) return res.status(404).send("User not found!");

    user.name = body.name;

    res.send(user);
}

function deleteUser(req, res) {
    const user = users.find(user => user.email === req.params.email);
    
    if(!user) return res.send("User not found!");

    users = users.filter(user => user.email !== req.params.email); //reasign user array
    
    res.send(user);
}

function login(req, res) {  
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if(!user) return res.status(400).send('Invalid credential!');

    const passwordMached = bcrypt.compareSync(password, user.password);

    if(!passwordMached) return res.status(400).send('Invaid credentials!');
    
    // const modifiedUser = [...user];
    // delete modifiedUser.password;
    
    res.status(200).send(user);
}

function findUser(email){
    const user = users.find(user => user.email === email);
    
    if(!user) return res.status(404).send('User not found');
    
    return user;
}

module.exports.homePage = homePage;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;