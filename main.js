/**
 * Created by torypeterschild on 12/9/15.
 */

// Global variables
// var message = document.getElementById('message');
var boardSize = 6;
var tunnelLength = 12;
var numProbes = 0;
var probesList = [];
var tunnel = new Tunnel();
var finalTunnelGuess = [];
var gameState = -1;
	// 0 = badGuy placing tunnels
	// 1 = detector placing 1st hour probes
	// 2 = detector placing 2nd hour probes
	// 3 = detector detecting

$(function() {
	$("#start").click(function(){
		$("#lookaway").show();
		$("#lookaway").delay(1000).fadeOut();
	});
});

function Node(id) {
	this.edges = [];
	this.id = id;

	this.addEdge = function(e0) {
		this.edges.push(e0);
	};

	this.removeEdge = function(e0) {
		var index = this.edges.indexOf(e0);
		this.edges.splice(index, 1);
	}
}

function Edge(n1, n2, id) {
	this.n1 = n1;
	this.n2 = n2;
	this.id = id;
}

function Tunnel() {
	this.edges = {};
	this.nodes = {};

	this.addNode = function(node) {
		var nodeId = node.id;
		this.nodes[nodeId] = node;
	};

	this.removeNode = function(node) {
		var nodeId = node.id;
		delete this.nodes[nodeId];
	};

	this.addEdge = function(edge) {
		var edgeId = edge.id;
		this.edges[edgeId] = edge;
	};

	this.removeEdge = function(edge1) {
		var edgeId = edge1.id;
		delete this.edges[edgeId];
	};

	this.getStartNode = function() {
		//get all nodes that are touching the top row
		var starts = [];
		for (var nodeId in this.nodes) {
			if (!this.nodes.hasOwnProperty(nodeId)) {
				//not direct property of nodes
				continue;
			}

			node = this.nodes[nodeId];
			if (Number(node.id) < (boardSize + 1)) {
				starts.push(node);
			}
		}

		//out of all nodes on top row, get all that have just one edge
		var validStarts = [];
		for (var i = 0; i < starts.length; i++) {
			if (starts[i].edges.length == 1) {
				validStarts.push(starts[i]);
				console.log("valid starts: ", validStarts);
			}
		}

		//if there is just one such node, it's our start
		//else there isn't a valid start node and tunnel is invalid
		console.log("length of validStarts: ", validStarts.length);
		if (validStarts.length == 1) {
			console.log("validStarts[0] is ", validStarts[0]);
			return validStarts[0];
		}
		else {
			return null;
		}
	};

	this.getEndNode = function() {
		//get all nodes that are touching the bottom row
		var ends = [];
		for (var nodeId in this.nodes) {
			if (!this.nodes.hasOwnProperty(nodeId)) {
				//not direct property of nodes
				continue;
			}

			node = this.nodes[nodeId];
			if (Number(node.id) > (boardSize * (boardSize + 1))) {
				ends.push(node);
			}
		}

		//out of all nodes on top row, get all that have just one edge
		var validEnds = [];
		for (var i = 0; i < ends.length; i++) {
			if (ends[i].edges.length == 1) {
				validEnds.push(ends[i]);
			}
		}

		//if there is just one such node, it's our start
		//else there isn't a valid start node and tunnel is invalid
		if (validEnds.length == 1) {
			return validEnds[0];
		}
		else {
			return null;
		}
	};

	this.validTunnel = function() {
		console.log("EDGE INFO ", this.edges);
		console.log("NODES ", this.nodes);
		//duplicate nodes and edges
		var allEdgeIds = [];
		for (var item in this.edges) {
			allEdgeIds.push(item);
		}
		console.log("All edge ids: ", allEdgeIds);
		var allNodeIds = [];
		for (var item in this.nodes) {
			allNodeIds.push(item);
		}
		console.log("All nodes: ", allNodeIds);

		var currNode = this.getStartNode();
		console.log("Start node: ", currNode);

		//if there is no start node, tunnel is invalid
		if (currNode == null) {
			return false;
		}

		//if there is no end node, tunnel is invalid
		if (this.getEndNode() == null) {
			return false;
		}
		console.log("end node: ", this.getEndNode());

		//remove start node and it's only edge from total
		allEdgeIds.splice(allEdgeIds.indexOf(currNode.edges[0].id), 1);

		//get 2nd node
		if(currNode.edges[0].n1 != currNode) {
			currNode = currNode.edges[0].n1;
		}
		else {
			currNode = currNode.edges[0].n2;
		}

		while (true) {
			console.log("beg of loop", currNode.id);

			//end conditions
			if (currNode == this.getEndNode()) {
				console.log("Reached end node");
				//if we've removed all the edges we're good
				if (allEdgeIds.length == 0) {
					return true;
				}
				else {
					console.log("AllEdgeIds does NOT == 0");
					return false;
				}
			}

			//check that each node we reach only has 2 edges
			if(currNode.edges.length != 2) {
				console.log(currNode, "doesn't have 2 edges");
				return false;
			}

			//check that one of the two edges is still alive
			var nextEdge = null;
			console.log("curr node edges:", currNode.edges);
			console.log("All edge Ids: ", allEdgeIds);
			for (var i = 0; i < currNode.edges.length; i++) {
				console.log("currNode.edges[i].id ", currNode.edges[i].id);
				if (allEdgeIds.indexOf(currNode.edges[i].id) > -1) {
					nextEdge = this.edges[currNode.edges[i].id];
				}
			}

			//neither edge still in total list, tunnel invalid
			if (nextEdge == null) {
				console.log(nextEdge, "neither edge still in total list");
				return false;
			}

			//clean up - remove curr node and curr edge
			allEdgeIds.splice(allEdgeIds.indexOf(nextEdge.id), 1);

			//get the next node
			if(nextEdge.n1 != currNode) {
				currNode = nextEdge.n1;
			}
			else {
				currNode = nextEdge.n2;
			}
		}

	};

	this.clearTunnel = function() {
		this.edges = {};
		this.nodes = {};
	}
}

