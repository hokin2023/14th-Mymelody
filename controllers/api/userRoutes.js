const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/', async (req, res) => {
    // Access our User model and run .findAll() method
    try {
      const userData =  await User.findAll({
        attributes: { exclude: ['password'] }
    })
    res.status(200).json(userData);
    } catch(err) {
      res.status(400).json(err);
    }
    
  });

// GET /api/users/1
router.get('/:id', async (req, res) => {
    try {
      const userData =  await User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
    res.status(200).json(userData);
    }
 
    catch(err) {
      res.status(400).json(err);
    }
  });

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password});
      
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
         
          req.session.loggedIn = true;
          res.status(200).json(userData); 
        })
        
  }  
  
  catch(err) {
    res.status(400).json(err);
  }
  });

  // LOGIN
  router.post('/login', async (req, res) => {
   try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
    }
    const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables

        req.session.user_id = userData.id;
        req.session.username = userData.username;

        

        req.session.loggedIn = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
   });
  } catch (err) {
    res.status(400).json(err);
  }
    
  });


  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(userData => {
        if (!userData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;