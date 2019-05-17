let selected, cursor, shapes = [], modals = [], ghost;

function closeModals(){
  while (modals[0]){
    modals[0].parentNode.removeChild(modals[0]);
    modals.splice(0, 1);
  }

  shapes.forEach(shape=>{
    shape.element.classList.remove("editing");
  });
}

var AABB = {
  collide: function (el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
  },

  inside: function (el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return (
      ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
      ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
      ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
      ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
    );
  }
};

Flowol.prototype.buildElem = function(){
  if (!!document.getElementById("ghost")){
    console.log(ghost)
    ghost.parentNode.removeChild(ghost);
  }

  ghost = document.createElement("div");
  ghost.setAttribute("id", "ghost")
  if (document.forms["elements"].elements["element"][0].checked){
    selected = 0;
    ghost.setAttribute("class", "ghost start-ghost");
  } else if (document.forms["elements"].elements["element"][1].checked){
    selected = 1;
    ghost.setAttribute("class", "ghost output-ghost");
  } else if (document.forms["elements"].elements["element"][2].checked){
    selected = 2;
    ghost.setAttribute("class", "ghost delay-ghost");
  } else if (document.forms["elements"].elements["element"][3].checked){
    selected = 3;
    ghost.setAttribute("class", "ghost decision-ghost");
  }

  closeModals();

  if (cursor === 0){
    workspace.appendChild(ghost);
  }
}

function deCheck( groupName ) {
  var radios = document.getElementsByName( groupName );
  for( i = 0; i < radios.length; i++ ) {
    if( radios[i].checked ) {
      radios[i].checked = false;
    }
  }
  return null;
}

Flowol.prototype.switchCursor = function(){
  if (document.forms["cursors"].elements["cursor"][0].checked){
    cursor = 0;
    if (selected > -1){
      Flowol.prototype.buildElem();
    }
  } else {
    cursor = 1;
  }
}

function randomId(){
  const chars = "qwertyuiopasdfghjkllzxcvbnm[];'#,./<>?:@~{}+_)(*&^%$£\"'1234567890!";

  let str = "";
  for (i=0;i<10;i++){
    str += chars[Math.floor(Math.random()*chars.length)];
  }

  return str;
}

function mousePos(e, what){
  var mX = e.pageX;
  var mY = e.pageY;
  var from = {x:mX, y:mY};
  var $n=$(what);
  var off = $n.offset(),
    nx1 = off.left,
    ny1 = off.top,
    nx2 = nx1 + $n.outerWidth(),
    ny2 = ny1 + $n.outerHeight(),
    maxX1 = Math.max(mX, nx1),
    minX2 = Math.min(mX, nx2),
    maxY1 = Math.max(mY, ny1),
    minY2 = Math.min(mY, ny2),
    intersectX = minX2 >= maxX1,
    intersectY = minY2 >= maxY1,
    to = {
        x: intersectX ? mX : nx2 < mX ? nx2 : nx1,
        y: intersectY ? mY : ny2 < mY ? ny2 : ny1
    };
    var distX = Math.abs(to.x - from.x),
    distY = Math.abs(to.y - from.y);
  
  return {x: distX, y: distY};
}

Flowol.prototype.ghostHandler = function(e){
  if (ghost && cursor !== undefined){
    ghost.style.left = mousePos(e, "#calculator").x + "px";
    ghost.style.top = mousePos(e, "#calculator").y + "px";

    let good = true;
    shapes.forEach(shape=>{
      if (AABB.collide(ghost, shape.element)) good = false;
    });
    if (AABB.collide(ghost, document.getElementById("toolbar"))) good = false;

    if (good){
      ghost.classList.remove("bad");
    } else {
      ghost.classList.add("bad");
    }
  }
}

Flowol.prototype.stopBad = function(){
  if (ghost) ghost.classList.remove("stop");
}

