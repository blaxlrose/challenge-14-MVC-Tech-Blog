const router = require('express').Router();
const { Post } = require('../../models/');
const hasAuth = require('../../utils/auth');

router.post('/', hasAuth, async (req, res) =>{
    try {
        const newPost = await Post.create({ 
            ...req.body,
            userId: req.session.userId
        });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', hasAuth, async (req, res) => {
    try {
        const [rows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (rows > 0){
            res.status(200).end();
        } else { 
            res.status(400).json({ message: 'Failed to update post!'}).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', hasAuth, async (req, res) => {
    try {
        const [rows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (rows > 0){
            res.status(200).end();
        } else {
            res.status(400).json({ message: 'Failed to delete post!'}).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
