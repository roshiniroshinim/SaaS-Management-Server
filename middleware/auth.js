const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if(!token) 
        return res.status(401).json({ msg: 'No Token Provided'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if(!decoded) {
            return res.status(401).json({ msg: 'Invalid or Expired Token'});
        }

        next();
    } catch(err) {
        res.status(401).json({ msg: 'Invalid Token'})
    }
}

module.exports = verifyToken;