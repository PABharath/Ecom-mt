// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized - Missing token' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'eyJSb2xlIjoidmFJbljkyOTEyNzM0fQ'); // Replace with your actual secret key
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized - Invalid user' });
//     }

//     req.user = user; // Attach the user information to the request
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send('Token Not found');
        }
        let decode = jwt.verify(token,'jwtSecret');
        req.user = decode.user
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Invalid token')
    }
}