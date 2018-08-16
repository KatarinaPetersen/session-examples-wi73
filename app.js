
// ================================================================
// Dependencies

const express = require ('express');
const session = require ('express-session');  /* ATTENTION */
const path    = require ('path');
const morgan  = require ('morgan');
const app     = express ();



// ================================================================
// Configuration

app.set ('view engine', 'ejs');
app.use ('/', express.static (path.join(__dirname, 'public')));
app.use (morgan ("dev"));

// -----------------------------------

/* ATTENTION */

// Documentation: https://www.npmjs.com/package/express-session
app.use (session ({
	secret: "What's up, Doc",    // This can be anything you want.
	rolling: true,               // Keeps the session alive by updating the expiration date on every request.
	resave: false,               // Too difficult to explain in one line. See documentation.
	saveUninitialized: false,    // Too difficult to explain in one line. See documentation.
	cookie: {
		secure: false,           // false = http,   true = https (secure)
		expires: 5 * 60 * 1000   // 5 minutes
	//	expires:     20 * 1000   // 20 seconds (for testing)
	}
}));



// ================================================================
// Routes

require ("./routes/main") (app);
require ("./routes/example_01") (app);
require ("./routes/example_02") (app);



// ================================================================
// Server Listen

const port = 3000;
app.listen (port, () => console.log (`Server running - http://localhost:${port}`))
