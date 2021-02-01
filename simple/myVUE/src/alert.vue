<template>
  <div id="alert">
    <div class="alert_content">
      <div class="alert_title">{{customTitle}}</div>
      <div class="alert_body">{{customBody}}</div>
      <div class="alert_btn">
        <button v-if="comfirmBtn"
                @click="comfirmBtn">呼叫</button>
        <button v-if="cancelBtn"
                @click="cancelBtn">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
#alert {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 667;
}
#alert .alert_content {
  position: relative;
  margin: auto;
  width: 200px;
  height: 150px;
  background-color: white;
  border-radius: 5px;
}
#alert .alert_title {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
#alert .alert_body {
  text-align: center;
}
#alert .alert_btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 5px;
  padding: 5px;
}
</style>