Flowol.prototype.clickHandler = function(e, mimic){
  let workspace = document.getElementById("workspace");

  closeModals()

  function setShape(base, key, value){
    shapes.forEach(shape=>{
      if (shape.element === base) shape[key] = value;
    });
  }

  let good = true;
  shapes.forEach(shape=>{
    if (AABB.collide(ghost, shape.element)) good = false;
  });
  if (AABB.collide(ghost, document.getElementById("toolbar"))) good = false;
  
  if (cursor === 0 && (selected || selected === 0)){
    if (good){
      ghost.classList.remove("stop");
      let thisShape = document.createElement("div");
      switch (selected){
        case 0:
          thisShape.setAttribute("class", "shape start-shape");
          setShape(thisShape, "type", "start");
          thisShape.onclick = function(){
            if (!document.getElementById("ghost")){
              this.classList.add("editing");
              let modal = document.createElement("dialog");
              modal.setAttribute("open", "open");
              let title = document.createElement("h3");
              title.innerText = "Edit Start symbol";
              let cancel = document.createElement("button");
              cancel.innerText = "Cancel";
              cancel.setAttribute("class", "cancel");
              cancel.onclick = function(){
                closeModals();
              }
              let start = document.createElement("button");
              start.innerText = "Start";
              start.setAttribute("class", "option-btn");
              start.onclick = function(){
                thisShape.innerHTML = "Start";
                setShape(thisShape, "type", "start");
                setShape(thisShape, "on", "start");
                closeModals();
              }
              let stop = document.createElement("button");
              stop.innerText = "Stop";
              stop.setAttribute("class", "option-btn");
              stop.onclick = function(){
                thisShape.innerHTML = "Stop";
                setShape(thisShape, "type", "end");
                closeModals();
              }
              let sub = document.createElement("button");
              sub.innerText = "Sub";
              sub.setAttribute("class", "option-btn");
              sub.setAttribute("id", "sub-btn");           
              sub.onclick = function(){
                document.getElementById("sub-input").style.display = "block";
                document.getElementById("sub-ok").style.display = "block";
              }
              let subName = document.createElement("input");
              subName.type = "text";
              subName.placeholder = "Subroutine name...";
              subName.setAttribute("class", "input");
              subName.setAttribute("id", "sub-input");
              subName.style.display = "none";
              let okBtn = document.createElement("button");
              okBtn.innerText = "OK";
              okBtn.setAttribute("class", "option-btn");
              okBtn.setAttribute("id", "sub-ok");
              okBtn.style.display = "none";
              okBtn.setAttribute("disabled", "true");  
              okBtn.onclick = function(){
                thisShape.innerHTML = "Sub " + subName.value;
                setShape(thisShape, "type", "start");
                setShape(thisShape, "on", subName.value);
                closeModals();
              }
              subName.onchange = function(){
                if (document.getElementById("sub-input").value != "" && document.getElementById("sub-input").value !== "start"){
                  document.getElementById("sub-ok").disabled = false;
                } else {
                  document.getElementById("sub-ok").disabled = true;
                }
              }

              modal.appendChild(title);
              modal.appendChild(cancel);
              modal.appendChild(start);
              modal.appendChild(stop);
              modal.appendChild(sub);
              modal.appendChild(subName);
              modal.appendChild(okBtn);

              modals.push(modal);

              document.body.appendChild(modal);
            }
          }
          break;
        case 1:
          thisShape.setAttribute("class", "shape output-shape");
          thisShape.onclick = function(){
            if (!document.getElementById("ghost")){
              this.classList.add("editing");
              setShape(thisShape, "type", "output");

              let modal = document.createElement("dialog");

              let what = [];
              let changes = [];

              modal.setAttribute("open", "open");
              let title = document.createElement("h3");
              title.innerText = "Edit Delay";

              let cancel = document.createElement("button");
              cancel.innerText = "Cancel";
              cancel.setAttribute("class", "cancel");
              cancel.onclick = function(){
                closeModals();
              }

              let okBtn = document.createElement("button");
              okBtn.innerText = "OK";
              okBtn.setAttribute("class", "open-btn");
              okBtn.onclick = function(){
                setShape(thisShape, "property", what);
                setShape(thisShape, "value", changes);
                console.log(shapes);
                closeModals();
              }
            
              let table = document.createElement("table");
              Object.keys(mimic.outputs).forEach(output => {
                let row = document.createElement("tr");

                let name = document.createElement("td");
                name.innerText = output;

                let choice = document.createElement("td");
                let value = document.createElement("td");
                
                let boolean = document.createElement("input");
                boolean.type = "radio";

                boolean.setAttribute("id", output + "boolean");
                let bLabel = document.createElement("label");
                bLabel.setAttribute("for", output + "boolean");
                bLabel.innerText = "Boolean";

                boolean.name = output + "type";
                boolean.onclick = function(){
                  value.innerHTML = "";
                  
                  let select = document.createElement("select");

                  let yes = document.createElement("option");
                  yes.innerText = "On";
                  yes.onclick = function(){
                    if (what.indexOf(output) > -1){
                      changes[what.indexOf(output)] = true;
                    } else {
                      what.push(output);
                      changes.push(true);
                    }
                  }

                  let no = document.createElement("option");
                  no.innerText = "Off";
                  no.onclick = function(){
                    if (what.indexOf(output) > -1){
                      changes[what.indexOf(output)] = false;
                    } else {
                      what.push(output);
                      changes.push(false);
                    }
                  }

                  select.appendChild(yes);
                  select.appendChild(no);

                  value.appendChild(select);
                }

                let number = document.createElement("input");
                number.type = "radio";
                
                boolean.setAttribute("id", output + "num");
                let nLabel = document.createElement("label");
                nLabel.setAttribute("for", output + "num");
                nLabel.innerText = "Number";

                number.name = output + "type";
                number.onclick = function(){
                  value.innerHTML = "";

                  let inp = document.createElement("input");
                  inp.type = "number";
                  inp.onchange = function(){
                    if (inp.valueAsNumber !== NaN){
                      if (what.indexOf(output) > -1){
                        changes[what.indexOf(output)] = inp.valueAsNumber;
                      } else {
                        what.push(output);
                        changes.push(inp.valueAsNumber);
                      }
                    } else {
                      if (what.indexOf(output) > -1){
                        changes.splice(what.indexOf(output), 1);
                        what.splice(what.indexOf(output), 1);
                      }
                    }
                  }

                  value.appendChild(inp);
                }

                choice.appendChild(boolean);
                choice.appendChild(bLabel);
                choice.appendChild(number);
                choice.appendChild(nLabel);

                let cancelRow = document.createElement("td");

                let cancelButton = document.createElement("span");
                cancelButton.setAttribute("class", "inline-cancel");
                cancelButton.innerHTML = '<i class="far fa-window-close"></i>';
                cancelButton.onclick = function(){
                  boolean.checked = false;
                  number.checked = false;
                  value.innerHTML = "";
                  if (what.indexOf(output) > -1){
                    changes.splice(what.indexOf(output), 1);
                    what.splice(what.indexOf(output), 1);
                  }
                }
                cancelRow.appendChild(cancelButton);

                row.appendChild(name);
                row.appendChild(choice);
                row.appendChild(value);
                row.appendChild(cancelRow);

                table.appendChild(row);
              });

              modal.appendChild(cancel);
              modal.appendChild(okBtn);
              modal.appendChild(table);

              modals.push(modal);

              document.body.appendChild(modal);
            }
          }
          break;
        case 2:
          thisShape.setAttribute("class", "shape delay-shape");
          thisShape.onclick = function(){
            if (!document.getElementById("ghost")){
              this.classList.add("editing");

              let modal = document.createElement("dialog");

              modal.setAttribute("open", "open");
              let title = document.createElement("h3");
              title.innerText = "Edit Delay";
              let cancel = document.createElement("button");
              cancel.innerText = "Cancel";
              cancel.setAttribute("class", "cancel");
              cancel.onclick = function(){
                closeModals();
              }

              let duration = document.createElement("input");
              duration.setAttribute("class", "input")
              duration.type = "number";
              duration.onchange = function(){
                if (duration.valueAsNumber > 0){
                  okBtn.disabled = false;
                } else {
                  okBtn.disabled = true;
                }
              }

              let okBtn = document.createElement("button");
              okBtn.innerText = "OK";
              okBtn.disabled = true;
              okBtn.onclick = function(){
                thisShape.innerHTML = "Delay " + duration.value + "s";
                setShape(thisShape, "type", "delay");
                setShape(thisShape, "duration", okBtn.valueAsNumber * 1000);
                closeModals();
              }

              modal.appendChild(title);
              modal.appendChild(duration);
              modal.appendChild(okBtn);

              modals.push(modal);

              document.body.appendChild(modal);
            }  
          }
          break;
        case 3:
          thisShape.setAttribute("class", "shape decision-shape");
          break;
      }

      thisShape.style.left = mousePos(e, "#calculator").x + "px";
      thisShape.style.top = mousePos(e, "#calculator").y + "px";
      workspace.appendChild(thisShape);

      shapes.push({
        blockType: selected,
        top: mousePos(e, "#calculator").y,
        left: mousePos(e, "#calculator").x,
        element: thisShape,
        id: randomId()
      });

      selected = undefined;
      ghost.parentNode.removeChild(ghost);
      deCheck("element");

      thisShape.click();
    } else {
      ghost.classList.add("stop");
    }
  }
}
