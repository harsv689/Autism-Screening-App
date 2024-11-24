module.exports = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming `req.user` is populated after JWT verification
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      }
      next();
    };
  };
  