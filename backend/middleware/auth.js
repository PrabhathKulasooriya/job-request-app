import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header("token");
    if(!token){
        return res.status(401).json({ success:false, message: "Not authorized, Login first!"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }catch(error){
        return res.status(401).json({ success:false, message: "Not authorized, Login first!"});
    }
};

export default auth;