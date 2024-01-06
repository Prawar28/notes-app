import { getHashedPassword, matchPassword } from '../utils/passwordUtils.js'
import { usernameExists, createUser } from '../models/users.js'
import jwt from 'jsonwebtoken';
const { sign } = jwt

export const signup = async (req, res) => {
    var userName = req.body.user_name;
    var password = req.body.password;
    const hashedPassword = await getHashedPassword(password);

    usernameExists(userName).then((userExist) => {
        
        if (userExist) {
            res.status(400).json({error: 'username already exists'});
        } else {
            
            createUser(userName, hashedPassword).then((success) => {
                if (success) {
                    res.status(200).json({data: "user created successfully"});
                } else {
                    res.status(400).json({error: 'error in signing up'});
                }
            })
        }
    })
    
}

export const login = async (req, res) => {
    var userName = req.body.user_name;
    var password = req.body.password;

    usernameExists(userName).then((user) => {

        if (!user) {
            res.status(400).json({error: 'user does not exists'});
        } else {
            matchPassword(password, user.hashed_password).then((match) => {
                if (match) {
                    const token = sign(user, 'key', { expiresIn: '1h' });
                    res.json({ token });                  
                } else {
                    res.status(400).json({error: 'incorrect password'});
                }
            })
        }
    })
}