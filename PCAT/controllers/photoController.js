const fs = require('fs');
const Photo = require('../models/photo');

exports.getAllPhotos = async (req, res) => {
    const page = Number.parseInt(req.query.page) || 1;
    const limit =2;
    const skip = (page - 1) * limit;
    const totalPhotos = await Photo.countDocuments();

    Photo.find({}, (err, photos) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.render('index', {
            photos,
            current: page,
            pages: Math.ceil(totalPhotos / limit),
        });
    }
    ).sort('-date')
        .skip(skip)
        .limit(limit);
};

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
    });
};

exports.getPhotoDetails = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('details', {
        photo: photo
    });
}

exports.getEditPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', {
        photo
    });
}

exports.updatePhoto = async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findById(req.params.id);

    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();

    res.redirect(`/details/${photo._id}`);
}

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    await fs.unlinkSync(`public${photo.image}`);
    await photo.remove();
    res.redirect('/');
}