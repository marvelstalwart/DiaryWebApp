import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

 
export const createUser = async (req, res) => {
     
        const name = req.body.username;
        const email = req.body.email;
        const password = req.body.password
        if (!name || !email || !password) {
          return  res.status(400).send("Please fill in all fields")
        }

        const userExists = await userModel.findOne({name})
        if (userExists) {
            return res.status(400).send("User already exists")
        }
        const emailExists = await userModel.findOne({email})
        if (emailExists) {
           return  res.status(400).send("Email already exists")
        }
        
            //Hash password
            const salt = await bcrypt.genSalt(10)
              const hashedPassword = await bcrypt.hash(password, salt)  
    
              const newUser = new userModel ({
        name, 
        email,
        password: hashedPassword,
       
            })       
        newUser.save()
        .then((user)=> {
            res.status(201).json(`successfully added ${user}`)
        })
        .catch((err)=> res.json(err.message))   
}

export const loginUser = async (req, res)=> {
    const {email, password} = req.body;
    // const user = await userModel.findOne({email})
        userModel.findOne({email})
        .then((user)=> {
            bcrypt.compare(password, user.password)
            .then((pass)=> {
                    if (pass) {
                        res.status(200).json({
                            _id: user.id,
                            name: user.name,
                            email: user.email,
                            pass: pass,
                            origin: user.password,
                            token: generateToken(user.id)
                        })
                    }
                    else {
                        res.status(400).send("Password error")
                    }
               
                
            })
           
        })
        .catch(err=> res.status(404).json(`Invalid User`))
   
        
   
}

const generateToken  = (id)=> {
    return jwt.sign({id}, `${process.env.SECRET_KEY}`, {expiresIn: '2d',})
}

export const getMe = async (req, res) => {
    const {_id, name, email} =  await userModel.findById(req.user.id);
    res.status(200).json ({
        id: _id,
        name,
        email
    })
}