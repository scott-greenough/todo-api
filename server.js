var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('TODO API Root');
});

//GET request /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = req.params.id;
	var foundMatch = false;
	var todo;

	app.use (bodyParser.json);

	//iterate over todos array and find the match
	for (var i=0; i<todos.length; i++) {
		console.log(todos[i].id);
		if (todos[i].id == todoId) {
			foundMatch = true;
			todo = todos[i];
			break;
		}
	}

	console.log(foundMatch);

	if (foundMatch) {
		res.json(todo);
	} else {
		res.status(404).send();
	}

	//res.send('asking for todo with id of ' + req.params.id);
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = req.body;

	body.id = todoNextId;
	todoNextId++;


	todos.push(body);
	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

