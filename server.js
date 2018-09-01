const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const MONGO_URL ='mongodb://127.0.0.1:27017/auth';
const app = express();

app.use(session({
	secret: 'ESTO ES SECRETO',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		url: MONGO_URL,
		autoReconnect: true
	})
}))

app.get('', (req, res) => {
	req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
	res.send(`Hola! Has visto esta página: ${req.session.cuenta}`);
})

app.listen(3000, () => {
	console.log('Escuchando en el puerto 3000')
})