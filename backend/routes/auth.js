const express = require('express') ;
const User= require('../models/user');
const router= express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken');
const jwt_sec="jinbbb"
var fetchuser=require('../middleware/getUser');

//route 1  creating user

router.post('/createuser', [body('name').isLength({min:3}),
                 body('email', 'email should be more than 3 characs').isLength({min:3}),
                 body('password', 'passsword more than 5 characs').isLength({min:5})] ,async(req,res)=>{
                  let success=false;
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                      return res.status(400).json({success, errors:errors.array()});
                    }
                    try{
                    let user= await User.findOne({email:req.body.email});
                    if (user){
                        return res.status(400).json({success, errors:"user with this email already exists"})
                    }
                    const salt= await bcrypt.genSalt(10);
                    const secPass= await bcrypt.hash(req.body.password,salt);
                   user=await User.create({
                        name: req.body.name,
                        password: secPass,
                        email: req.body.email,
                      })
                      const data={
                        user:{id:user.id}
                      }
                     const authtoken= jwt.sign(data, jwt_sec);
                    
                  //  res.json(user)
                  success=true;
                  res.json({success,authtoken})
                    }catch(error){
                        console.log(error.message);
                        res.status(500).send("error boiii");
                    }
                })
// route 2 logging in user

router.post('/login', [
                 body('email','enter a valid email').isLength({min:3}),
                 body('password','password cannot be empty').exists(

                 )
                 ] ,
                 async(req,res)=>{
                  let success=false;
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(400).json({errors:errors.array()});}
                    const {email,password}= req.body;
                    try {
                      let user= await User.findOne({email});
                      if (!user){return res.status(400).json({error:"sorry user not existing"})}

const passcompare= await bcrypt.compare(password, user.password)
if(!passcompare){
  
  return res.status(400).json({success,error:"sorry user not existing"})

}
const data={
  user:{id:user.id}}
  
  const authtoken= jwt.sign(data, jwt_sec);
  success= true;
  res.json({success, authtoken})
                    }catch(error){
                      console.log(error.message);
                      res.status(500).send("internal error boiii");
                      
                    }

                 })
  // route 3 get details from user
  router.post('/getuser',fetchuser,
    async(req,res)=>{
  try {
    userId= req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message);
     res.status(500).send("internal error boiii");
  }})
                
module.exports= router