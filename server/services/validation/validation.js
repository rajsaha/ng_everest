let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let username_regex = /.{4,}/;
let password_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}/;

const Validation = (() => {
    const SignUpDataValidation = async (email, username, password) => {
        if (email_regex.test(email) && username_regex.test(username) && password_regex.test(password)) {
            return true;
        } else {
            return false;
        }
    }

    return {
        SignUpDataValidation
    }
})();

module.exports = Validation;