const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./user.controller');
const validate = require('../core/middlewares/validate');
const { createUserSchema, updateUserSchema } = require('./user-schema');


module.exports = ( app ) => {
    app.route('/users')
        .get(getUsers)
        .post(validate(createUserSchema), createUser );
    
    app.route('/user/:email')
        .get( getUser )
        .patch(validate(updateUserSchema), updateUser )
        .delete( deleteUser );
}