const { isEmpty } = require('underscore');
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');
const bcrypt = require("bcrypt");

class AuthController {
    /**
     * [POST] /login
     */
    login(req, res, next) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        User.findOne({
            'email': email,
        }).then(user => {
            if (isEmpty(user)) {
                res.status(401);
                res.send('Thông tin tài khoản hoặc mật khẩu không chính xác');
            } else {
                const validPassword = bcrypt.compare(password, user.password);
                if (validPassword) {
                    const token = jwt.sign({ user: user }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRES_IN });
                    res.status(200);
                    res.json({ 'token': token });
                } else {
                    res.status(401);
                    res.send('Thông tin tài khoản hoặc mật khẩu không chính xác');
                }
            }
        }).catch(next);
    }
}

module.exports = new AuthController;