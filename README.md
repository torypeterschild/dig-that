# digthat

Description

There is a grid. Some bad guys have placed a tunnel from the bottom, beginning at the intersection marked Start in the south, and ending at End in the north. The tunnel follows the path of the roads somehow but may wind around. It is also a simple path (no dead ends and no loops along the way). You want to probe a minimum number of times and yet be able to find the exact route of the tunnel.

Suppose a probe can tell whether a tunnel ran under an intersection or not and which of the four possible entering streets the tunnel runs under. We call these directional probes.

If the tunnel is at most k blocks long and begins at Start and ends at End, then what is the minimum number of directional probe devices you would need to place to guarantee to determine the precise route of the tunnel in two hours? That is, you'll place some number of probes in the first hour and you can move those probes in the second hour based on the responses from the first. Your score is the maximum number of probes you use in either hour.
