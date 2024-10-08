import express from 'express';
import { Pinmodel } from '../Model/pin.js';
import { authenticateToken } from '../Middleware/Authentication.js';
import getUrl from '../Utils/urlgenerator.js';
import cloudinary from "cloudinary";
import uploadFile from '../Utils/multerAccess.js';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/pins', uploadFile, authenticateToken, async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file;
        console.log(file)

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileurl = getUrl(file);

        const cloud = await cloudinary.v2.uploader.upload(fileurl.content);
        const user = req.user.id;

        const pin = new Pinmodel({
            title,
            image: { id: cloud.public_id, url: cloud.secure_url },
            user
        });
        await pin.save();

        res.status(201).json(pin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/getallpins', async (req, res) => {
    try {
        const pins = await Pinmodel.find().populate('user', 'username email userimage').select('-user');
        res.status(200).json(pins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/comments', authenticateToken, async (req, res) => {
    const { id } = req.body;

    const pin = await Pinmodel.findById(id);

    if (!pin)
        return res.status(400).json({
            message: "No Pin with this id",
        });

    pin.comments.push({
        userId: req.user.id,
        name: req.user.username,
        image: req.user.userimage.url,
        content: req.body.content,
    });

    await pin.save();

    res.json({
        message: "Comment Added",
        pin
    })
})
router.delete('/deletecomment', authenticateToken, async (req, res) => {
    const { pinId, commentId } = req.body;

    try {
        const pin = await Pinmodel.findById(pinId);
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }
        const updatedComments = pin.comments.filter(comment => comment._id.toString() !== commentId);

        if (updatedComments.length === pin.comments.length) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        pin.comments = updatedComments;
        await pin.save();
        res.status(200).json({ message: 'Comment successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});


router.get('/search', authenticateToken, async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {

        const pins = await Pinmodel.find({
            title: { $regex: query, $options: 'i' }


        }).populate('user', 'username email userimage');

        res.status(200).json(pins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pin = await Pinmodel.findById(req.params.id).populate('user');

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        res.status(200).json(pin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const pin = await Pinmodel.findById(id);

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }
        if (!userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await cloudinary.v2.uploader.destroy(pin.image.id);
        await Pinmodel.deleteOne({ _id: id });
        res.status(200).json({ message: 'Pin deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.get('/download/:id', async (req, res) => {
    try {
        const pin = await Pinmodel.findById(req.params.id);

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        const imageUrl = pin.image.url;


        const response = await fetch(imageUrl);
        if (!response.ok) {
            return res.status(500).json({ message: 'Failed to fetch image from Cloudinary' });
        }

        const contentType = response.headers.get('content-type');

        const buffer = await response.buffer();


        res.set({
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${pin.image.id}.jpg"`
        });


        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});







export default router;
