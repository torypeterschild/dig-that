<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Dr Ecco</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link rel="stylesheet" href="boardGrid.css">
    <link rel="stylesheet" href="animate.css">

</head>
<body>
    <div id="bigTitle" class="post">
        <h1 class="title">Dig That (The Best and Only Version)</h1>
        <h2>(And certainly the only functional version)</h2>
    </div>
    <div>
        <div class="instr">
            <strong>Overview:</strong> <br/>
            <p> Dig That is a two-player game between a Badguy and a Detector. The Badguy builds an explosive tunnel under the city and it is the role of the Detector to detect the tunnel. Two people can play, or one person can play Detector and the computer will be the Badguy. The game has five phases.</p>
            <strong>Phases:</strong> <br/>
            <ol>
                <li> The Detector looks away from the screen while the Badguy builds a tunnel. Maximum length of the tunnel is randomly generated, and will be specified before building begins. The tunnel needs to be a simple path with a start and end node on the top and bottom rows respectively. In order to construct the tunnel, the Badguy needs to click on the edges he wants to be a part of his tunnel. When he is content with the tunnel, he clicks on the "I'm done building my tunnel" button on the right of the screen and the tunnel will disappear. </li> 
                <li> Now the Detector can begin detecting by placing probes on any number of intersections. When the Detector is done, click the "Done placing first round of probes" button. If a given probe is on top of a part of the tunnel, the probe will turn green. Repeat this process up to two more times. </li>
                <li> The Detector selects what she believes is the location of the tunnel. When she is done, she clicks on the "Ready to submit final guess" button. </li>
            </ol>
            <p>If the Detector correctly detected the tunnel, her score is the sum of the number of probes she used. If she incorrectly detected the tunnel, then she gets a score of infinity. Now the two players reverse roles. The winner is the player with the lowest score. </p>
        </div>
    </div>

    <div id="gameArea">
        <div id="gridWrapper">

            <div class="edgeWrapper" id="horiz0">
                <div id="p0" class="corner0 probe probeAnim"></div>
                <div id="h0" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p1" class="corner1 probe probeAnim"></div>
                <div id="h1" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p2" class="corner2 probe probeAnim"></div>
                <div id="h2" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p3" class="corner3 probe probeAnim"></div>
                <div id="h3" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p4" class="corner4 probe probeAnim"></div>
                <div id="h4" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p5" class="corner5 probe probeAnim"></div>
                <div id="h5" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p6" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert0">
                <div id="v0" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v1" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v2" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v3" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v4" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v5" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v6" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz1">
                <div id="p7" class="corner0 probe probeAnim"></div>
                <div id="h6" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p8" class="corner1 probe probeAnim"></div>
                <div id="h7" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p9" class="corner2 probe probeAnim"></div>
                <div id="h8" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p10" class="corner3 probe probeAnim"></div>
                <div id="h9" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p11" class="corner4 probe probeAnim"></div>
                <div id="h10" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p12" class="corner5 probe probeAnim"></div>
                <div id="h11" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p13" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert1">
                <div id="v7" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v8" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v9" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v10" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v11" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v12" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v13" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz2">
                <div id="p14" class="corner0 probe probeAnim"></div>
                <div id="h12" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p15" class="corner1 probe probeAnim"></div>
                <div id="h13" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p16" class="corner2 probe probeAnim"></div>
                <div id="h14" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p17" class="corner3 probe probeAnim"></div>
                <div id="h15" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p18" class="corner4 probe probeAnim"></div>
                <div id="h16" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p19" class="corner5 probe probeAnim"></div>
                <div id="h17" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p20" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert2">
                <div id="v14" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v15" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v16" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v17" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v18" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v19" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v20" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz3">
                <div id="p21" class="corner0 probe probeAnim"></div>
                <div id="h18" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p22" class="corner1 probe probeAnim"></div>
                <div id="h19" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p23" class="corner2 probe probeAnim"></div>
                <div id="h20" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p24" class="corner3 probe probeAnim"></div>
                <div id="h21" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p25" class="corner4 probe probeAnim"></div>
                <div id="h22" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p26" class="corner5 probe probeAnim"></div>
                <div id="h23" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p27" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert3">
                <div id="v21" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v22" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v23" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v24" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v25" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v26" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v27" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz4">
                <div id="p28" class="corner0 probe probeAnim"></div>
                <div id="h24" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p29" class="corner1 probe probeAnim"></div>
                <div id="h25" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p30" class="corner2 probe probeAnim"></div>
                <div id="h26" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p31" class="corner3 probe probeAnim"></div>
                <div id="h27" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p32" class="corner4 probe probeAnim"></div>
                <div id="h28" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p33" class="corner5 probe probeAnim"></div>
                <div id="h29" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p34" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert4">
                <div id="v28" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v29" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v30" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v31" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v32" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v33" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v34" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz5">
                <div id="p35" class="corner0 probe probeAnim"></div>
                <div id="h30" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p36" class="corner1 probe probeAnim"></div>
                <div id="h31" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p37" class="corner2 probe probeAnim"></div>
                <div id="h32" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p38" class="corner3 probe probeAnim"></div>
                <div id="h33" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p39" class="corner4 probe probeAnim"></div>
                <div id="h34" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p40" class="corner5 probe probeAnim"></div>
                <div id="h35" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p41" class="corner6 probe probeAnim"></div>
            </div>
            <div class="wrapper" id="vert5">
                <div id="v35" class="vedge vedgeAnim edge"></div>
                <div class="left1"></div>
                <div id="v36" class="vedge vedgeAnim edge"></div>
                <div class="left2"></div>
                <div id="v37" class="vedge vedgeAnim edge"></div>
                <div class="left3"></div>
                <div id="v38" class="vedge vedgeAnim edge"></div>
                <div class="left4"></div>
                <div id="v39" class="vedge vedgeAnim edge"></div>
                <div class="left5"></div>
                <div id="v40" class="vedge vedgeAnim edge"></div>
                <div class="left6"></div>
                <div id="v41" class="vedge vedgeAnim edge"></div>
            </div>
            <div class="edgeWrapper" id="horiz6">
                <div id="p42" class="corner0 probe probeAnim"></div>
                <div id="h36" class="hedgeAnim hedge hedge0    edge"></div>
                <div id="p43" class="corner1 probe probeAnim"></div>
                <div id="h37" class="hedgeAnim hedge hedge1    edge"></div>
                <div id="p44" class="corner2 probe probeAnim"></div>
                <div id="h38" class="hedgeAnim hedge hedge2    edge"></div>
                <div id="p45" class="corner3 probe probeAnim"></div>
                <div id="h39" class="hedgeAnim hedge hedge3    edge"></div>
                <div id="p46" class="corner4 probe probeAnim"></div>
                <div id="h40" class="hedgeAnim hedge hedge4    edge"></div>
                <div id="p47" class="corner5 probe probeAnim"></div>
                <div id="h41" class="hedgeAnim hedge hedge5    edge"></div>
                <div id="p48" class="corner6 probe probeAnim"></div>
            </div>
            <div id="infoPanel">
                <div id="tunnelInfo"></div>
                <div id="remainingPieces"></div>
                <div id="currentTunnel"></div>
                <div id="probeCount"></div>
                <div id="message"></div>
                <div class="btnbody">
                    <input type="button" class="button grad transition" id="start" value="Play with Two People" style="display: block">
                    <input type="button" class="button grad transition" id="startEasy" value="Play in Easy Mode" style="display: block">
                    <input type="button" class="button grad transition" id="startAI" value="Play with AI" style="display: block">
                    <input type="button" class="button grad transition" id="startEasyAI" value="Play with AI in Easy Mode" style="display: block">
                    <input type="button" class="button grad transition" id="tunnelDone" value="I'm done building my tunnel." style="display: none">
                    <input type="button" class="button grad transition" id="probesPlaced1" value="Done placing first round of probes." style="display: none">
                    <input type="button" class="button grad transition" id="probesPlaced2" value="Done placing second round of probes." style="display: none">
                    <input type="button" class="button grad transition" id="submitGuess" value="Ready to submit final guess." style="display: none">
                    <button id="score" style="display:none" onClick="postScore(winningScore, winningPlayer)" type="button">Save Score</button>
                </div>
                <div class="badguy"></div>
                <div class="detector"></div>
            </div>
            <div id="lookaway" class="popup">
                <p>Detector, please look away while Badguy contructs a tunnel.</p>
            </div>
        </div>
        <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="main.js"></script>

        <div>
            <script>
                function postScore(ws, wr) {
                console.log(ws);
            console.log(wr);
                    if (!wr)
                        wr = "guest";
                    if (wr == "")
                        wr = "guest";
                    document.location.href="/drecco/index.php?task=DigThatV2&winner="+wr+"&ws="+ws;
                }
            </script>
            <!-- <button id="score" style="display:none" onClick="postScore(winningScore, winningPlayer)" type="button">Save Score</button> -->
        </div>
    </div>
    <script type="text/javascript" src="logic.js"></script>



    <div id="last10" class="post">
        <h2 class="title">Last 10 Scores</h2>
        <?php
    // functions.php in case of an opening in the same window
    // ../../functions.php in case of an opening in a new window
        include '../../lastScores.php';
        getScores("DigThatV2");
        ?>
    </div>

</body>
</html>