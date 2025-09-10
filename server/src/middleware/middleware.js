const jwt = require("jsonwebtoken")
const authToken = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(409).json({ mssg: "not authorized!!" })
    }

    const decoded = jwt.sign(token, process.env.SECRET)

    if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    
}