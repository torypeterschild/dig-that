
var squareSize = 4;

function Node(x, y, id) {
	this.x = x;
	this.y = y;
	this.edges = [];
	this.id = id;

	this.addEdge = function(e0) {
		this.edges.push(e0);
	}
}

function Edge(n1, n2, id) {
	this.n1 = n1;
	this.n2 = n2;
	this.id = id;
}

function Probe(x, y) {
	this.x = x;
	this.y = y;
}

function Board() {
	this.edges = []
	this.nodes = []

	id = 0;
	for(var y = 0; y < (squareSize*squareSize); y++) {
		for(var x = 0; x < (squareSize*squareSize); x++) {
			nodes.push(new Node(x,y,id))
			id++;
		}
	}

	for (i = 0; i < 6; i++) {
		edges.push(new Edge);
	}
}

function Game(boardSize) {
	this.boardSize = boardSize;
	this.tunnel = new Tunnel();
	this.probes = []
}

function Tunnel() {
	this.edges = {};
	this.nodes = {};

	this.addNode = function(node) {
		var nodeId = node.id;
		this.nodes[nodeId] = node;
	}

	this.removeNode = function(node) {
		var nodeId = node.id;
		delete this.nodes[nodeId];
	}

	this.addEdge = function(edge) {
		var edgeId = edge.id;
		this.edges[edgeId] = edge;
	}

	this.removeEdge = function(edge1) {
		var edgeId = edge1.id;
		delete this.edges[edgeId];
	}

	this.getStartNode = function() {
		//get all nodes that are touching the top row
		var starts = [];
		for (var nodeId in this.nodes) {
			if (!this.nodes.hasOwnProperty(nodeId)) {
				//not direct property of nodes
				continue;
			}

			node = this.nodes[nodeId];
			if (node.y == 0) {
				starts.push(node);
			}
		}

		//out of all nodes on top row, get all that have just one edge
		var validStarts = []
		for (var i = 0; i < starts.length; i++) {
			if (starts[i].edges.length == 1) {
				validStarts.push(starts[i]);
			}
		}

		//if there is just one such node, it's our start
		//else there isn't a valid start node and tunnel is invalid
		if (validStarts.length == 1) {
			return validStarts[0];
		}
		else {
			return null;
		}
	}

	this.getEndNode = function() {
		//get all nodes that are touching the bottom row
		var ends = [];
		for (var nodeId in this.nodes) {
			if (!this.nodes.hasOwnProperty(nodeId)) {
				//not direct property of nodes
				continue;
			}

			node = this.nodes[nodeId];
			if (node.y == (squareSize-1)) {
				ends.push(node);
			}
		}

		//out of all nodes on top row, get all that have just one edge
		var validEnds = []
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
	}

	this.validTunnel = function() {
		//duplicate nodes and edges
		var allEdges = this.edges.slice();
		var allNodes = this.edges.slice();

		var currNode = this.getStartNode();
		
		//if there is no start node, tunnel is invalid
		if (currNode == null) {
			return false;
		}

		//if there is no end node, tunnel is invalid
		if (this.getEndNode() == null) {
			return false;
		}

		//remove start node and it's only edge from total
		this.removeNode(currNode);
		this.removeEdge(currNode.edges[0]);

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
				//if we've removed all the edges we're good
				if (Object.keys(this.edges).length == 0) {
					break;
				}
				else {
					return false;
				}
			}

			//check that each node we reach only has 2 edges
			if(currNode.edges.length != 2) {
				return false;
			}

			//check that one of the two edges is still alive
			var nextEdge = null;
			for (var e in currNode.edges) {
				if (e.id in this.edges) {
					nextEdge = e;
				}
			}

			//neither edge still in total list, tunnel invalid
			if (e == null) {
				return false;
			}

			//clean up - remove curr node and curr edge
			this.removeEdge(nextEdge);
			this.removeNode(currNode);

			//get the next node
			if(currNode.edges[0].n1 != currNode) {
				currNode = currNode.edges[0].n1;
			} 
			else {
				currNode = currNode.edges[0].n2;
			}
		}

		this.nodes = allNodes;
		this.edges = allEdges;
		return true;
	}

	this.clearTunnel = function() {
		this.edges = {};
		this.nodes = {};
	}
}

function getNodeId(x, y) {
	return squareSize * y + x;
}

function getEdgeId(parentDivId, edgeDivClass) {
	var row = parentDivId[:-1];
	var num = parentDivId[-1];

	var x,y;

	if(row == "horiz") {
		//even row
		y = 2 * num;
	} else {
		//odd row
		y = 2 * num + 1;
	}

	x = edgeDivClass[-1];

	return y * squareSize + x;
}


var tunnel = new Tunnel();
var n0Id = getNodeId(1,0);
var n0 = new Node(1,0, n0Id);
var n1Id = getNodeId(2,0);
var n1 = new Node(2,0, n1Id);
var n2Id = getNodeId(2,1);
var n2 = new Node(2,1,n2Id);
var n3Id = getNodeId(1,1);
var n3 = new Node(1,1,n3Id);
var n4Id = getNodeId(1,2);
var n4 = new Node(1,2,n4Id);
var n5Id = getNodeId(1,3);
var n5 = new Node(1,3,n5Id);

var e0 = new Edge(n0, n1, 0);
n0.addEdge(e0);
n1.addEdge(e0);
var e1 = new Edge(n1, n2, 1);
n1.addEdge(e1);
n2.addEdge(e1);
var e2 = new Edge(n2, n3, 2);
n2.addEdge(e2);
n3.addEdge(e2);
var e3 = new Edge(n3, n4, 3);
n3.addEdge(e3);
n4.addEdge(e3);
var e4 = new Edge(n4, n5, 4);
n4.addEdge(e4);
n5.addEdge(e4);

tunnel.addNode(n0);
tunnel.addNode(n1);
tunnel.addNode(n2);
tunnel.addNode(n3);
tunnel.addNode(n4);
tunnel.addNode(n5);

tunnel.addEdge(e0);
tunnel.addEdge(e1);
tunnel.addEdge(e2);
tunnel.addEdge(e3);
tunnel.addEdge(e4);

console.log("NODES");
console.log("nodes", tunnel.nodes);
console.log("EDGES");
console.log("edges", tunnel.edges);

var startNode = tunnel.getStartNode();
var endNode = tunnel.getEndNode();

console.log(startNode);
console.log(endNode);

console.log("=================================")
console.log("=================================")

console.log(tunnel.validTunnel());



var tunnel2 = new Tunnel();

tunnel2.addNode(n1);
tunnel2.addNode(n0);
tunnel2.addEdge(e1);
tunnel2.addEdge(e2);

console.log("=========================")
//console.log(tunnel2.nodes);
console.log("edges before delete" , tunnel2.edges);
console.log("edge id" , e1.id);
tunnel2.removeEdge(e1);
tunnel2.removeNode(n1);
//console.log(tunnel2.nodes);
console.log("edges after delete", tunnel2.edges);













