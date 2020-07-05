const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    // if the token doesn't exist, don't let access to the route
    if (!token) return res.status(401).json({ error: "Permission Denied." });

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        // verify the token (decode) and then add the user id to the request
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Token is invalid." });
    }
};
