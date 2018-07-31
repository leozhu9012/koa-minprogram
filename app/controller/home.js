
const UserModel = require('../model/UserModel');
const home = async( cxt ) => {
    // global.logger.info('home')
    cxt.response.type = 'html';
    cxt.response.body = `<h1>register</h1>
            <form action="/account/add" method="post">
            <p>price: <input name="price"></p>
            <p>remarks: <input name="remarks"></p>
            <p>discription: <input name="discription" ></p>
            <p>discription: <input name="id" ></p>
            <p><input type="submit" value="Submit1"></p>
            </form>`
}

module.exports = home;
