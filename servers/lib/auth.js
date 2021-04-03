const isLogin = (req, res) => {
    if(req.user === undefined) return false;
    else return true;
}

module.exports = isLogin;