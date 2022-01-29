const authRouter = require('./auth');
const userRouter = require('./user');
const projectRouter = require('./project');
const taskRouter = require('./task');



function route(app){
    app.use('/api/user', userRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/task', taskRouter);
    app.use('/api', authRouter);
}

module.exports = route;