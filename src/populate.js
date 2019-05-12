let div = document.getElementById("flowol");

let toolbar = document.createElement("div");
let workspace = document.createElement("div");

let elements = document.createElement("div");

function radioStyle() { 
  let style = document.createElement("span"); 
  style.setAttribute("class", "checkmark"); 
  return style;
}
function radioContainer() { 
  let container = document.createElement("label"); 
  container.setAttribute("class", "container"); 
  return container;
}

let startContainer = radioContainer("Start/end");
let start = document.createElement("input");
let outputContainer = radioContainer("Output");
let output = document.createElement("input");
let delayContainer = radioContainer("Delay");
let delay = document.createElement("input");
let decisionContainer = radioContainer("Decision");
let decision = document.createElement("input");

let separator = document.createElement("hr");

let cursors = document.createElement("div");

let cursorContainer = radioContainer("Cursor");
let cursor = document.createElement("input");
let arrowContainer = radioContainer("Arrow");
let arrow = document.createElement("input");

let startIcon = document.createElement("div");
startIcon.setAttribute("class", "start-icon");
startIcon.innerText = "Start";
let outputIcon = document.createElement("div");
outputIcon.setAttribute("class", "output-icon");
outputIcon.innerHTML = "<li>Output</li>";
let delayIcon = document.createElement("div");
delayIcon.setAttribute("class", "delay-icon");
delayIcon.innerText = "Delay";
let decisionIcon = document.createElement("div");
decisionIcon.setAttribute("class", "decision-icon");
decisionIcon.innerHTML = "<li>Decision</li>";

let cursorIcon = document.createElement("i");
cursorIcon.setAttribute("class", "fas fa-mouse-pointer");
let arrowIcon = document.createElement("i");
arrowIcon.setAttribute("class", "fas fa-long-arrow-alt-right");

startContainer.appendChild(startIcon);
startContainer.appendChild(start);
startContainer.appendChild(radioStyle());
outputContainer.appendChild(outputIcon);
outputContainer.appendChild(output);
outputContainer.appendChild(radioStyle());
delayContainer.appendChild(delayIcon);
delayContainer.appendChild(delay);
delayContainer.appendChild(radioStyle());
decisionContainer.appendChild(decisionIcon);
decisionContainer.appendChild(decision);
decisionContainer.appendChild(radioStyle());

cursorContainer.appendChild(cursorIcon);
cursorContainer.appendChild(cursor);
cursorContainer.appendChild(radioStyle());
arrowContainer.appendChild(arrowIcon);
arrowContainer.appendChild(arrow);
arrowContainer.appendChild(radioStyle());

elements.appendChild(startContainer);
elements.appendChild(outputContainer);
elements.appendChild(delayContainer);
elements.appendChild(decisionContainer);

cursors.appendChild(cursorContainer);
cursors.appendChild(arrowContainer);

toolbar.appendChild(elements);
toolbar.appendChild(separator);
toolbar.appendChild(cursors);

div.appendChild(toolbar);
div.appendChild(workspace);

start.type = "radio";
output.type = "radio";
delay.type = "radio";
decision.type = "radio";

cursor.type = "radio";
arrow.type = "radio";

start.name = "element";
output.name = "element";
delay.name = "element";
decision.name = "element";

cursor.name = "cursor";
arrow.name = "cursor";


toolbar.style.width = "140px";
