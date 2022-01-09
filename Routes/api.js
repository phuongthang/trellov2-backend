const authRouter = require('./auth');
const userRouter = require('./user');



function route(app){
    app.use('/user', userRouter);
    app.use('', authRouter);
}

module.exports = route;