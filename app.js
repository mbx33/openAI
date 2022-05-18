require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const path = require('path');
const ejsmate = require('ejs-mate');
const { default: axios } = require('axios');

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('home');
});

app.post('/question', async (req, res) => {
	const input = req.body.prompt;
	let data = {
		prompt: input,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	};
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/engines/text-curie-001/completions',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
				},
			}
		);
		const result = response.data.choices[0].text;
		// res.send(response.data.choices);
		res.status(200).render('home', { result });
		console.log('Request successful!');
	} catch (error) {
		console.log(data, 'ERROR');
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`APP IS LISTENING ON ${port}!`);
});
