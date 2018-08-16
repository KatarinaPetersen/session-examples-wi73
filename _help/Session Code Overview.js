

// ================================================================
// Load module   (in "app.js")

const session = require ('express-session');



// ================================================================
// Configuration   (in "app.js")

app.use (session ({
	secret: "What's up, Doc",    // This can be anything you want.
	rolling: true,               // Keeps the session alive by updating the expiration date on every request.
	resave: false,               // Too difficult to explain in one line. See documentation.
	saveUninitialized: false,    // Too difficult to explain in one line. See documentation.
	cookie: {
		secure: false,           // false = http,   true = https (secure)
		expires: 5 * 60 * 1000   // 5 minutes
	}
}));



// ================================================================
// Save data in session   (in a route)

req.session.productPrice = 400;
req.session.productCount = 10;



// ================================================================
// Get data from session   (in a route)

let productPrice = req.session.productPrice;
let productCount = req.session.productCount;



// ================================================================
// Check if the data exists in session   (in a route)

if (typeof req.session.productPrice != 'undefined') {
	// Found
}
else {
	// Missing
}



// ================================================================
// Delete specific data in session   (in a route)

delete req.session.productPrice;



// ================================================================
// Delete all data in session   (in a route)

req.session.destroy();



// ================================================================
