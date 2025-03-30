import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          'Authorization token is missing. Please provide a valid token.',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing from Authorization header.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userInfo = decoded;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message); // Debugging

    return res.status(403).json({
      success: false,
      message:
        error.message === 'jwt malformed'
          ? 'Invalid token format.'
          : error.message === 'jwt expired'
          ? 'Token has expired. Please log in again.'
          : 'Invalid token. Please provide a valid token.',
    });
  }
};

export default authMiddleware;
