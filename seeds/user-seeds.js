const { User } = require('../models');

const userData = [
    {
        username: "kuromi",
        email: 'kuromi@gmail.com',
        password: "kuro"
    },
    {
        username: "MyMelody",
      email: "mymelody@gmail.com",
        password: "melomelo"
    },
    {
        username: "Cinamoroll",
       
        email: "cinamoroll@yahoo.com",
        password: "cinacina"
    },
    {
        username: "hellokitty",
        
        email: "hellokitty@gmail.com",
        password: "kitykity"
    },
    {
        username: "badmaru",
        
        email: "badmaru@gmail.com",
        password: "badbadmaru"
    },
    {
        username: "keroppi",
        
        email: "keroppi@gmail.com",
        password: "keroppi1"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;