let test = [{
  "type": "start",
  "on": "mySub",
  "next": [{
    "type": "decision",
    "id": "namehere!",
    "test": {
      "input": "dial"
    },
    "question": "less",
    "comparison": {
      "data": 5
    },
    "true": [{
      "type": "output",
      "property": ["bulb"],
      "value": [false],
      "next": [{
        "type": "end"
      }]
    }],
    "false": [{
      "type": "output",
      "property": ["light"],
      "value": [true],
      "next": [{
        "type": "end"
      }]
    }]
  }]
}, {
  "type": "start",
  "on": "start",
  "next": [{
    "type": "call",
    "target": "mySub",
    "next": [{
      "type": "set",
      "var": "dial",
      "to": {
        "type": "data",
        "val": 18
      },
      "next": [{
        "type": "end"
      }]
    }]
  }]
}];

let mimicTest = {
  inputs: {
    dial: 5
  },
  vars: {
    dial: 3,
    b: 10
  },
  outputs: {
    light: false,
    bulb: true
  }
};