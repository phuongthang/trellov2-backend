const authRouter = require('./auth');
const userRouter = require('./user');



function route(app){
    app.use('/api/user', userRouter);
    app.use('/api', authRouter);
}

module.exports = route;