// Get edges and add event listener to each one
// TODO (Tory): make event listener do the following:
// if trying to add tunnel, make sure they still have tunnels to add
// if they don't, generate pop up that will tell them they either need
// to finish or remove a tunnel piece to add another ones

// change color -- if was already clicked, change to unclicked color
// if not clicked change to clicked color
// (should probably use jquery and toggle)

//determine if was clicked before or not and add/remove edge from tunnel class
var edges = document.getElementsByClassName("edge");

var edgeClicked = function() {
	var edgeId = this.id;
	if (gameState == 0) {
		$(this).toggleClass("animate");
		if (edgeId in tunnel.edges) {
			// get nodes
			tunnelLength++;
			var n1 = tunnel.edges[edgeId].n1;
			var n2 = tunnel.edges[edgeId].n2;
			// remove this edge from each node's edge list
			n1.removeEdge(tunnel.edges[edgeId]);
			n2.removeEdge(tunnel.edges[edgeId]);
			if (n1.edges.length == 0) {
				tunnel.removeNode(n1);
			}
			if (n2.edges.length == 0) {
				tunnel.removeNode(n2);
			}
			tunnel.removeEdge(tunnel.edges[edgeId]);
		} else {
			// Check if there are no pieces
			if (tunnelLength <= 0) {
				remainingPieces.innerHTML = "There are no remaining edges! Please remove an edge to continue building.";
				return;
			}
			tunnelLength--;
			if (edgeId[0] == "h") {
				console.log("slice: ", edgeId.slice(1));
				var rNum = Math.floor(edgeId.slice(1) / boardSize);
				console.log("rNum: ", rNum);
				var n1Id = Number(edgeId.slice(1)) + rNum;
				var n2Id = (n1Id + 1).toString();
				console.log("n1Id: ", n1Id);
				console.log("n2Id: ", n2Id);
				var n1;
				var n2;

				if (n1Id in tunnel.nodes) {
					n1 = tunnel.nodes[n1Id];
				} else {
					n1 = new Node(n1Id);
					tunnel.addNode(n1);
				}

				if (n2Id in tunnel.nodes) {
					n2 = tunnel.nodes[n2Id];
				} else {
					n2 = new Node(n2Id);
					tunnel.addNode(n2);
				}

				var newEdge = new Edge(n1, n2, edgeId);
				tunnel.addEdge(newEdge);
				n1.addEdge(newEdge);
				n2.addEdge(newEdge);
			} else {
				var n1Id = edgeId.slice(1);
				var n2Id = (Number(edgeId.slice(1)) + boardSize + 1).toString();
				console.log("n1Id: ", n1Id);
				console.log("n2Id: ", n2Id);
				var n1;
				var n2;

				if (n1Id in tunnel.nodes) {
					n1 = tunnel.nodes[n1Id];
				} else {
					n1 = new Node(n1Id);
					tunnel.addNode(n1);
				}

				if (n2Id in tunnel.nodes) {
					n2 = tunnel.nodes[n2Id];
				} else {
					n2 = new Node(n2Id);
					tunnel.addNode(n2);
				}

				var newEdge = new Edge(n1, n2, edgeId);
				tunnel.addEdge(newEdge);
				n1.addEdge(newEdge);
				n2.addEdge(newEdge);
			}
		}

		//this.style.background = this.style.background=='yellow'? '#63f9ff':'yellow';
		remainingPieces.innerHTML = "Edges left: " + tunnelLength;
		currentTunnel.innerHTML = "You picked edge " + this.id;
		console.log(tunnel.edges);
		console.log("Tunnel nodes: ", tunnel.nodes);
	} else if (gameState == 3) {
		if (finalTunnelGuess.indexOf(edgeId) > -1) {
			finalTunnelGuess.splice(finalTunnelGuess.indexOf(edgeId), 1);
		} else {
			finalTunnelGuess.push(edgeId);
		}
		$(this).toggleClass("final");
	}
};

for(var i = 0; i < edges.length; i++){
	edges[i].addEventListener('click', edgeClicked, false);
}

