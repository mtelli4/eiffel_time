import crypto from 'crypto'

export function generateSalt(length) {
    return crypto.randomBytes(length).toString('hex')
}

export function hashPassword(password, salt) {
    const saltedPassword = password + salt
    return crypto.createHash('sha256').update(saltedPassword).digest('hex')
}

export function comparePasswords(firstPassword, salt, secondPassword) {
    return (hashPassword(firstPassword, salt) == secondPassword)
}

// function isPasswordValid(password: string): {
//     isValid: boolean
//     errors: string[]
// } {
//     let errors: string[] = []
//     if (password.length < 12) {
//         errors.push('password-too-short')
//     }
//     if (!/[A-Z]/.test(password)) {
//         errors.push('password-no-uppercase')
//     }
//     if (!/[a-z]/.test(password)) {
//         errors.push('password-no-lowercase')
//     }
//     if (!/[0-9]/.test(password)) {
//         errors.push('password-no-digit')
//     }
//     if (!/[^A-Za-z0-9]/.test(password)) {
//         errors.push('password-no-special')
//     }
//     return { isValid: errors.length === 0, errors }
// }
