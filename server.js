var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	console.log('calling get by id');

	var todoId = parseInt(req.params.id);
	var matchedToDo = _.findWhere(todos, {id: todoId});

	if (matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.status(404).send();
	}

	//res.send('asking for todo with id of ' + req.params.id);
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	//set body.description to trimmed value
	body.description = body.description.trim();

	body.id = todoNextId++;

	todos.push(body);

	res.json(body);
});


// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	console.log('calling delete for parameter ' + parseInt(req.params.id, 10));

	var todoId = parseInt(req.params.id, 10);

	var matchedToDo = _.findWhere(todos, {id: todoId});

	if (!matchedToDo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedToDo);
		res.json(todos);
	}

	return todos;
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

