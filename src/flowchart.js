class Flowol {
  resolveFlow(flowchart, mimic){

    function error(err, prefix){ 
      // To allow for easy changing of how errors are thrown, e.g implementation into UI
      throw Error((!prefix? "Flowol error - " : prefix + " ") + err);
    }

    let outputs = mimic.outputs;
    let inputs = mimic.inputs;
    let vars = mimic.vars;

    let subs = {};

    function checkFormat(value){
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean"){
        return true;
      } else {
        return false;
      }
    }

    function findById(o, id) {
      if( o.id === id ){
        return o;
      }
      let result, p; 
      for (p in o) {
        if(o.hasOwnProperty(p) && typeof o[p] === 'object') {
          result = findById(o[p], id);
          if(result){
            return result;
          }
        }
      }
      return result;
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
        } else {
          subs[start.on] = start.next;
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
                  error("Cannot set property '" + property + "' to illegal value type '" + (typeof value) + "'");
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
            
            //Decisions
            case "decision":
              let base;
              if (thread.test["input"]){
                base = inputs[thread.test["input"]];
              } else if (thread.test["var"]){
                base = vars[thread.test["var"]];
              } else if (thread.test["data"]) {
                base = thread.test["data"];
              } else {
                error("no base test provided in decision");
              }

              let comparison;
              if (thread.comparison["input"]){
                comparison = inputs[thread.comparison["input"]];
              } else if (thread.comparison["var"]){
                comparison = vars[thread.comparison["var"]];
              } else if (thread.comparison["data"]) {
                comparison = thread.comparison["data"];
              } else {
                error("no comparison test provided in decision");
              }
              
              let isCorrect;
              switch (thread.question){
                case "equal":
                  isCorrect = base === comparison;
                  break;
                case "less":
                  isCorrect = base < comparison
                  break;
                case "more":
                  isCorrect = base > comparison
                  break;
                case "lessorequal":
                  isCorrect = base <= comparison
                  break;     
                case "moreorequal":
                  isCorrect = base >= comparison
                  break;
                case "notequal":
                  isCorrect = base !== comparison
                  break;                                                
              }

              if (isCorrect){
                sendOff(thread["true"], 0);
              } else {
                sendOff(thread["false"], 0)
              }
              break;
            
            case "goto":
              let destination = findById(flowchart, thread.destination);
              
              if (destination){
                sendOff([destination], 0);
              } else {
                error("no item found with id '" + thread.destination.toString() + "'")
              }
              break;

            case "call":
              sendOff(subs[thread.target], 0);
              break;
            
            case "set":
              switch (thread.to.type){
                case "data":
                  vars[thread["var"]] = thread.to.val;
                  break;
                case "add":
                  vars[thread["var"]] += thread.to.val;
                  break;
                case "sub":
                  vars[thread["var"]] -= thread.to.val;
                  break;
                case "mul":
                  vars[thread["var"]] *= thread.to.val;
                  break;
                case "div":
                  vars[thread["var"]] /= thread.to.val;
                  break;
                case "mod":
                  vars[thread["var"]] % thread.to.val;
                  break;           
                case "flr":
                  vars[thread["var"]] = Math.floor(thread.to.val);
                  break;
                case "ceil":
                  vars[thread["var"]] = Math.ceil(thread.to.val);
                  break;
                case "rnd":
                  vars[thread["var"]] = Math.round(thread.to.val);
                  break;                                         
              }
          }
        }
      }, delay);
    }
  }
}

let flowol = new Flowol();
