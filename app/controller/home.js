
const UserModel = require('../model/UserModel');
const home = async( cxt ) => {
    let d = await UserModel.getData();
    console.log(d);
    // global.logger.info('home')
    cxt.response.type = 'html';
    cxt.response.body = `<h1>register</h1>
            <form action="/register" method="post">
            <p>Name: <input name="phone"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit1"></p>
            </form>`
}

module.exports = home;
