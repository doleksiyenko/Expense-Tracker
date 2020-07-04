const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("auth-token");

    // if the token doesn't exist, don't let access to the route
    if (!token) return res.status(401).send("Permission Denied.");

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified;
        next();
    } catch (error) {
        req.status(400).send("Token is invalid.");
    }
};
