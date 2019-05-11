# Flowol
A clone of Flowol to allow for custom features, such as mimic creation, without the cost.

*It doesn't look like much code now, but the functionality itself is **quite** complicated.*

## Usage instructions

Run the file by creating a boilerplate HTML file, importing `src/flowchart.js` in the head, and including the following code in the body:

```html
<script type="text/javascript">
  flowol.resolveFlow(/*JSON*/);
</script>
```

### Temporary instruction - JSON format
**Because there is no click-and-drag editor *(yet)*, you'll need to write all flowcharts in JSON.**
