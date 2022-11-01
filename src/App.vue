<template>
  <notifications position="top center" />
  <RouterView />
</template>
<style scoped lang="scss">
.vue-notification {
  // styling
  margin: 6rem 5px 5px;
  padding: 1.5rem;
  font-size: 12px;
  color: #fff;
  border-radius: 0.5em;
  z-index: 999999;

  background: #44a4fc;
  border: none;

  &.success {
    background: #68cd86;
    color: #fff;
    z-index: 9999999999;
  }

  &.warn {
    background: #ffb648;
    color: #fff;
    z-index: 9999999999;
  }

  &.error {
    background: #e54d42;
    z-index: 9999999999;
    color: #fff;
  }
}
</style>
