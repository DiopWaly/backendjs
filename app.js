const express = require('express')
const app = express();
app.use(express.json())

const mongoose = require('mongoose');
const stuffRoutes = require('./routes/Stuff')
const userRoutes = require('./routes/User')
const path = require('path');

// connexion de la base de donnee mongodb atlas
mongoose.connect('mongodb+srv://waly0092:Ux5UzCQXegg1qj8y@cluster0.8rpjrkm.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// c'est pour regler le probleme de cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// 

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;