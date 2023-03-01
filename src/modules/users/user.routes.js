const {homePage, getUsers, getUser, createUser, updateUser, deleteUser, login } = require('./user.controller');
const validate = require('../core/middlewares/validate');
const { createUserSchema, updateUserSchema } = require('./user-schema');


module.exports = ( app ) => {
    app.get('/', homePage);

    app.route('/users')
        .get(getUsers)
        .post(validate(createUserSchema), createUser);
    
    app.route('/user/:email')
        .get( getUser )
        .patch(validate(updateUserSchema), updateUser )
        .delete( deleteUser );

    app.post('/users/login', login);
}