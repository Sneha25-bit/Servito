import mongoose from 'mongoose';
const {Schema} = mongoose;

const CustomerSchema = new Schema (
    {
        username    :   {type:String , required:true},
        password    :   {type:String , required:true},
        email       :   {type:String , match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
        phone_no    :   {type:String , required:true , match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'] },
        address     :   {type:String , required:true}
    }
);

export default mongoose.model('Customer', CustomerSchema);