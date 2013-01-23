//Binomial Coin Experiment
var stepID, runID;
var runCount = 0, stopCount = 0, stopFreq = 10;
var currentRecord, completeRecord = "", header = "Run\tX";;
var binomialDist, distGraph, pParam, nParam;
var recordTable, distTable;
var runButton, stepButton, distCanvas, stopSelect, showCheck;
var p = 0.5, n = 10, N = 50, sum, count;
var coin = new Array(N);

function initializeExperiment(){
	runButton = document.getElementById("runButton");
	stepButton = document.getElementById("stepButton");
	recordTable = document.getElementById("recordTable");
	distCanvas = document.getElementById("distCanvas");
	distTable = document.getElementById("distTable");
	stopSelect = document.getElementById("stopSelect");
	stopSelect.value = "10";
	showCheck = document.getElementById("showCheck");
	showCheck.checked = true;
	for (var i = 0; i < N; i++) coin[i] = new Coin(document.getElementById("coin" + i));
	nParam = new Parameter(document.getElementById("nInput"), document.getElementById("nLabel"));
	nParam.setProperties(1, N, 1, n, "<var>n</var>");
	pParam = new Parameter(document.getElementById("pInput"), document.getElementById("pLabel"));
	pParam.setProperties(0, 1, 0.01, p, "<var>p</var>");
	resetExperiment();
}

function stepExperiment(){
	stepButton.disabled = "true";
	runButton.disabled = "true"
	count = 0;
	sum = 0;
	for (var i = 0; i < N; i++){
		if (i < n) coin[i].setValue(-1);
		else coin[i].setValue(-2);
	}
	stepID = setInterval(tossCoin, 50);
}

function runExperiment(){
	runID = setInterval(tossCoins, 20);
	stepButton.disabled = true;
	stopSelect.disabled = true;
}

function stopExperiment(){
	stopCount = 0;
	clearInterval(runID);
	clearInterval(stepID);
	stepButton.disabled = false;
	runButton.disabled = false;
	stopSelect.disabled = false;
	if (runCount > 0) recordTable.value = header + completeRecord;
}

function resetExperiment(){
	stopExperiment();
	runCount = 0; stopCount = 0;
	p = pParam.getValue();
	n = nParam.getValue();
	for (var i = 0; i < N; i++){
		coin[i].prob = p;
		if (i < n) coin[i].setValue(-1);
		else coin[i].setValue(-2);
	}
	completeRecord = "";
	recordTable.value = header;
	binomialDist = new BinomialDistribution(n, p);
	distGraph = new DistributionGraph(distCanvas, binomialDist, "X");
	distGraph.showDist(showCheck.checked);
	distTable.value = distGraph.text();
}

function setCoinCount(){
	coinCount = coinSelect.value;
	resetExperiment();
}

function tossCoins(){
	stopCount++;
	sum = 0;
	for (var i = 0; i < n; i++){
		coin[i].toss();
		sum = sum + coin[i].value;
	}
	update();
	recordTable.value = header + "\n" + currentRecord;
	if (stopCount == stopFreq) stopExperiment();
}

function tossCoin(){
	if (count < n){
		coin[count].toss();
		sum = sum + coin[count].value;
		count++;
	}
	else{
		update();
		stopExperiment();
	}
}

function showDist(b){
	distGraph.showDist(b);
	distTable.value = distGraph.text();
}

function update(){
	runCount++;
	binomialDist.setValue(sum);
	currentRecord = runCount + "\t" + sum;
	completeRecord = completeRecord + "\n" + currentRecord;
	distGraph.showDist(showCheck.checked);
	distTable.value = distGraph.text();
}	

