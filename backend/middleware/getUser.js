var jwt= require('jsonwebtoken');
const jwt_sec="jinbbb"

fetchuser=(req,res,next)=>{
    //get user from jwt token and get id
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please use valid token"})
    }
    try {
        const data= jwt.verify(token,jwt_sec);
    req.user=data.user
    next()

        
    } catch (error) {
        res.status(401).send({error:"please use valid token"})

    }
}
module.exports= fetchuser;