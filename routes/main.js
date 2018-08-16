
module.exports = function (app) {

	app.get ('/', (req, res) => {

		req.session.destroy();

		res.render ("pages/main");
	})
}