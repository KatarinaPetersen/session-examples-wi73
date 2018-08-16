
module.exports = function (app) {
	
	// ================================================================
	
	let bananaRequired = function (req, res, next) {
		// This middleware-function can be added to any route.
		// It will check if there are enough bananas in the session.
		// If there are then the route will be allowed to execute.
		// Otherwise, it will redirect the user to the "insufficient_bananas" page.

		/* ATTENTION */

		if (typeof req.session.bananas != 'undefined'  &&  req.session.bananas > 0) {
			next();
		}
		else {
			res.redirect ('/example_02/insufficient_bananas');
		}
	}
	
	// ================================================================
	
	app.get ('/example_02', (req, res) => {

		// This route is used to display data that is stored in the session.
	
		/* ATTENTION */

		// Copy data from session
		let productPrice = req.session.productPrice;
		let productCount = req.session.productCount;

		res.render ("example_02/pages/show_session", {
			productPrice: productPrice,
			productCount: productCount,
			debugSessionData: debugSessionData (req)
		});

	})
	
	// ================================================================
	
	app.get ('/example_02/set_session', (req, res) => {
	
		// This route is used to create or change data in the session.
	
		/* ATTENTION */

		req.session.bananas = 5;

		res.render (`example_02/pages/set_session`);
	})
	
	// ================================================================
	
	app.get ('/example_02/restricted', bananaRequired, (req, res) => {
		
		// This route displays a restricted page.
		// To view the page, there has to be at least one banana in the session.

		/* ATTENTION */

		// Copy data from session
		let bananas = req.session.bananas;

		res.render ("example_02/pages/restricted", {
			bananas: bananas
		});
	})
	
	// ================================================================
	
	app.get ('/example_02/insufficient_bananas', (req, res) => {
		
		// This route tells the user that they don't have enough bananas.

		res.render ("example_02/pages/insufficient_bananas");
	})
	
	// ================================================================
	
	app.get ('/example_02/eat_banana', (req, res) => {
		
		// This route removes one banana from the session.
		// It prevents the number of bananas dropping below zero.
		// Finally, it attempts to send the user to the restricted page.

		/* ATTENTION */

		req.session.bananas --;
		if (req.session.bananas < 0)  req.session.bananas = 0;
		res.redirect ('/example_02/restricted');
	})
	
	// ================================================================
	
	let debugSessionData = (req) => {
		// To simplify the output of the session contents, the "cookie" property is removed before display the session in the browser
		let copyOfSession = JSON.parse (JSON.stringify (req.session));  delete copyOfSession.cookie;  return `<pre>Session data: <br>${JSON.stringify (copyOfSession, null, 4)}</pre>`;
	}
	
	// ================================================================
}