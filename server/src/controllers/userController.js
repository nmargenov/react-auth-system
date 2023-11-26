const { login, register, jwtResetPassword, resetPassword } = require('../managers/userManager');
const { mustBeGuest } = require('../middlewares/authMiddlewares');
const nodemailer = require('nodemailer');

const router = require('express').Router();

const paths = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgotPassword',
    resetPassword:'/resetPassword'
}

router.post(paths.login, mustBeGuest, async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const password = req.body.password?.trim();

        const token = await login(username, password);
        res.status(200).json(token);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.post(paths.register, mustBeGuest, async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const lastName = req.body.lastName?.trim();
        const firstName = req.body.firstName?.trim();
        const password = req.body.password?.trim();
        const rePassword = req.body.rePassword?.trim();
        const email = req.body.email?.trim();
        const age = req.body.age;
        const token = await register(username, firstName, lastName, rePassword, password, email, age);
        res.status(201).json(token);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.post(paths.forgotPassword, mustBeGuest, async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const age = req.body.age?.trim();
        const email = req.body.email?.trim();
        const token = await jwtResetPassword(username, email, age);
        const mailOptions = {
            from: 'nikolay_margenov@abv.bg',
            to: email,
            subject: "Reset Password",
            text: `Your link for resseting password is http://localhost:5173/resetPass=${token}`
        }
        transporter.sendMail(mailOptions);
        res.status(201).send({message:token})
    } catch (err) {
        console.log(err)
        res.status(200).send({message:err.message});
    }
});

router.post(paths.resetPassword,mustBeGuest,async(req,res)=>{
    try{
        const token = req.body.token?.trim();
        const newPassword = req.body.newPassword?.trim();
        const reNewPassword = req.body.reNewPassword?.trim();
        console.log(newPassword);
        console.log(reNewPassword);
        await resetPassword(token,newPassword,reNewPassword);
        res.status(201).send({message:'ok'})
    }catch(err){
        console.log(err)
        res.status(200).send({message:err.message})
    }
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'niki.margenov@gmail.com',
        pass: 'iypw ujxh dvcn wqhs'
    }
});

module.exports = router;