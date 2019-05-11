# Flowol
A clone of Flowol to allow for custom features, such as mimic creation, without the cost.

## Usage instructions

Run the file by creating a boilerplate HTML file, importing `src/flowchart.js` in the head, and including the following code in the body:

```html
<script type="text/javascript">
  flowol.resolveFlow(/*JSON*/, /*Mimic info*/);
</script>
```

### Mimic definition

For example,

```
{
  outputs: {
    light: false,
    heating: 3
  }
}
```

with each property inside `outputs` being the name of an output, and the values being the respective defaults. The defaults can be either of type `string`, `int`, `float` or `boolean`.

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
