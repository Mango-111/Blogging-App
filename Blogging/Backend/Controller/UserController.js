const userModel = require('../db/UserSchema')
const otpModel = require('../db/OtpSchema');
const {auth} = require('../middleware/authJWT')

// To Register new user
async function addUsers(req,res){
    console.log(req.body);
    const user = new userModel(req.body);

    user.save((err) => {
        if (err) return res.json({ success: false, err });
        else{
        return res.status(200).json({
            success: true
        });
    }
    });
}
// User uthentication
async function authenticate(req,res){
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image,
        });
}
// User Login
async function Login(req,res){
    console.log(req.body);
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
    
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
    
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("w_authExp", user.tokenExp);
            res
                .cookie("w_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true
                });
            });
        });
    });
}
// User Logout
async function logout(req,res){
    userModel.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });   
}

// Generate otp and send it on email
async function sendEmail(req,res){
    const user = await userModel.find({email:req.body.email});
    console.log(user);
    if(user){
        let otpCode=Math.floor((Math.random()*10000)+1);
        let otpData = new otpModel({
            email:req.body.email,
            code:otpCode,
            expiresIn:new Date().getTime() +300*1000
        })
        let otpResponse = await otpData.save();
        mailer(otpData.email,otpData.code);
        res.status(200).json({
            success:true,
            message:"Email sent please check your Inbox"
        })
    }
    else if (!user) {
        return next(
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        );
      }
}
// To verify the otp and change the password
async function changePassword(req,res){
    let data = await otpModel.find({email:req.body.email,code:req.body.otpCode});
    if(data){
        let currentTime = new Date().getTime();
        let difference = data.expiresIn - currentTime;
        if(difference<0){
            res.status(401).json({
                success:false,
                message:"Time limit excceded"
            })
        }
        else{
            let user = await userModel.findOne({email:req.body.email})
            user.password = req.body.password;
            user.save()
            res.status(200).json({
                success:true,
                status_code:200,
                message:"Password changed successfully"
            })
        }
    }
    else if(!data){
        res.status(404).json({
            success:false,
            message:"Invalid OTP"
        })
    }

}
// To send the mail 
const mailer=async(email,otp)=>{
    const nodemailer=require('nodemailer')
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"hadapadambika@gmail.com",
          pass:"ambikasuchit11"
        }
      });
    var mail = {
        from:"hadapadambika@gmail.com",
        to:email,
        subject: "Change password request",
        html:
        `<h2>${otp} is your otp to change the password</h2>
        <p>Do not share you OTP with anyone.</p>`
        };
      sender.sendMail(mail, function(error, info) {
        if (error) {
          console.log(error);
        } else
        {
          console.log("Email sent successfully: " + info.response);
        }
      });
}

module.exports={addUsers,logout,authenticate,Login}