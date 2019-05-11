class Flowol {
  resolveFlow(flowchart, mimic){

    function error(err, prefix){ 
      // To allow for easy changing of how errors are thrown, e.g implementation into UI
      throw Error((!prefix? "Flowol error - " : prefix + " ") + err);
    }

    let outputs = mimic.outputs;

    function checkFormat(value){
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean"){
        return true;
      } else {
        return false;
      }
    }

    Object.keys(outputs).forEach(property=>{
      if (!checkFormat(outputs[property])){
        error("Illegal value type '" + typeof outputs[property] + "' in mimic definition of output '" + property + "'");
      }
    });

    flowchart.forEach(start=>{
      if (start.type === "start"){
        if (start.on === "start"){
          sendOff(start.next, 0);
        } else if (start.type === "sub"){
          //Do stuff
        }
      } else {
        error("item found outside of 'start' statement");
      }
    });

    function sendOff(what, when){ // Controls async processing of multiple threads
      what.forEach(thread=>{
        readThread(thread, when);
      });
    }

    function readThread(thread, delay){
      window.setTimeout(function(){
        console.log(outputs);
        if (thread.type==="end"){
          if (thread.next){
            error("cannot execute statement after 'end' statement!");
          }
        } else {
          switch(thread.type){

            //Be able to make outputs! Support for multiple outputs in one go
            case "output":
              thread.property.forEach((property, i)=>{
                let value = thread.value[i];

                if (!checkFormat(value)){
                  error("Cannot set property '" + property + "' to illegal value type '" + typeof value + "'");
                }

                if (outputs[property] !== undefined){
                  outputs[property] = value;
                } else {
                  error("cannot set value of undefined property '" + property + "'");
                }
              });

              sendOff(thread.next, 0);
              break;

            //Delays
            case "delay":
              sendOff(thread.next, thread.duration);
              break;
          }
        }
      }, delay);
    }
  }
}

let flowol = new Flowol();
