var boardSize = 6;
var tunnelLength = 12;
var numProbes = 0;
var probesList = [];
var tunnel = new Tunnel();
var finalTunnelGuess = [];
var gameState = -1;

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

function Graph() {

}

function createAITunnel() {
	var aiTunnel = new Tunnel();
	var nodeIds = [];
	var edgeIds = [];
	var graph = new Graph();
	graph.createGraph();
	var currentTunnelLength = 0;

	var start = Math.floor(Math.random() * (boardSize+1));
	var currNodeFromGraph = graph.nodes[start];
	nodeIds.push(start);
	var potentialEdge = null;

	while(true) {
		//pick an edge from the current nodes edges that's not the incoming edge
		potentialEdge = getRandomEdge(currNodeFromGraph, aiTunnel);
		
		//see if adding that edge leaves enough pipes to get to the end
		while (!potentialEdgeValid(potentialEdge, aiTunnel))

		//keep it if yes, pick another if no
	}
}

function potentialEdgeValid(potentialEdge, tunnel) {
	
}

function getRandomEdge(node, tunnel) {
	//given the tunnel and the current node
	var nodeId = node.id;
	var nodeFromTunnel = tunnel.nodes[nodeId];
	var existingEdgeId = nodeFromTunnel.edges[0];

	var potentialEdges = [];

	for (var i = 0; i < node.edges.length; i++) {
		if (node.edges[i].id != existingEdgeId) {
			potentialEdges.push(node.edges[i]);
		}
	}

	var rand = potentialEdges[Math.floor(Math.random() * potentialEdges.length)];
	return rand;

}

function canStillBuildCompleteTunnel(tunnel, maxTunnelSize, lastAddedEdge) {
	var currentTunnelSize = tunnel.edges.keys.length;
	var horizontal = edgeIsHorizontal(lastAddedEdge);

	if(horizontal) {
	}
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
	}
	

	console.log("nodes");
	for (var n in this.nodes) {
		console.log("" + this.nodes[n]);
	}
	console.log("edges");
	for (var e in this.edges) {
		console.log("" + this.edges[e]);
	}

	//console.log("node ids ", nodeIds);
	//console.log("edge ids ", edgeIds);
}

function getHorizontalEdgesIds(i) {
	var horizontalEdgeIds = [];

	//create left and right edges
	var rowNum = Math.floor(i / boardSize);
	var leftEdge = i - (rowNum + 1);
	var rightEdge = i - rowNum;
	var leftEdgeId = "h" + leftEdge;
	var rightEdgeId = "h" + rightEdge;

	//if on left border, only has right edge
	if (i % (boardSize + 1) == 0) {
		leftEdgeId = null;
	}

	//if on right border only has left edge
	if (i & (boardSize + 1) == 6) {
		rightEdgeId = null;
	}

	//add non null edges
	if (leftEdgeId != null) {
		horizontalEdgeIds.push(leftEdgeId);
	}

	if (rightEdgeId != null) {
		horizontalEdgeIds.push(rightEdgeId);
	}

	return horizontalEdgeIds;
}	

function getVerticalEdgesIds(i) {
	var verticalEdgeIds = [];
	//if on the first row only has a down edge
	if (i <= boardSize) {
		var edgeId = "v" + i;
		verticalEdgeIds.push(edgeId);
		return verticalEdgeIds;
	}

	//if on the bottom row only has an up edge
	if (i > (boardSize * (boardSize + 1))) {
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
	return verticalEdgeIds;
}

function edgeIsHorizontal(edge) {
	if (edge.n1.id < edge.n2.id) {
		if((edge.n1.id + 1) == edge.n2.id) {
			return true;
		}
	} else {
		if ((edge.n2.id + 1) == edge.n1.id) {
			return true;
		}
	}
	return false;
}



var graph = new Graph();



