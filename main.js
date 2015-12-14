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
var gameMode = -1;
var player1Name = "";
var player2Name = "";
var player1Score = -1;
var player2Score = -1;
var round = 1;
	// 0 = Regular
	// 1 = Easy Mode
var computer = -1;
	// 0 = Humans
	// 1 = AI	
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

$(function() {
	$("#startEasy").click(function(){
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

Node.prototype.toString = function nodeToString() {
	var ret = this.id + ": ";
	for (var i = 0; i < this.edges.length; i++) {
		ret += (this.edges[i].id + " ");
	}
	return ret;
}

function Edge(n1, n2, id) {
	this.n1 = n1;
	this.n2 = n2;
	this.id = id;
	this.allNodes = [];
}

Edge.prototype.toString = function edgeToString() {
	var ret = this.id + ": ";
	for (var i = 0; i < this.allNodes.length; i++) {
		ret += (this.allNodes[i].id + " ");
	}
	return ret;
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
		// Get all nodes that are touching the top row
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

		// Out of all nodes on top row, get all that have just one edge
		var validStarts = [];
		for (var i = 0; i < starts.length; i++) {
			if (starts[i].edges.length == 1) {
				validStarts.push(starts[i]);
				console.log("valid starts: ", validStarts);
			}
		}

		// If there is just one such node, it's our start
		// Else there isn't a valid start node and tunnel is invalid
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
		// Get all nodes that are touching the bottom row
		var ends = [];
		for (var nodeId in this.nodes) {
			if (!this.nodes.hasOwnProperty(nodeId)) {
				// Not direct property of nodes
				continue;
			}

			node = this.nodes[nodeId];
			if (Number(node.id) >= (boardSize * (boardSize + 1))) {
				ends.push(node);
			}
		}

		// Out of all nodes on top row, get all that have just one edge
		var validEnds = [];
		for (var i = 0; i < ends.length; i++) {
			if (ends[i].edges.length == 1) {
				validEnds.push(ends[i]);
			}
		}

		// If there is just one such node, it's our start
		// Else there isn't a valid start node and tunnel is invalid
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

Tunnel.prototype.toString = function tunnelToString() {
	var ret = "tunnel: \n";
	ret += "nodes: ";
	for (var n in this.nodes) {
		ret += (this.nodes[n].id + " ");
	}
	ret += "\nedges: ";
	for (var e in this.edges) {
		ret += (this.edges[e].id + " ");
	}
	ret += "\n";
	return ret;
}

// Eetermine if was clicked before or not and add/remove edge from tunnel class
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

		// this.style.background = this.style.background=='yellow'? '#63f9ff':'yellow';
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

var startGameInRegularMode = function () {
	gameMode = 0;
	startGame();
}

var startGameInEasyMode = function () {
	gameMode = 1;
	startGame();
}

var startGameAI = function () {
	computer = 1;
	gameMode = 0;
	gameState = 0;
	console.log("GAME STATE IN START AI ", gameState);
	tunnel = createAITunnel();
	startGame();
}

var startGameEasyAI = function () {
	computer = 1;
	gameMode = 1;
	gameState = 0;
	tunnel = createAITunnel();
	startGame();
}

var startGame = function () {
	gameState++;
	console.log("GAME STATE IS ", gameState);
	document.getElementById('start').style.display = 'none';
	document.getElementById('startEasy').style.display = 'none';
	document.getElementById('startAI').style.display = 'none';
	document.getElementById('startEasyAI').style.display = 'none';
	if (gameState == 0) {
		tunnelInfo.innerHTML = "Tunnel can be up to " + tunnelLength + " edges long.";
		remainingPieces.innerHTML = "Edges left: " + tunnelLength;
		document.getElementById('tunnelDone').style.display = 'block';
	} else if (gameState == 1) {
		message.innerHTML = "Computer opponent has constructed a tunnel. Detector, begin placing probes.";
		document.getElementById('probesPlaced1').style.display = 'block';
	}
};

// TODO: need to actually stop them if they built a bad tunnel
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
	message.innerHTML = "Done adding tunnels. Time for Detector to place first round of probes.";
	for (var e in tunnel.edges) {
		console.log("TRYING TO UNHIGHLIGHT");
		console.log("tunnel.edges[e].id is ", tunnel.edges[e].id);
		$("#" + tunnel.edges[e].id).toggleClass("animate");
	}

	tunnelLength = 12;
	tunnel = createAITunnel();

	console.log("final final tunnel:");
	console.log("nodes");
	for (var n in tunnel.nodes) {
		console.log(tunnel.nodes[n] + "");
	}
	console.log("edges: ");
	for (var e in tunnel.edges) {
		console.log(tunnel.edges[e] + "");
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
				if (gameMode == 1) {
					$("#" + tunnel.nodes[probesList[i]].edges[j].id).addClass("animate");
				}
			}
			$("#p" + probesList[i]).toggleClass("animate");
		}
	}
	// Iterate through probesList to turn off and delete
	for (var i = 0; i < probesList.length; i++) {
		$("#p" + probesList[i]).addClass("detectedEdge");
	}

	if (gameState == 1) {
		probesList = [];
		message.innerHTML = "Detector, please place the second round of probes..";
		document.getElementById('probesPlaced1').style.display = 'none';
		document.getElementById('probesPlaced2').style.display = 'block';



		gameState++;
	} else if (gameState == 2) {
		document.getElementById('probesPlaced2').style.display = 'none';
		document.getElementById('submitGuess').style.display = 'block';
		message.innerHTML = "Now, select all edges in the tunnel to submit your final guess.";
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


// AI tunnel stuff
function createAITunnel() {
	var aiTunnel = new Tunnel();
	var graph = new Graph();
	graph.createGraph();
	var currentTunnelLength = 0;

	var start = Math.floor(Math.random() * (boardSize+1));
	var currNodeFromGraph = graph.nodes[start];
	var currNode = new Node(start);

	var counter = 0;

	while(true) {
		console.log("curr node: " + currNode);

		//check if on end and if yes break
		if (Math.floor(currNode.id / (boardSize+1)) == boardSize) {
			console.log("on end!")
			console.log("final tunnel: " + aiTunnel);
			aiTunnel.addNode(currNode);
			break;
		}

		//pick an edge from the current nodes edges that's not the incoming edge
		var potentialEdge = getRandomEdge(currNodeFromGraph, aiTunnel);
		console.log("first potential edge: " + potentialEdge);
		
		//see if adding that edge leaves enough pipes to get to the end
		while (!potentialEdgeValid(potentialEdge, currNode, aiTunnel)) {
		//while(false) {
			potentialEdge = getRandomEdge(currNodeFromGraph, aiTunnel);
			console.log("edge was invalid, got new one: " + potentialEdge);
			//sleepFor(1000);
		}

		//now we have a good edge, update it's n1
		potentialEdge.n1 = currNode;

		//add the edge to currNode
		currNode.addEdge(potentialEdge);

		//add them both to the tunnel
		aiTunnel.addNode(currNode);
		aiTunnel.addEdge(potentialEdge);

		//get the next node
		var currNodeId = currNode.id;
		var newNodeId = null;
		//console.log("curr node id: " + currNodeId);
		for (var i = 0; i < potentialEdge.allNodes.length; i++) {
			//console.log("potentialEdge.allNodes[i].id: " + potentialEdge.allNodes[i].id );
			if (potentialEdge.allNodes[i].id != currNodeId) {
				newNodeId = potentialEdge.allNodes[i].id;
			}
		}
		//console.log("new node id: " + newNodeId);

		currNodeFromGraph = graph.nodes[newNodeId];
		currNode = new Node(newNodeId);
		currNode.addEdge(potentialEdge);
		potentialEdge.n2 = currNode;
		counter++;

		console.log("tunnel: " + aiTunnel);

	}

	return aiTunnel;
}

function potentialEdgeValid(potentialEdge, currNode, tunnel) {

	if(potentialEdge.id in tunnel.edges) {
		console.log("edge exists, not valid");
		return false;
	}

	tunnel.addEdge(potentialEdge);
	tunnel.addNode(currNode);

	var tunnelLengthSoFar = Object.keys(tunnel.edges).length;
	var edgesLeft = tunnelLength - tunnelLengthSoFar;
	var rowNum = getRowNum(potentialEdge);


	console.log();
	console.log("======= starting validation ========")
	console.log("checking if edge " + potentialEdge.id + " is valid to add to tunnel: ");
	console.log(tunnel + "");
	console.log("tunnel len so far: " + tunnelLengthSoFar);
	console.log("edges left so far: " + edgesLeft);
	console.log("row num of edge: " + rowNum);

	//check that the other end of the new edge isn't already in the tunnel
		//(this means we created a loop)
	var currNodeId = currNode.id;
	var newNodeId = null;
	console.log("curr node id: " + currNodeId);
	for (var i = 0; i < potentialEdge.allNodes.length; i++) {
		//console.log("potentialEdge.allNodes[i].id: " + potentialEdge.allNodes[i].id );
		if (potentialEdge.allNodes[i].id != currNodeId) {
			newNodeId = potentialEdge.allNodes[i].id;
		}
	}
	console.log("new node id: " + newNodeId);

	if (newNodeId in tunnel.nodes) {
		console.log("we created a loop, not valid");
		tunnel.removeEdge(potentialEdge);
		tunnel.removeNode(currNode);
		return false;
	}


	//if the edge is horizontal then need (remaining pieces - (boardSize - rowNum)) >= 0
	//check if have enough nodes to end
	var neededToEnd = -1;
	if (potentialEdge.id[0] == "h") {
		console.log("edge is horiz");
		//check if h edge below is already in tunnel
		var edgeBelowId = Number(potentialEdge.id.slice(1)) + boardSize;
		var edgeBelow = "h" + edgeBelowId;
		if (edgeBelow in tunnel.edges) {
			console.log("can't add this horiz edge because will cause box");
			tunnel.removeEdge(potentialEdge);
			tunnel.removeNode(currNode);
			return false;
		}
		neededToEnd = boardSize - rowNum;
	} else {
		if (newNodeId > currNodeId) { //edge is going down
			console.log("edge is v going down")
			neededToEnd = (boardSize - rowNum) - 1;
		} else {
			console.log("edge is v going up");
			//console.log("so for now returning false");
			//return false;
			//can't go up on the edges
			var potEdgeIdNum = Number(potentialEdge.id.slice(1));
			if(potEdgeIdNum % (boardSize + 1) == 0 || potEdgeIdNum % (boardSize + 1) == boardSize) {
				console.log("can't go up on an outside edge");
				tunnel.removeEdge(potentialEdge);
				tunnel.removeNode(currNode);
				return false;
			}

			neededToEnd = (boardSize - rowNum) + 1;
		}
	}	
	console.log("needed to end: " + neededToEnd);
	console.log("======== done with check =========");
	console.log();
	tunnel.removeEdge(potentialEdge);
	tunnel.removeNode(currNode);
	return ((edgesLeft - neededToEnd) >= 0);


	//if edge is vertical 
		//if edge is downward need (remaining pieces - (boardSize - rownum) - 1) >= 0
		//else if upward need (remaining pieces - (boardSize - rownum) + 1) >= 0
}

function getRowNum(edge) {
	var edgeId = Number(edge.id.slice(1));
	if(edge.id[0] == "h") {
		return Math.floor(edgeId / (boardSize));
	} else {
		return Math.floor(edgeId / (boardSize + 1));
	}
}

function getRandomEdge(node, tunnel) {
	//given the tunnel and the current node
	var nodeId = node.id;
	
	var existingEdgeId;
	if (nodeId in tunnel.nodes) {
		var nodeFromTunnel = tunnel.nodes[nodeId];
		existingEdgeId = nodeFromTunnel.edges[0];
	} else {
		existingEdgeId = "bad"
	}
	
	var potentialEdges = [];

	for (var i = 0; i < node.edges.length; i++) {
		if (node.edges[i].id != existingEdgeId) {
			potentialEdges.push(node.edges[i]);
		}
	}

	console.log("list of potential edge candidates for node " + nodeId);
	for(var i = 0; i < potentialEdges.length; i++) {
		console.log(potentialEdges[i].id);
	}

	var rand = potentialEdges[Math.floor(Math.random() * potentialEdges.length)];
	return rand;
}

function Graph() {
	this.nodes = {};
	this.edges = {};
	this.nodeIds = [];
	this.edgeIds = [];

	this.createGraph = function() {
		for(var i = 0; i < ((boardSize+1)*(boardSize+1)); i++) {
			var node = new Node(i);
			this.nodes[i] = node;
			this.nodeIds.push(i);
			var horizontalEdgeIds = getHorizontalEdgesIds(i);
			var verticalEdgeIds = getVerticalEdgesIds(i);

			for(var j = 0; j < horizontalEdgeIds.length; j++) {
				var edgeId = horizontalEdgeIds[j];
				if (edgeId in this.edges) {
					//add the node to the edge
					this.edges[edgeId].allNodes.push(node);
					node.addEdge(this.edges[edgeId]);
				} else {
					//create new edge and add it to edge object
					var edge = new Edge(null, null, edgeId);
					edge.allNodes.push(node);
					this.edges[edgeId] = edge;
					this.edgeIds.push(edgeId);
					node.addEdge(edge);
				}
			}

			for (var j = 0; j < verticalEdgeIds.length; j++) {
				var edgeId = verticalEdgeIds[j];
				if (edgeId in this.edges) {
					//add the node to it
					this.edges[edgeId].allNodes.push(node);
					node.addEdge(this.edges[edgeId]);
				} else {
					//create new edge
					var edge = new Edge(null, null, edgeId);
					edge.allNodes.push(node);
					this.edges[edgeId] = edge;
					this.edgeIds.push(edgeId);
					node.addEdge(this.edges[edgeId]);
				}
			}
		}
		console.log("nodes");
		for (var n in this.nodes) {
			console.log("" + this.nodes[n]);
		}
		console.log("edges");
		for (var e in this.edges) {
			console.log("" + this.edges[e]);
		}
	}
}

function getHorizontalEdgesIds(i) {
	var horizontalEdgeIds = [];

	// console.log("getting horizontal edges for node " + i);

	//create left and right edges
	var rowNum = Math.floor(i / (boardSize + 1));
	var leftEdge = i - (rowNum + 1);
	var rightEdge = i - rowNum;
	var leftEdgeId = "h" + leftEdge;
	var rightEdgeId = "h" + rightEdge;

	// console.log("row num: " + rowNum);
	// console.log("left edge: " + leftEdge);
	// console.log("right edge: " + rightEdge);

	//if on left border, only has right edge
	if (i % (boardSize + 1) == 0) {
		// console.log("on left border");
		leftEdgeId = null;
	}

	//if on right border only has left edge
	if (i % (boardSize + 1) == 6) {
		// console.log("on right border");
		rightEdgeId = null;
	}

	//add non null edges
	if (leftEdgeId != null) {
		horizontalEdgeIds.push(leftEdgeId);
	}

	if (rightEdgeId != null) {
		horizontalEdgeIds.push(rightEdgeId);
	}

	// console.log("final result: " , horizontalEdgeIds);
	return horizontalEdgeIds;
}	

function getVerticalEdgesIds(i) {
	var verticalEdgeIds = [];
	// console.log("getting vertical edges for node " + i);
	
	//if on the first row only has a down edge
	if (i <= boardSize) {
		// console.log("on first row");
		var edgeId = "v" + i;
		verticalEdgeIds.push(edgeId);
		return verticalEdgeIds;
	}

	//if on the bottom row only has an up edge
	if (i >= (boardSize * (boardSize + 1))) {
		// console.log("on bottom row");
		var upEdgeIdNum = i - (boardSize + 1);
		var upEdgeId = "v" + upEdgeIdNum;
		verticalEdgeIds.push(upEdgeId);
		return verticalEdgeIds;
	}

	//else has both edges
	var downEdgeId = "v" + i;
	var upEdgeIdNum = i - (boardSize + 1);
	var upEdgeId = "v" + upEdgeIdNum;
	verticalEdgeIds.push(downEdgeId);
	verticalEdgeIds.push(upEdgeId);
	// console.log("final result: ", verticalEdgeIds);
	return verticalEdgeIds;
}

function edgeIsHorizontal(edge) {
	var edgeId = edge.id;
	var dir = edgeId.slice(0,1);
	if (dir == "h") {
		return true;
	} else {
		return false;
	}
}


// Add button event listeners

// Start game in normal mode
document.getElementById('start').addEventListener('click', startGameInRegularMode, false);

// Start game in easy mode
document.getElementById('startEasy').addEventListener('click', startGameInEasyMode, false);

// Start game with AI
document.getElementById('startAI').addEventListener('click', startGameAI, false);

// Start game with AI in easy mode
document.getElementById('startEasyAI').addEventListener('click', startGameEasyAI, false);

document.getElementById('tunnelDone').addEventListener('click', doneAddingTunnels, false);

document.getElementById('probesPlaced1').addEventListener('click', doneAddingProbes, false);

document.getElementById('probesPlaced2').addEventListener('click', doneAddingProbes, false);

document.getElementById('submitGuess').addEventListener('click', submitGuess, false);

