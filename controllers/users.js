const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


usersRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (!regexPass.test(password)) {
        return response.status(400).json({ error: 'la contraseña esta mala compai' })
    } else if (!(email && password)) {
        return response.status(400).json({ error: 'la contraseña y el email son requeridos' })
    } else if (userExist) {
        return response.status(400).json({
            error: 'el email ya existe'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        email,
        passwordHash,
    })

    await newUser.save();
    return response.sendStatus(201);
});

module.exports = usersRouter