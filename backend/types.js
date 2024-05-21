const zod = require("zod");

const user = zod.object({
    firstname: zod.string().min(3),
    lastname: zod.string().min(3),
    email: zod.string().email(),
    phone:zod.string().length(10),
    password:zod.string().min(5),
    wallet:zod.number()
});

const signinUser = zod.object({
    email: zod.string().email(),
    password:zod.string().min(5)
});

const changeUser = zod.object({
    email: zod.string().email(),
    firstname: zod.string().min(3),
    password:zod.string().min(5)
});

module.exports = {
    addUser:user,
    verifyUser:signinUser,
    changeUser:changeUser
}