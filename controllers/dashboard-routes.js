const router = require('express').Router();
const { Post } = require('../models/');
const hasAuth = require('../utils/auth');

router.get('/', hasAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render('allposts-edit', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', hasAuth, (req, res) => {
  res.render('newpost', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', hasAuth, async (req, res) => {
  try {
    const userPosts = await Post.findByPk(req.params.id);

    if (userPosts) {
      const post = userPosts.get({ plain: true });

      res.render('editpost', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;