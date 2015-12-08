
// Global variables
// var message = document.getElementById('message');
var squareSize = 6;
var tunnelLength = 12;
var numProbes = 0;
var tunnel = new Tunnel();


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
			if (node.y == 0) {
				starts.push(node);
			}
		}

		//out of all nodes on top row, get all that have just one edge
		var validStarts = [];
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
			if (node.y == (squareSize-1)) {
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
	};

	this.clearTunnel = function() {
		this.edges = {};
		this.nodes = {};
	}
}

function getNodeId(x, y) {
	return squareSize * y + x;
}

function getEdgeId(parentDivId, edgeDivClass) {
	var row = parentDivId[-1];
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
    var parentNode = document.getElementById(this.id).parentNode;
    var edgeClasses = this.className;
    var edgeClass = edgeClasses.split(" ");
    var edgeId = getEdgeId(parentNode.className, edgeClass[0]);
    //message.innerHTML = "Edge clicked.";
    if (tunnelLength <= 0) {
        remainingPieces.innerHTML = "There are no remaining edges! Please remove an edge to continue building.";
    } else {
        //tunnelTest.edges.push(this.id);
        tunnelLength--;
        remainingPieces.innerHTML = "Edges left: " + tunnelLength;
        currentTunnel.innerHTML = "You picked edge " + this.id;
        alert(edgeClass);
    }

    this.style.background = this.style.background=='yellow'? '#63f9ff':'yellow';
};

for(var i=0;i<edges.length;i++){
    edges[i].addEventListener('click', edgeClicked, false);
}

// Get probes and add event listener to each one
// TODO (Tory): make event listener do the following:
// also use jquery to toggle color
// add/remove from probes list
var probes = document.getElementsByClassName("probe");

var probeClicked = function() {
    ++numProbes;
    probeCount.innerHTML = "You have placed " + numProbes + " probe(s).";
    //message.innerHTML = "Probe clicked";
    this.style.background = this.style.background=='red'? 'blue':'red';
};

for(var i=0;i<probes.length;i++){
    probes[i].addEventListener('click', probeClicked, false);
}

var startGame = function () {
    document.getElementById('start').style.display = 'none';
    document.getElementById('tunnelDone').style.display = 'block';
    tunnelInfo.innerHTML = "Tunnel can be up to " + tunnelLength + " edges long.";
    remainingPieces.innerHTML = "Edges left: " + tunnelLength;
    //message.innerHTML = "Detector, please look away while Badguy builds a tunnel.";
    alert("Detector, please look away while Badguy builds a tunnel.");
};

var doneAddingTunnels = function () {
    document.getElementById('tunnelDone').style.display = 'none';
    document.getElementById('probesPlaced').style.display = 'block';
    tunnelInfo.innerHTML = "";
    remainingPieces.innerHTML = "";
    currentTunnel.innerHTML = "";
    message.innerHTML = "Done adding tunnels. Time for Detector to place probes.";
    //check if a valid tunnel
    //if yes make tunnel invisible and move on to probe section
    //else explain rules of a valid tunnel and start over
};

var doneAddingProbes = function () {
    message.innerHTML = "Done adding probes. Let's see how you did.";
    //check if after 1st hour or second
    //if 1st, return results and let them place probes again
    //if 2nd, return results
};

// Add button event listeners
document.getElementById('start').addEventListener('click', startGame, false);

document.getElementById('tunnelDone').addEventListener('click', doneAddingTunnels, false);

document.getElementById('probesPlaced').addEventListener('click', doneAddingProbes, false);














