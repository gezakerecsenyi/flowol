Flowol.prototype.populate = function(flowolDiv){
  let div = flowolDiv;

  let toolbar = document.createElement("div");
  toolbar.setAttribute("class", "toolbar");
  toolbar.setAttribute("id", "toolbar");
  let workspace = document.createElement("div");
  workspace.setAttribute("class", "workspace");
  workspace.setAttribute("id", "workspace");

  let elements = document.createElement("form");
  elements.setAttribute("id", "elements");

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

  let cursors = document.createElement("form");
  cursors.setAttribute("id", "cursors");

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

  start.value = "start";
  output.value = "output";
  delay.value = "delay";
  decision.value = "decision";

  cursor.value = "cursor";
  arrow.value = "arrow";

  start.name = "element";
  output.name = "element";
  delay.name = "element";
  decision.name = "element";

  cursor.name = "cursor";
  arrow.name = "cursor";

  elements.name = "elements";
  cursors.name = "cursors";

  let radios = document.forms["elements"].elements["element"];
  for(i=0;i<radios.length;i++) {
    radios[i].onclick = this.buildElem;
  }

  radios = document.forms["cursors"].elements["cursor"];
  for(i=0;i<radios.length;i++) {
    radios[i].onclick = this.switchCursor;
  }

  let calculator = document.createElement("div");
  calculator.setAttribute("class", "calculator");
  calculator.setAttribute("id", "calculator");
  div.appendChild(calculator);

  workspace.onmousedown = this.clickHandler;
  workspace.onmouseup = this.stopBad;

  div.onmousemove = this.ghostHandler;

  toolbar.style.width = "140px";
}