// Get probes and add event listener to each one
var probes = document.getElementsByClassName("probe");

var probeClicked = function() {
	if (gameState == 1 || gameState == 2) {
		$(this).toggleClass("animate");
		probeId = this.id;
		console.log("Probe id: ", probeId);
		index = probesList.indexOf(probeId);
		console.log("Numprobes: " + numProbes);
		console.log("Index: " + index);
		if (index < 0) {
			probesList.push(probeId.slice(1));
			numProbes++;
		} else {
			probesList.splice(index, 1);
			numProbes--;
		}

		probeCount.innerHTML = "You have placed " + numProbes + " probe(s).";
		this.style.background = this.style.background == 'red' ? 'blue' : 'red';
	}
};

for(var i=0;i<probes.length;i++){
	probes[i].addEventListener('click', probeClicked, false);
}

var startGame = function () {
	gameState++;
	document.getElementById('start').style.display = 'none';
	document.getElementById('tunnelDone').style.display = 'block';
	tunnelInfo.innerHTML = "Tunnel can be up to " + tunnelLength + " edges long.";
	remainingPieces.innerHTML = "Edges left: " + tunnelLength;
	//message.innerHTML = "Detector, please look away while Badguy builds a tunnel.";
	//alert("Detector, please look away while Badguy builds a tunnel.");
};

//TODO: need to actually stop them if they built a bad tunnel
var doneAddingTunnels = function () {
	var valid = tunnel.validTunnel();
	console.log(valid);

	//if the tunnel isn't valid, don't let the game keep going
	if(!valid) {
		alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path");
		return;
	}

	document.getElementById('tunnelDone').style.display = 'none';
	document.getElementById('probesPlaced1').style.display = 'block';
	tunnelInfo.innerHTML = "";
	remainingPieces.innerHTML = "";
	currentTunnel.innerHTML = "";
	message.innerHTML = "Done adding tunnels. Time for Detector to place probes.";
	for (var e in tunnel.edges) {
		console.log("TRYING TO UNHIGHLIGHT");
		console.log("tunnel.edges[e].id is ", tunnel.edges[e].id);
		$("#" + tunnel.edges[e].id).toggleClass("animate");
	}
	gameState++;
};

var doneAddingProbes = function () {
	message.innerHTML = "Done adding probes. Let's see how you did.";
	for (var i = 0; i < probesList.length; i++) {
		console.log("probesList[i] is ", probesList[i]);
		if (probesList[i] in tunnel.nodes) {
			console.log("we got in the if statement");
			for (var j = 0; j < tunnel.nodes[probesList[i]].edges.length; j++) {
				console.log("Found edge ", tunnel.nodes[probesList[i]].edges[j].id);
				$("#" + tunnel.nodes[probesList[i]].edges[j].id).addClass("animate");
			}
		}
	}
	// Iterate through probesList to turn off and delete
	for (var i = 0; i < probesList.length; i++) {
		$("#p" + probesList[i]).toggleClass("animate");
	}

	if (gameState == 1) {
		probesList = [];
		message.innerHTML = "Second round of probes.";
		document.getElementById('probesPlaced1').style.display = 'none';
		document.getElementById('probesPlaced2').style.display = 'block';
		gameState++;
	} else if (gameState == 2) {
		document.getElementById('probesPlaced2').style.display = 'none';
		document.getElementById('submitGuess').style.display = 'block';
		message.innerHTML = "Detector, select edges to complete the tunnel!";
		gameState++;
	}

	console.log("probes list after done ", probesList);

};

var submitGuess = function () {
	console.log("Final tunnel guess: ", finalTunnelGuess);
	console.log("The actual tunnel: ", tunnel.edges);
	console.log("Final tunnel guess LENGTH: ", finalTunnelGuess.length);
	console.log("Tunnel length: ", Object.keys(tunnel.edges).length);
	var clone = finalTunnelGuess.slice(0);
	if (finalTunnelGuess.length != Object.keys(tunnel.edges).length) {
		console.log("Tunnel length not the same");
		alert("you are a horrible Detector. Keep your day job.");
	} else {
		console.log("Tunnel length is good");
		for (var i = 0; i < finalTunnelGuess.length; i++) {
			console.log("Final tunnel guess: iteration ",i, finalTunnelGuess);
			if (finalTunnelGuess[i] in tunnel.edges) {
				console.log("Found match: " + finalTunnelGuess[i]);
				clone.splice(clone.indexOf(finalTunnelGuess[i]), 1);
				console.log("Clone: " + clone)
			}
		}
		console.log("clone length ", clone.length);
		if (!clone.length) {
			alert("good job");
		}
	}
};

// Add button event listeners
document.getElementById('start').addEventListener('click', startGame, false);

document.getElementById('tunnelDone').addEventListener('click', doneAddingTunnels, false);

document.getElementById('probesPlaced1').addEventListener('click', doneAddingProbes, false);

document.getElementById('probesPlaced2').addEventListener('click', doneAddingProbes, false);

document.getElementById('submitGuess').addEventListener('click', submitGuess, false);

