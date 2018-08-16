
// ================================================================
/* About this example   (by Ady Moussa)

This is a very simple example that demonstrates how to use sessions.
It uses the "express-session" module. Documentation: https://www.npmjs.com/package/express-session

To test the example, start the server and do the following in the browser:

	Test 1

		1. Navigate to the "Show Session" page and confirm that the session is empty.
		2. Navigate to the "Set Session" page which stores some data in the session.
		3. Navigate to the "Show Session" page once again and confirm that the session data is displayed correctly in the browser.
		4. Navigate to the "Dummy page" (no further actions required on this page).
		5. Navigate to the "Show Session" page once again. If the session data is still being displayed then your session is working correctly.
		6. Close the whole browser which should automatically clear your session.
		7. Reopen your browser and navigate to the "Show Session" page. Your session data should be gone as expected.

	Test 2 - Session Expiration

		1. In "app.js", under "Configuration", set "expires" to a low value (try 20 seconds which is 20*1000).
		2. Navigate to the "Set Session" page which stores some data in the session.
		3. Navigate to the "Show Session" page and confirm that the session data is displayed correctly in the browser.
		4. Wait until the session expires (20 seconds in this case). Do NOT refresh the page.
		5. When you think the time is up, refresh the "Show Session" page. The session data should be gone.
*/


module.exports = function (app) {

	app.get ('/example_01', (req, res) => {

		// This route is used to display data that is stored in the session.
	
		/* ATTENTION */

		// Copy data from session
		let productPrice = req.session.productPrice;
		let productCount = req.session.productCount;

		res.render ("example_01/pages/show_session", {
			productPrice: productPrice,
			productCount: productCount,
			debugSessionData: debugSessionData (req)
		});

	})
	
	// ================================================================
	
	app.get ('/example_01/set_session', (req, res) => {
	
		// This route is used to create or change data in the session.
	
		/* ATTENTION */
		
		req.session.productPrice = 400;
		req.session.productCount = 10;

		res.render (`example_01/pages/set_session`);
	})
	
	// ================================================================
	
	app.get ('/example_01/dummy', (req, res) => {
		
		// This route displays a dummy page.
		// The purpose of the dummy page is to have a page that does NOT interact with the session in any way.

		res.render ("example_01/pages/dummy");
	})
	
	// ================================================================
	
	let debugSessionData = (req) => {
		// To simplify the output of the session contents, the "cookie" property is removed before display the session in the browser
		let copyOfSession = JSON.parse (JSON.stringify (req.session));  delete copyOfSession.cookie;  return `<pre>Session data: <br>${JSON.stringify (copyOfSession, null, 4)}</pre>`;
	}
}