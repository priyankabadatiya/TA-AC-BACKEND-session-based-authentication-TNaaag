let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    city:  String,
    admin: String,
    user: String,
    password: {type: String, required: true, minlength: 5},
    cart: [{type: Schema.Types.ObjectId, ref: "Product"}]
}, {timestamps: true});

userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password, 10, (err, hashed)=>{
            if(err) return next(err);
            this.password = hashed;
            return next()
        })
    }
    next()
})

userSchema.methods.verifyPassword=function(password,cb){
bcrypt.compare(password,this.password,(err,result)=>{
    return cb(err,result);
})
}
model.exports = mongoose.model("User", userSchema);