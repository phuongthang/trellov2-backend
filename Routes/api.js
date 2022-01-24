const authRouter = require('./auth');
const userRouter = require('./user');
const projectRouter = require('./project');



function route(app){
    app.use('/api/user', userRouter);
    app.use('/api/project', projectRouter);
    app.use('/api', authRouter);
}

module.exports = route;