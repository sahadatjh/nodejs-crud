const { object, string,ref } = require('yup');

const createUserSchema = object().shape({
   firstName: string()
            .required('First Name field is required!')
            .min(2,"First Name must be minimum 2 characters long!")
            .max(100, "First Name must be maximum 100 characters long!"),
    lastName: string()
            .required('Lasat Name field is required!')
            .min(2,"Lasat Name must be minimum 2 characters long!")
            .max(100, "Lasat Name must be maximum 100 characters long!"),
    password: string()
            .min(8,"Password must be minimum 8 characteres long!")
            .max(32, "Password must be maximum 32 characters long!")
            .required('Password field is reqired!'),
    confirmPassword: string()
            .required('Confirm password is reqired!')
            .oneOf([ref('password'), null], "password and confirm password must be mached!")

});

const updateUserSchema = object().shape({
    firstName: string()
        .required('First Name field is required!')
        .min(2,"First Name must be minimum 2 characters long!")
        .max(100, "First Name must be maximum 100 characters long!"),
    lastName: string()
        .required('Last Name field is required!')
        .min(2,"Last Name must be minimum 2 characters long!")
        .max(100, "Last Name must be maximum 100 characters long!"),
});

module.exports.createUserSchema = createUserSchema;
module.exports.updateUserSchema = updateUserSchema;