let selected, cursor, shapes = [], ghost;

Flowol.prototype.buildElem = function(){
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

  if (cursor === 0){
    workspace.appendChild(ghost);
  }
}

function deCheck(groupName) {
  var radios = document.getElementsByName(groupName);
  for(i=0; i<radios.length; i++) {
    if (radios[i].checked) {
      radios[i].checked = false;
    }
  }
  return null;
}

Flowol.prototype.switchCursor = function(){
  if (document.forms["cursors"].elements["cursor"][0].checked){
    cursor = 0;
    if (selected > -1){
      this.buildElem();
    }
  } else {
    cursor = 1;
  }
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
  }
}

Flowol.prototype.clickHandler = function(e){
  let workspace = document.getElementById("workspace");
  if (cursor === 0 && (selected || selected === 0)){
    let thisShape = document.createElement("div");
    switch (selected){
      case 0:
        thisShape.setAttribute("class", "shape start-shape");
        break;
      case 1:
        thisShape.setAttribute("class", "shape output-shape");
        break;
      case 2:
        thisShape.setAttribute("class", "shape delay-shape");
        break;
      case 3:
        thisShape.setAttribute("class", "shape decision-shape");
        break;
    }

    thisShape.style.left = mousePos(e, "#calculator").x + "px";
    thisShape.style.top = mousePos(e, "#calculator").y + "px";
    workspace.appendChild(thisShape);

    shapes.push({
      type: selected,
      top: mousePos(e, "#calculator").y,
      left: mousePos(e, "#calculator").x,
      element: thisShape
    });

    selected = undefined;
    ghost.parentNode.removeChild(ghost);
    deCheck("element")
  }
}
