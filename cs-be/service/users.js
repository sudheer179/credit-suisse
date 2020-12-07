const Users = require("../model/users");

const UserSevice = {
    registerUser: (User) => Users.create(User),
    loginUser: (email, password) => Users.findOne({ email, password }),
    removeUser: (userId) => Users.remove({ _id: userId }),
    updateUser: (userId, User) => Users.updateOne({ _id: userId }, User),
    findAllUser: () => Users.find({}),
};

module.exports = UserSevice;