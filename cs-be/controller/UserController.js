
const userService = require("../service/users");
const response = require("../utils/response");

const UserController = {
    registerUser: (req, res) => {
        const User = req.body;
        userService.registerUser(User)
            .then(() => res.send(response.formatResponse(200, {}, 'User saved Successfully')))
            .catch(error => res.status(500).send(response.formatResponse(500, {}, error)));
    },
    loginUser: (req, res) => {
        const User = req.body;
        userService.loginUser(User.email, User.password)
            .then(user => {
                if (user)
                    res.send(response.formatResponse(200, {}, 'User logged-in Successfully'));
                else
                    res.status(404).send(response.formatResponse(404, {}, 'User not found'))
            })
            .catch(error => res.status(500).send(response.formatResponse(500, {}, error)));
    },
    removeUser: (req, res) => {
        const { userId } = req.params;
        userService.removeUser(userId)
            .then(() => res.send(response.formatResponse(200, {}, 'User removed Successfully')))
            .catch(error => res.status(500).send(response.formatResponse(500, {}, error)));
    },
    updateUser: (req, res) => {
        const { userId } = req.params;
        const User = req.body;
        userService.updateUser(userId, User)
            .then(() => res.send(response.formatResponse(200, {}, 'User updated Successfully')))
            .catch(error => res.status(500).send(response.formatResponse(500, {}, error)));
    },
    getAllUsers: (req, res) => {
        userService.findAllUser()
            .then(users => res.send(response.formatResponse(200, users)))
            .catch(error => res.status(500).send(response.formatResponse(500, {}, error)));
    }
};
module.exports = UserController;