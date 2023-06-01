const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users

// router.get('/', async (req, res) => {
//     console.log('======================');
//     Post.findAll({
//         attributes: [
//             'id',
//             'title',
//             'created_at',
//             'post_content'
//         ],
//       order: [['created_at', 'DESC']],
//       include: [
//         // Comment model here -- attached username to comment
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username', 'twitter', 'github']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username', 'twitter', 'github']
//         },
//       ]
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

  router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
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
        },
      ]
    })
    res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
   
  });

  router.get('/:id', async (req, res) => {
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
          // include the Comment model here:
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }

      
  });

router.post('/', withAuth, (req, res) => {
  try {
    const postData = Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    });
    res.status(200).json(postData);
  } catch (err) {
res.status(400).json(err);
  }
  
});

  router.put('/:id', withAuth, (req, res) => {
   try {
    const postData = Post.update({
      title: req.body.title,
      post_content: req.body.post_content
    },
    {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(postData);
   } catch (err) {
    res.status(400).json(err)
   }
   
    });
  

  
  
  router.delete('/:id', withAuth, (req, res) => {
    try {
      const postData = Post.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
    
 
  });

  module.exports = router;