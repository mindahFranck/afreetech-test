import { Request, Response, NextFunction } from "express";

const jwt= require("jsonwebtoken");
var SECRET_Key = "sji49D9SU8FD09QN9fddn84S9N39D8S989Q9#eJF9Sddkszkxooos";


module.exports = (req: Request, res: Response, next: NextFunction) =>{
 
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: "No token provided"});
        }
           const valuetoken = token.split(" ")[1];
           const decodedtoken = jwt.verify(valuetoken, SECRET_Key, (error:any, decodedtoken:any) => {
            if(error){
                return res.status(401).json({message: "Token is not valid"});
            }
            const userId = decodedtoken.UserId;
            if(req.body.userId && req.body.userId !== userId){
                return res.status(401).json({message: "l'identifiant du User est invalid"});
           }else{
            next();
           }
            

       

  
})   
}
