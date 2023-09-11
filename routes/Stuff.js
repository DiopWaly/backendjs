const express = require('express');
const stuffCtrl = require('../controllers/Stuff');
const auth = require('../middleware/Auth')
const router = express.Router();
const multer = require('../middleware/Multer-config')

router.post('/', auth, multer, stuffCtrl.createThing);

router.get('/', auth, stuffCtrl.getThings);

router.get('/:id', auth, stuffCtrl.getThing);

router.put('/:id', auth, stuffCtrl.updateThing);
router.delete('/:id', auth, stuffCtrl.deleteThing)

module.exports = router;