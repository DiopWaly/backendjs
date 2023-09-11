const Thing = require('../models/Thing')

// exports.createThing = (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     thing.save()
//         .then(() => res.status(201).json({message: 'Objet enregistre avec succes'}))
//         .catch((err) => res.status(400).json({err}));
// };

exports.createThing = (req, res, next) => {
    // le body est envoye sous forme de string avec le file
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id;
    delete thingObject.userId;
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
};

exports.getThings = (req, res, next) => {
    Thing.find()
        .then((stuffs) => res.status(200).json(stuffs))
        .catch((err) => res.status(400).json({err}))
}

exports.getThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then((stuff) => res.status(200).json(stuff))
        .catch((err) => res.status(404).json({err}))
}

exports.updateThing = (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then((stuff) => res.status(200).json({ message: 'Objet modifié !'}))
        .catch((err) => res.status(404).json({err}))
}

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet supprimer avec succes'}))
        .catch((err) => res.status(400).json({ err }))
}