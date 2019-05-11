class Flowol {
  resolveFlow(flowchart){
    let outputs = {
      light: false,
      bulb: true
    }

    let threads = [];

    flowchart.forEach(start=>{
      if (start.type === "start"){
        if (start.on === "start"){
          sendOff(start.next, 0);
        }
      } else if (start.type === "sub"){
        //Do stuff
      } else {
        error("item found outside of 'start' statement");
      }
    });

    function error(err){
      throw Error(err);
    }

    function sendOff(what, when){
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
