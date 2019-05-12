# Flowol
A clone of Flowol to allow for custom features, such as mimic creation, without the cost.

*(demo available at https://repl.it/@GezaK/Flowol)*

## Usage instructions

Run the file by creating a boilerplate HTML file, importing `src/flowchart.js` in the head, and including the following code in the body:

```html
<script type="text/javascript">
  flowol.resolveFlow(/*JSON*/, /*Mimic info*/);
</script>
```

### Mimic definition

For example,

```json
{
  "vars": {
    "totalEnergy": 112
  },
  "inputs": {
    "sun": 5,
    "lightswitch": true
  },
  "outputs": {
    "light": false,
    "heating": 3
  }
}
```

Each property inside **outputs** is the name of an output, and the values being the respective defaults. The defaults can be either of type `string`, `int`, `float` or `boolean`.

Each property inside **inputs** is the name of an input. The values are the default values of the input, of type `string`, `int`, `float` or `boolean`.

Each property inside **vars** is the name of a global variable, with the value representing the default state. The default state can be of type `string`, `int`, `float` or `boolean`.

### Temporary instruction - JSON format
**Because there is no click-and-drag editor *(yet)*, you'll need to write all flowcharts in JSON.**

All JSON for the flowchart should be nested inside an item in a base array. This will contain all of our initial 'threads', and can be built upon. The format of a start thread is as follows:

```
[{
  "type": "start",
  "on": "start" // When subroutines are introduced, they can be referenced here.
  "next": [
    ...
  ]
}]
```

with all subsequent actions contained in `next`.

To end a thread, simply use:

```
{
  "type": "end"
}
```

Other possible actions/elements include:

**Delays:**

```
{
  "type": "delay",
  "duration": 5000, // Milliseconds, natural
  "next": [
    ...
  ]
}
```

**Outputs:**

```
{
  "type": "output",
  "property": ["light", "heat"], // An array of the names of outputs
  "value": [true, 6], // An array of corresponding values
  "next": [
    ...
  ]
}
```

The names used in the `property` property refer to the names of outputs as defined in the [mimic setup](https://github.com/gezakerecsenyi/flowol/#mimic-definition). The items in the `value` property refer to the value to set the respective (at the same index) `property` to. For example, in the above demo, the "light" output would be set to `true`, while the "heat" output would be set to `6`. You can set as many or as few of the outputs as you wish.

**Decisions:**

```
{
  "type": "decision",
  "test": {
    "input": "sun"
  },
  "question": "equal",
  "comparison": {
    "data": 3
  },
  "true": [
    ... // What should happen if the statement is true?
  ],
  "false": [
    ... // What should happen if the statement is false?
  ]
}
```

Possible properties for `test` and/or `comparison` are:

* `input:`, which accepts the name of an input as a value;
* `var:`, which accepts the name of a global variable as a value;
* `data:`, which accepts any string, integer, float or boolean as a value

Possible values for `question` are:

* `equal` - `===`
* `less` - `<`
* `more` - `>`
* `lessorequal` - `<=`
* `moreorequal` - `>=`
* `notequal` - `!==`
