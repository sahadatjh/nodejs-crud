const bcrypt = require('bcrypt');

const users = []

function getUsers(req, res) {
    // const allUsers = [...users];

    // allUsers.map(user => delete user.password);

    // res.status(200).send(allUsers);

    const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        
        return userWithoutPassword;
    });
    
    res.status(200).send(usersWithoutPassword);
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
    
    const modifiedUser = {...newUser};
    delete modifiedUser.password;

    res.status(201).send(modifiedUser);
}

function updateUser(req, res) {  
    let {email} = req.params;
    let {firstName, lastName, token} = req.body;

    const user = users.find(user => user.email === email);

    if(!user) return res.status(404).send("User not found!");

    if(user.token !== token) return res.status(401).send('Unauthenticated!')

    user.firstName = firstName;
    user.lastName = lastName;

    res.send(user);
}

function deleteUser(req, res) {
    const user = users.find(user => user.email === req.params.email);
    
    if(!user) return res.send("User not found!");

    users = users.filter(user => user.email !== req.params.email); //reasign user array
    
    res.send(user);
}

function login(req, res) {  
    let { email, password } = req.body;
    let { email: emailFromParams } = req.params;

    email = email || emailFromParams;

    const user = users.find(user => user.email === email);

    if(!user) return res.status(400).send('Invalid credential!');

    const passwordMached = bcrypt.compareSync(password, user.password);

    if(!passwordMached) return res.status(400).send('Invaid credentials!');
    
    const token = bcrypt.hashSync('password', 10);

    user.token = token;

    const newUser = {...user, token};
    delete newUser.password;
    
    res.status(200).send(newUser);
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