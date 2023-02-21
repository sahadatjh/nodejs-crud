const { object, string } = require('yup');

const createUserSchema = object().shape({
    name: string()
            .required('Name field is required!')
            .min(2,"Name must be minimum 2 characters long!")
            .max(100, "Name must be maximum 100 characters long!"),
    email: string()
            .email("Email should be a valid email address!")
            .max(100, "Email must be maximum 100 characters long!")
            .required('Email field is reqired!')
});

const updateUserSchema = object().shape({
    name: string()
            .required('Name field is required!')
            .min(2,"Name must be minimum 2 characters long!")
            .max(100, "Name must be maximum 100 characters long!"),
});

module.exports.createUserSchema = createUserSchema;
module.exports.updateUserSchema = updateUserSchema;