import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EntrySchema = new Schema ({

    title: {type: String, required: true},
    content: { type: String, required: true},
    category: {type:String, required: true},
    starred: {type: Boolean, default: false },
    user: {type: mongoose.Schema.Types.ObjectId, required: true,
            ref: 'User'
    },
    
    createdAt: {type: String, default: new Date()},
    
},
{
    timestamps: true,
}
)
;

const Entries = mongoose.model('Entries', EntrySchema);
export default Entries