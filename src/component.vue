<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "Loading..."
    }
  }
};
</script>

<template>
  <div class="body-loading" v-if="loading">
    <div class="loading">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <div class="loading-text">{{text}}</div>
  </div>
</template>

<style scoped>
.body-loading {
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #353b48;
  -khtml-opacity: 0.8;
  -moz-opacity: 0.8;
  -ms-filter: ”alpha(opacity=80) ”;
  filter: alpha(opacity=80);
  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0.8);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in;
}

.loading-text {
  margin-top: 2rem;
  font-family: "Courier New", Courier, monospace;
  color: #fff;
}

.loading {
  display: flex;
  transition: opacity 0.3s ease-in;
}

.circle {
  background-color: #fff;
  border-radius: 50%;
  margin: 2px;
  height: 10px;
  width: 10px;
  animation: jump 0.7s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.2s;
}

.circle:nth-of-type(3) {
  animation-delay: 0.4s;
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
