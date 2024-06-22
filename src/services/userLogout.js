const userLogout = (req, res) => {
    req.logout((err) => {
		req.session.destroy();
		if (err) {
			return res.status(500).json({error: "로그아웃 중 문제가 발생하였습니다.?"});
		} else {
			return res.redirect('/');
		}
	});
}

module.exports = userLogout;