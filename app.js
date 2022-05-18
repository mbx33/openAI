import 'dotenv/config';

const express = require('express');
const app = express();

const path = require('path');
const ejsmate = require('ejs-mate');

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`APP IS LISTENING ON ${port}!`);
});
