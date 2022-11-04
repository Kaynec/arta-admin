<template>
  <overlay>
    <div
      text="gray-100"
      bg="white"
      rounded-xl
      shadow-2xl
      font-600
      text-xl
      min-w-120
      min-h-50
      flex
      whitespace-nowrap
      items-center
      flex-col
      mx-auto
      ref="myElement"
    >
      <!--  -->

      <div class="flex gap-2 p-3">
        <Cancel> حذف </Cancel>
        <Confirm> انتشار </Confirm>
      </div>

      <!--  -->
    </div>
  </overlay>
</template>

<script setup lang="ts">
const myElement = ref();

const emit = defineEmits(["cancel"]);

onClickOutside(myElement, () => {
  emit("cancel");
});
</script>
