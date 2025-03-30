const adminController = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to admin page ${req.userInfo.username}`,
  });
};

export default adminController;
