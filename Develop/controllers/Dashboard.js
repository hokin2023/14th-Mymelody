const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(400).json(err);
  }
  
  });

  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      const post = postData.get({ plain: true });
      res.render('edit-post', {
        post,
        loggedIn: true
        });

    } catch (err) {
      res.status(400).json(err);
    }
         
});
// Use withAuth middleware to prevent access to route
router.get('/create/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    const posts = postData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
  }  catch (err) {
    res.status(400).json(err);
  }
  
  });


module.exports = router;