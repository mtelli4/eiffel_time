import crypto from 'crypto'

function generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString('base64')
}

function hashPassword(
    password: string,
    salt: string
): { hash: string; salt: string } {
    const saltedPassword = password + salt
    const hash = crypto.createHash('sha1').update(saltedPassword).digest('hex')
    return { hash, salt }
}

function comparePasswords(
    firstPassword: string[],
    secondPassword: string[]
): boolean {
    const password1 = firstPassword[0]
    const salt1 = firstPassword[1]
    const password2 = secondPassword[0]
    const salt2 = secondPassword[1]
    return (
        hashPassword(password1, salt1).hash ===
        hashPassword(password2, salt2).hash
    )
}

function isPasswordValid(password: string): {
    isValid: boolean
    errors: string[]
} {
    let errors: string[] = []
    if (password.length < 12) {
        errors.push('password-too-short')
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('password-no-uppercase')
    }
    if (!/[a-z]/.test(password)) {
        errors.push('password-no-lowercase')
    }
    if (!/[0-9]/.test(password)) {
        errors.push('password-no-digit')
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push('password-no-special')
    }
    return { isValid: errors.length === 0, error: errors }
}
