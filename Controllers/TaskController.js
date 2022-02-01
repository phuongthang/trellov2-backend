const { isEmpty } = require('underscore');
const TypeCode = require('../Constants/typeCode');
const User = require('../Models/Users');
const Project = require('../Models/Projects');
const Task = require('../Models/Tasks');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../Configs/Jwt');

const mongoose = require('mongoose');

class TaskController {


    /**
     * [GET] /user/list
     */
    list(req, res, next) {
        Task.find({ project: mongoose.Types.ObjectId(req.params._id) })
            .then(tasks => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/list
     */
    all(req, res, next) {
        Task.find().populate('project').populate('assign')
            .then(tasks => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /project/search
     */
    search(req, res, next) {
        for (const [key, value] of Object.entries(req.body)) {
            if(key === "project"){
                req.body.project = mongoose.Types.ObjectId(req.body.project);
            }
            if(key === "assign"){
                req.body.assign = mongoose.Types.ObjectId(req.body.assign);
            }
        }
        Task.find(req.body).populate('project').populate('assign')
            .then(tasks => {
                if (tasks) {
                    res.status(200);
                    res.json({ tasks: tasks, message: "Lấy danh sách công việc thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy danh sách công việc thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [GET] /user/detail/:_id
     */
    detail(req, res, next) {
        const id = req.params._id;
        Project.findOne({ _id: id }).populate('members')
            .then(project => {
                if (project) {
                    res.status(200);
                    res.json({ project: project, message: "Lấy thông tin dự án thành công !" });
                } else {
                    res.status(500);
                    res.json({ message: 'Lấy thông tin dự án thất bại. Vui lòng thử lại !' });
                }
            })
            .catch(next);
    }

    /**
     * [POST] /project/update
     */
    update(req, res, next) {
        const id = req.body._id;
        let project = { ...req.body };
        Project.findOneAndUpdate({ _id: id }, project)
            .then((project) => {
                res.status(200);
                res.json({ message: "Cập nhật thông tin dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [DELETE] /project/delete
     */
    delete(req, res, next) {
        const id = req.params._id;
        Project.findOneAndDelete({ _id: id })
            .then((project) => {
                res.status(200);
                res.json({ message: "Xóa dự án thành công !" });
            })
            .catch(next);
    }


    /**
     * [POST] /project/create
     */
    create(req, res, next) {
        const data = req.body;
        const title = req.body.title;

        Task.find({
            'title': title,
        })
            .then(tasks => {
                if (isEmpty(tasks)) {
                    const task = new Task(data);

                    // if (req.files['avatar']) {
                    //     user.avatar = '/public/uploads/users/' + req.files['avatar'][0].filename;
                    // }

                    // if (req.files['sub_avatar']) {
                    //     user.sub_avatar = '/public/uploads/users/' + req.files['sub_avatar'][0].filename;
                    // }

                    task.save((err) => {
                        if (err) {
                            res.status(500);
                            res.json({ message: 'Đăng kí công việc thất bại. Vui lòng thử lại !' });
                        }
                        res.status(200);
                        res.json({ message: "Đăng kí công việc thành công !" });
                    });
                } else {
                    res.status(500);
                    res.json({ message: `Công việc ${title} đã tồn tại. Vui lòng đăng kí công việc khác !` });
                }
            })
            .catch(next);
    }
}

module.exports = new TaskController;