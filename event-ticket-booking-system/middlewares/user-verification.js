const verifyUser = (req, res, next) => {
  try {
    if (req.user.userType == "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong!` });
  }
};

module.exports = {
  verifyUser,
};
