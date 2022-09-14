import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({

    name: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    
}, {
    timestamps: true,

})

const userModel = mongoose.model('Users', userSchema)

export default userModel;
