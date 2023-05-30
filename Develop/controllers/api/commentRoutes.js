const router = require('express').Router();

const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({

    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, (req, res) => {
// check the session
if (req.session) {
  try {
    const createComment = Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    // use the id from the session
    user_id: req.session.user_id,
  })
  res.status(200).json(createComment);
} catch (err) {
  res.status(400).json(err);
}
}
})


router.delete('/:id', withAuth, (req, res) => {
  try {
    const commentData = Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err)
  }
  
});

module.exports = router;