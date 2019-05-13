let selected, cursor;

Flowol.prototype.buildElem = function(){
  if (document.forms["elements"].elements["element"][0].checked){
    selected = 0;
  } else if (document.forms["elements"].elements["element"][1].checked){
    selected = 1;
  } else if (document.forms["elements"].elements["element"][2].checked){
    selected = 2;
  } else if (document.forms["elements"].elements["element"][3].checked){
    selected = 3;
  }
}

Flowol.prototype.switchCursor = function(){
  if (document.forms["cursors"].elements["cursor"][0].checked){
    cursor = 0;
  } else {
    cursor = 1;
  }
}

Flowol.prototype.clickHandler = function(e){
  let workspace = document.getElementById("workspace");
  console.log("Hi!")
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
    
    var mX = e.pageX;
    var mY = e.pageY;
    var from = {x:mX, y:mY};
    var $n=$('#calculator');
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

    thisShape.style.left = distX + "px";
    thisShape.style.top = distY + "px";
    workspace.appendChild(thisShape);
  }
}
