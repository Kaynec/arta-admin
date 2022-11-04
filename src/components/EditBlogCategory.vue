<template>
  <overlay>
    <form
      @submit.prevent="submitMessage"
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
      py-3
    >
      <div class="flex flex-col w-11/12 mx-auto gap-1">
        <q-input type="text" color="teal" outlined v-model="model.name">
          <template v-slot:prepend>
            <span class="text-weight-bold text-primary text-sm pl-3"
              >عنوان</span
            >
          </template>
        </q-input>
        <q-file
          v-model="featured_image"
          color="teal z-30"
          outlined
          flex
          text-right
          items-center
          justify-center
          label-slot
        >
          <template v-slot:prepend>
            <span class="text-weight-bold text-primary text-sm pl-3"
              >تصویر</span
            >
          </template>

          <template v-slot:append>
            <q-avatar>
              <i class="i-bi:calendar-fill bg-primary text-1rem" />
            </q-avatar>
          </template>
        </q-file>
      </div>
      <!-- Buttons -->

      <div class="flex gap-2 p-3">
        <Cancel @click="$emit('return')"> حذف </Cancel>
        <Confirm> انتشار </Confirm>
      </div>

      <!--  -->
    </form>
  </overlay>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

interface MessageInterface {
  featured_image: string | File;
  name: string;
  id?: number | string;
}

const { data } = defineProps<{
  data: MessageInterface;
}>();

const featured_image = ref(null);

const emit = defineEmits(["return", "success"]);

const id = data?.id;

const model = ref<MessageInterface>({
  name: data?.name || "",
  featured_image: data?.featured_image || "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("لطفا عنوان بلاگ  را وارد کنید", required),
    },
    featured_image: {
      required: helpers.withMessage("لطفا تصویر بلاگ  را وارد کنید", required),
    },
  };
});

const vee = useVuelidate(rules, model as any);

const submitMessage = async () => {
  // Set The Picture To Inputs File so can't lose it
  model.value.featured_image = featured_image.value!
  //
  vee.value.$touch();

  const formData = new FormData();

  formData.append("name", model.value.name);
  formData.append("featured_image", featured_image.value!);

  if (vee.value.$invalid) {
    alertify({
      type: "error",
      text: vee.value.$errors[0].$message,
    });
    return;
  }
  const METHOD = id ? "PUT" : "POST";
  const URL = id ? `blogcategory/${id}` : "blogcategory";

  const { error } = $(
    await useAdminFetch(
      URL,
      {
        method: METHOD,
        body: formData,
        headers: {
          "content-type": "application/json",
        },
      },
      {}
    ).json()
  );

  if (error) {
    alertify({
      type: "error",
      text: error,
    });
    emit("return");

    return;
  }

  emit("success");
};
</script>
