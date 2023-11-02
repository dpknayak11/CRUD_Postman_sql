const bodyParser = require('body-parser');
const express = require('express');
const UserData = require('./model');

const app = express();
app.use(bodyParser.json())

app.post('/crud', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = UserData.create({ name: name, email: email })
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message })
    }
})

app.get('/crud', async (req, res) => {
    try {
        const users = await UserData.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/crud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id:............");
        const user = await UserData.findByPk(id);
        if (!user) { return res.status(404).json({ error: 'User not found' }) }
        await user.destroy();
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/crud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await UserData.findByPk(id);
        if (!user) { return res.status(404).json({ error: 'User not found' }) }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

UserData
    .sync()
    // .sync({force: true})
    .then(() => {
        app.listen(3000, () => { console.log("connection done!..") })
    })