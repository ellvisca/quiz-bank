const jwt = require('jsonwebtoken')

async function authenticate(req, res, next) {
    let token = req.headers.authorization;
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

    try{
        let payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload
        next();
    }

    catch(err) {
        return res.status(401).json({
            status: false,
            errors: "Invalid token",
        })
    }
}

module.exports = authenticate;