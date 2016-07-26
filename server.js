var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000
var todos = [ {
	id: 1,
	description: 'Meet Mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to store',
	completed: false
}, {
	id: 3,
	description: 'Take Eliza to school',
	completed: true
} ];

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

	console.log(todoId);
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

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

