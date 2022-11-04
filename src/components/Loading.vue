<template>
  <div fixed z-99999 h-screen w-screen items-start pt="20%" pl="30%" flex>
    <div
      text="gray-100"
      bg="#6969AF"
      rounded-lg
      font-600
      text-xl
      min-w-55
      min-h-50
      flex
      whitespace-nowrap
      items-center
      flex-col
      mx-auto
    >
      <div mb-10>
        <slot></slot>
      </div>
      <div class="loader-parent">
        <div class="loading1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-parent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  z-index: 300;

  overflow: hidden;
  border-radius: 1rem;
}
.loading-content {
  position: absolute;
  z-index: 30;
  top: 50%;
  left: 50%;
}
.loading1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid;
  border-color: #333 rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
  animation: spin 0.6s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
</style>
