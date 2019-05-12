Flowol.prototype.buildElem = function(){
  let selected;
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
  let selected;
  if (document.forms["cursors"].elements["cursor"][0].checked){
    selected = 0;
  } else {
    selected = 1;
  }
}
