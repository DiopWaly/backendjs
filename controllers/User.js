const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(!user){
               return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if( !valid ){
                        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'})
                    } 
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });

                }).catch((erorr) => res.status(500).json({ erorr }));
        })
        .catch((erorr) => res.status(500).json({ erorr }))
}
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'User created'}))
                .catch((erorr) => res.status(400).json({ erorr }))
        })
        .catch((erorr) => res.status(500).json({ erorr }));
}