const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//controller user
const user = require('./users')

const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//routing
app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Welcome to API Radius!',
        errorData: {}
    })
})
app.post('/user-branch', user.createUserBranch)
app.get('/user-branch', user.listUserBranch)
app.post('/user-supervisor', user.createUserSupervisor)
app.get('/user-supervisor', user.listUserSupervisor)
app.put('/user-role/:user_id', user.changeUserRole)

//routing not found
app.use(function (req, res) {
    res.status(404);
    res.json({
        status: 404,
        message: 'Page Not Found',
        errorData: {}
    });
});

//create server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
