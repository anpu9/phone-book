<template>
  <div id="header"
       :style="{'position':customFixed?'fixed':'static'}">
    <slot name="left"></slot>
    {{customTitle}}
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  name: 'my-header',
  props: {
    customTitle: {
      type: String,
      default: '标题',
    },
    customFixed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style>
#header {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #666;
  color: white;
  text-align: center;
  line-height: 40px;
  z-index: 666;
}
#header > button {
  height: 100%;
  padding: 5px;
  position: absolute;
}
#header > button:nth-of-type(1) {
  left: 0;
}
#header > button:nth-of-type(2) {
  right: 0;
}
</style>