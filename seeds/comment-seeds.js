const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "Very nice!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "Well done!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "You did a great job!"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "Awesome, keep it up!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "You made my day!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "Appriciated the good work!"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "Very useful post!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Thanks! You expanded my knowledge."
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;