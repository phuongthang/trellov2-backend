const { isEmpty } = require('underscore');
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');

class AuthController {
    /**
     * [POST] /login
     */
    login(req, res, next) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        User.findOne({
            'email': email,
            'password': password
        }).then(user => {
            if (isEmpty(user)) {
                res.status(401);
                res.send('Thông tin tài khoản hoặc mật khẩu không chính xác');
            } else {
                const token = jwt.sign({ user: user }, jwtConfig.SECRET_KEY , { expiresIn: jwtConfig.EXPIRES_IN });
                res.status(200);
                res.json({'token': token});
            }
        }).catch(next);
    }
}

module.exports = new AuthController;