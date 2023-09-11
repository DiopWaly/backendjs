const multer = require('multer')

const MINE_TYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // ou stoker les fichiers
        callback(null, 'images')
    },
    // le nom du fichier au moment de l'enregistrement
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extention = MINE_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extention)
    }
});
module.exports = multer({ storage }).single('image')