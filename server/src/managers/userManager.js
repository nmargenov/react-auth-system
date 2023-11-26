const User = require("../models/User");

const bcrypt = require('bcrypt');
const { sign, verify } = require("../utils/jwt");
const { SECRET, RESET_SECRET } = require("../config/settings");

exports.register = async(username,firstName,lastName,password,rePassword,email,age) =>{
    if(password!=rePassword){
        throw new Error("Passwords don't match!");
    }

    if(password.length<6){
        throw new Error("Password must be at least 6 characters long!");
    }

    const existingUsername = await User.findOne({username});

    if(existingUsername){
        throw new Error("Username is already in use!");
    }

    const existingEmail = await User.findOne({email});

    if(existingEmail){
        throw new Error("Email is already in use!");
    }

    const bcryptPass = await bcrypt.hash(password,10);
    
    const user= {
        username,
        firstName,
        lastName,
        password:bcryptPass,
        email,
        age
    };

    const newUser =  await User.create(user);

    const payload = {
        _id:newUser._id,
        username:newUser.username,
        firstName:newUser.firstName,
        lastName:newUser.lastName,
        email:newUser.email,
        age:newUser.age
    }; 

    const token = await sign(payload,SECRET,{expiresIn:'1h'});

    return token;
}

exports.login = async(username,password) =>{
    const user = await User.findOne({username});

    if(!user){
        throw new Error('Username or password don\'t match!');
    }

    const isValid = await bcrypt.compare(password,user.password);

    if(!isValid){
        throw new Error('Username or password don\'t match!');
    }

    const payload = {
        _id:user._id,
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        age:user.age
    }; 

    const token = await sign(payload,SECRET,{expiresIn:'1h'});

    return token;
};

exports.jwtResetPassword = async(username,email,age)=>{
    const user = await User.findOne({username});
    if(!user || user.email !== email || user.age!==Number(age)){
        throw new Error("Invalid data");
    }

    const token = await sign({username},RESET_SECRET,{expiresIn:'24h'});
    return token;
}

exports.resetPassword = async(token,newPassword,rePassword)=>{
    if(newPassword!==rePassword){
        throw new Error("Passwords do not match")
    }
    if(newPassword.length<6){
        throw new Error("Password must be at least 6 characters long!");
    }
    const verifiedToken = await verify(token,RESET_SECRET);
    const username = verifiedToken.username;
    
    const bcryptPass = await bcrypt.hash(newPassword,10);
    await User.findOneAndUpdate({username},{password:bcryptPass});

    return null;
}