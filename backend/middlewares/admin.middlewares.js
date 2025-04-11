const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Your not authorized to access this page',
    });
  }

  next();
};
export const teacherMiddleware = (req, res, next) => {
  if (req.userInfo.role !== 'admin' && req.userInfo.role !== 'teacher') {
    return res.status(401).json({
      success: false,
      message: 'Your not authorized to access this page',
    });
  }

  next();
};

export default adminMiddleware;
