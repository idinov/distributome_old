//Triangle distribution simulation
var runID;
var runCount = 0, stopCount = 0, stopFreq = 10, coinCount = 10;
var currentRecord, completeRecord = "", header = "Run\tX";
var dist, distGraph, aParam, bParam;
var recordTable, distTable;
var runButton, stepButton, distCanvas, stopSelect, showSelect;
var a = 0, w = 1, p = 0.5;

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
	aParam = new Parameter(document.getElementById("aInput"), document.getElementById("aLabel"));
	aParam.setProperties(-10, 10, 0.1, a, "<var>a</var>");
	wParam = new Parameter(document.getElementById("wInput"), document.getElementById("wLabel"));
	wParam.setProperties(0.5, 10, 0.1, w, "<var>w</var>");
	pParam = new Parameter(document.getElementById("pInput"), document.getElementById("pLabel"));
	pParam.setProperties(0, 1, 0.01, p, "<var>p</var>");
	resetExperiment();
}

function stepExperiment(){
	simulate();
	recordTable.value = header + completeRecord;
}

function runExperiment(){
	runID = setInterval(simulate, 20);
	stepButton.disabled = true;
	stopSelect.disabled = true;
}

function stopExperiment(){
	stopCount = 0;
	clearInterval(runID);
	stepButton.disabled = false;
	stopSelect.disabled = false;
	if (runCount > 0) recordTable.value = header + completeRecord;
}

function resetExperiment(){
	stopExperiment();
	runCount = 0; stopCount = 0;
	completeRecord = "";
	recordTable.value = header;
	a = aParam.getValue();
	w = wParam.getValue();
	p = pParam.getValue();
	dist = new TriangleDistribution(a, w, p);
	distGraph = new DistributionGraph(distCanvas, dist, "X");
	distGraph.showDist(showCheck.checked);
	distTable.value = distGraph.text();
}

function simulate(){
	runCount++;
	stopCount++;
	currentRecord = runCount + "\t" + dist.simulate().toFixed(3);
	recordTable.value = header + "\n" + currentRecord;
	completeRecord = completeRecord + "\n" + currentRecord;
	if (stopCount == stopFreq) stopExperiment();
	distGraph.draw();
	distTable.value = distGraph.text();
}

function showDist(b){
	distGraph.showDist(b);
	distTable.value = distGraph.text();
}

