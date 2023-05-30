const { Post } = require('../models');

const postData = [
    {
        title: " No Appetite in the Morning",
        post_content: "If you struggle with nausea in the morning, ginger tea can be helpful. Ginger is widely studied for nausea, and if you wake up feeling a bit queasy, it may be a nice way to start your day.",
        user_id: 3
    },
    {
        title: "The Potential Risks of Going Vegetarian or Vegan",
        post_content: "One of the biggest potential risks with going vegan or vegetarian comes when someone is using it as a weight loss diet, or as a cover to feel control over eating. In that case, vegetarianism/veganism takes on all the same risks and side effects of any other diet - binge eating, weight cycling, hormonal issues, gastrointestinal upset, fatigue, lowered self worth, etc",
        user_id: 1
    },
    {
        title: "The MANY Problems with BMI - aka The BS Measuring Index",
        post_content: "One of the problems with BMI is that it doesnt distinguish between fat, muscle, skeletal tissue, or fluid weight. Having a greater percentage of muscle and denser bones are both associated with fitness and good health, however these tissues are heavier and can make ones BMI higher.",
        user_id: 2

    },
    {
        title: "What to Eat When You're Too Tired to Cook",
        post_content: "When youre too tired to cook, dont cook! Takeout is a great option, especially if you order enough to have leftovers the next day. When Im exhausted, my go to orders are Vietnamese vermicelli bowls (since we live in Bostons Little Saigon there are approximately 3,482 options), Indian, and pizza",
        user_id: 5
    },
    {
        title: "What Are You Missing Out On By Dieting?",
        post_content: "Not being able to enjoy holidays or social events because you're stressing about food.",
        user_id: 4
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;