import Entries from "../models/entryModel.js";
import  Entry from "../models/entryModel.js"
import userModel from "../models/userModel.js";
import Cryptr from 'cryptr';
const cryptr  = new Cryptr(`${process.env.SECRET_KEY}`)
export const getEntry = (req, res)=> {
   
        Entries.findById(req.params.id)
        .then((entry)=> {

            res.status(200).json(entry);

        })
        .catch(err=> res.status(404).json(err.message));
}

export const getEntries =(req, res)=> {
    console.log(req.user.id)
        Entries.find({user: req.user.id} )
        .then((entries)=> {
            let decodedEntries = entries.map((entry)=> {
               return {...entry.toObject(), content: cryptr.decrypt(entry.content)}
                
                    
            })

            res.status(200).json(decodedEntries)

             
        })
        .catch(err=> res.status(404).json(err.message))
}
export const createEntry = (req, res)=> {
    const {title, content, category, id} = req.body;
    if (!title|| !content || !category) {
        return res.status(400).send("There are missing fields")
    }
    const encryptedContent = cryptr.encrypt(content)
    const newEntry = new Entries({title, content: encryptedContent, category, user: id});
    newEntry.save()
    .then((post)=> res.status(201).json("Successfully inserted record") )
    .catch(err=> res.status(409).json(err.message));
}

export const editEntry = (req, res)=> {

const id = req.params.id;
Entries.findById(id)
.then((entry)=> {
   userModel.findById(req.user.id) 
   
   .then((user)=> {
        if(entry.user.toString() !== user.id) {
              return  res.status(401).send("You cannot update this data")
        }
        entry.title = req.body.title;
    entry.content = cryptr.encrypt(req.body.content);
    entry.category= req.body.category;
    
    entry.save()
    .then(()=> {
        res.status(200).send("Successfully updated")
    })
    .catch((err)=> res.status(404).json(`Error ${err.message}`))
   })
   
   .catch(err=> res.status(404).json(`User not found ${err.message + req.user}`))
    
})
.catch(err => res.status(404).json(`Cannot find document ${err.message}`))
}

export const deleteEntry = (req, res) => {
            Entries.findByIdAndDelete(req.params.id)
                .then((entry)=> res.status(200).json(`sucessfully deleted entry ${entry}`))
                .catch((err)=> res.json(`An Error occured ${err.message}`))
                .catch(err=> res.status.json(`Unable to find entry ${req.params.id}`))
        }
