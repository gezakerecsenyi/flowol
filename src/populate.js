let div = document.getElementById("flowol");

let toolbar = document.createElement("div");
let workspace = document.createElement("div");

let elements = document.createElement("div");

function radioStyle() { 
  let style = document.createElement("span"); 
  style.setAttribute("class", "radio"); 
  return style;
}
function radioContainer() { 
  let container = document.createElement("label"); 
  container.setAttribute("class", "container"); 
  return container;
}

let startContainer = radioContainer();
let start = document.createElement("input");
let outputContainer = radioContainer();
let output = document.createElement("input");
let delayContainer = radioContainer();
let delay = document.createElement("input");
let decisionContainer = radioContainer();
let decision = document.createElement("input");

let separator = document.createElement("hr");

let cursors = document.createElement("div");

let cursorContainer = radioContainer();
let cursor = document.createElement("input");
let arrowContainer = radioContainer();
let arrow = document.createElement("input");

startContainer.appendChild(start);
startContainer.appendChild(radioStyle());
outputContainer.appendChild(output);
outputContainer.appendChild(radioStyle());
delayContainer.appendChild(delay);
delayContainer.appendChild(radioStyle());
decisionContainer.appendChild(decision);
decisionContainer.appendChild(radioStyle());

cursorContainer.appendChild(cursor);
cursorContainer.appendChild(radioStyle());
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
