import mongoose from 'mongoose';
const {Schema,Types} = mongoose;

const TenderSchema = new Schema (
    {
        customer    :{
            type    :   Types.ObjectId,
            ref     :   'Customer'
        },
        sp          :{
            type    :Types.ObjectId,
            ref     :'SP'
        },
        title       :{type:String,required:true},
        description :{type:String}
    }
);

export default mongoose.model('Tender', TenderSchema);