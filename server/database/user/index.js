import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullname:{ type: String, required:true },
    email:{ type: String, required:true },
    password:{ type: String, required:true },
    address: [{detail:{type:String}},{for:{type:String}}],
    phoneNumber: [{type: Number}],
},
{
    timestamps: true,
}
);



export const UserModel = mongoose.model("Users", UserSchema);

// //Throwing an error msg if the user exists...
// UserSchema.statics.findByEmailAndPhone = async (email,phoneNumber) => {
//     //Check whether email and phone number exists
//     const checkUserByEmail = await UserModel.findOne({email});
//     const checkUserByPhone = await UserModel.findOne({phoneNumber});

//     if(checkUserByEmail || checkUserByPhone){
//         throw new Error("User already exists!!!"); 
//     }
//     return false;
// };

// UserSchema.pre("save", function(next){
//     const user = thiss;

//     //is password modified
//     if(!user,this.isModified("password")) return next();
    
//     //if password available generate bcrypt salt
//     bcrypt.genSalt(8, (error,salt) => {
//         if(error) return next(error);

//         //hash the password
//         bcrypt.hash (user.password, salt, (error, hash) => {
//             if (error) return next(error);

//             //assigned hashed password
//             user.password = hash;
//             return next();
//         });
//     })
// }