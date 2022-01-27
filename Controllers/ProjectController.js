const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');

class ProjectController {


    /**
     * [GET] /user/list
     */
    list(req, res, next) {
        Project.find({ delete_flag: TypeCode.DELETE_FLAG.FALSE }).populate('members').populate('project_manager')
            .then(projects => {
                if (projects) {
                    res.status(200);
                    res.json({ projects: projects, message: "Lấy danh sách dự án thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách dự án thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/search
     */
    search(req, res, next) {
        User.find(req.body)
            .then(users => {
                if (users) {
                    res.status(200);
                    res.json({ users: users, message: "Lấy danh sách nhân viên thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách nhân viên thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/detail/:_id
     */
    detail(req, res, next) {
        const id = req.params._id;
        User.findOne({ _id: id })
            .then(user => {
                if (user) {
                    res.status(200);
                    res.json({ user: user, message: "Lấy thông tin nhân viên thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy thông tin nhân viên thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [POST] /user/update
     */
    update(req, res, next) {
        const id = req.body._id;
        let user = { ...req.body };
        if (req.files['avatar']) {
            user.avatar = '/public/uploads/users/' + req.files['avatar'][0].filename;
        }

        if (req.files['sub_avatar']) {
            user.sub_avatar = '/public/uploads/users/' + req.files['sub_avatar'][0].filename;
        }

        User.findOneAndUpdate({ _id: id }, user)
            .then((user) => {
                User.findById(id)
                    .then((user) => {
                        const token = jwt.sign({ user: user }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRES_IN });
                        res.status(200);
                        res.json({ token: token, message: "Cập nhật tài khoản thành công !" });
                    })
            })
            .catch(next);
    }


    /**
     * [DELETE] /user/delete
     */
    delete(req, res, next) {
        const id = req.params._id;
        User.findOneAndDelete({ _id: id })
            .then((user) => {
                res.status(200);
                res.json({ message: "Xóa tài khoản nhân viên thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req, res, next) {
        const data = req.body;
        const project_name = req.body.project_name;

        Project.find({
            'project_name': project_name,
        })
            .then(projects => {
                if (isEmpty(projects)) {
                    const project = new Project(data);

                    project.save((err) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: 'Đăng kí dự án thất bại. Vui lòng thử lại !' });
                        }
                        res.status(200);
                        res.json({ message: "Đăng kí dự án thành công !" });
                    });
                } else {
                    res.status(500);
                    res.json({ message: `Dự án ${project_name} đã tồn tại. Vui lòng đăng kí dự án khác !` });
                }
            })
            .catch(next);
    }
}

module.exports = new ProjectController;