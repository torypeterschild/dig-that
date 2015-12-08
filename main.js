
// Global variables
// var message = document.getElementById('message');
var squareSize = 6;
var tunnelLength = 12;
var numProbes = 0;
var probesList = [];
var tunnel = new Tunnel();


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
            var n1Id = edgeId.slice(1);
            var n2Id = (Number(edgeId.slice(1)) + 1).toString();
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
            var n2Id = (Number(edgeId.slice(1)) + squareSize + 1).toString();
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

    this.style.background = this.style.background=='yellow'? '#63f9ff':'yellow';
    remainingPieces.innerHTML = "Edges left: " + tunnelLength;
    currentTunnel.innerHTML = "You picked edge " + this.id;
    console.log(tunnel.edges);
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
    probeId = this.id;
    index = probesList.indexOf(probeId);
    console.log("Numprobes: " + numProbes);
    console.log("Index: " + index);
    if (index < 0) {
        probesList.push(probeId);
        numProbes++;
    } else {
        probesList.splice(index, 1);
        numProbes--;
    }

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














