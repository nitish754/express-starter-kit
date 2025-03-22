const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'
const RESET_PASSWORD_CONST= {
    RESET_PASSWORD_TOKEN_EXPIRES_IN_MIN : 15*60*1000,
    FRONTEND_URL : process.env.FRONTEND_URL || 'http://localhost:8080',
    FROM_EMAIL : 'ernitish1993@gmail.com'

}


module.exports = {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    RESET_PASSWORD_CONST
}