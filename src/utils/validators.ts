export const validateRegisterInput = (username: string, email: string, password: string, confirmPassword: string) => {
    const errors: { [key: string]: any } = {}
    if (username.trim() === '') errors.username = 'Username must not be empty'
    if (email.trim() === '') errors.username = 'Email must not be empty'
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(regEx)) errors.email = 'Email must be a valid email address'

    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) errors.confirmPassword = 'Password and Confirm Password must match'

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}
export const validateLoginInput = (email: string, password: string) => {
    const errors: { [key: string]: any } = {}

    if (email.trim() === '') errors.username = 'Email must not be empty'
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(regEx)) errors.email = 'Email must be a valid email address'

    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}