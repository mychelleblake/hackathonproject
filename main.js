$(document).ready (function() {


var game = Backbone.Model.extend({
	initialize: function() {
	},
	defaults: {
		name: null,
		description: null,
		equipment: null,
		where: null,
		image: null,
		URL: null,
		number: null
	},
	_parse_class_name: "game"
});

var newGame = new game();

var Games = Backbone.Collection.extend({
	model: game,
	_parse_class_name: "game"
})

var GameList = new Games();


GameList.fetch({
	success: function(resp) {
		var random = getRandomInt(0, 9);
		var dataObj = resp.toJSON().reduce(function(a,b){
			if (parseInt(a.number, 10) === random) {
				return a;
			} else {
				return b;
			}
		});

		console.log(dataObj);
		var dataObj = {"data":dataObj};
		
		var gameTemplate = $("#gameTemplate").text();   
		var gameHTML = Mustache.render(gameTemplate, dataObj);
		$("#gameInject").html(gameHTML);
		console.log("success: ", resp);
	}, error: function(err) {
		console.log("error: ", err);
}
});

var Router = Backbone.Router.extend({
	initialize: function () {
		Backbone.history.start({pushState: true});
	},
	routes: {
		"newGame/:objectId": "chooseGame",
		"":" index"
	}
});


$("#chooseGameButton").on("click", function(e) {
	e.preventDefault();
	window.location = "";
	newGame.set({
		number: $("#number").val(),
		name: $("#name").val(),
		description: $("#description").val(),
		equipment: $("#equipment").val(),
		where: $("#where").val(),
		image: $("#image").val(),
		URL: $("#URL").val()
	})
	// function getRandomEntry() {
 //    var random = Math.floor((Math.random() * (dataObj.length – 1)));
 //         return dataObj[random];
 //  }
})

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
