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
        <q-input type="textarea" color="teal" outlined v-model="model.text">
          <template v-slot:prepend>
            <span class="text-weight-bold text-primary text-sm pl-3">پیام</span>
          </template>
        </q-input>
        <q-input
          type="text"
          data-jdp
          color="teal z-30"
          outlined
          v-model="model.date"
          flex
          text-right
          items-center
          justify-center
          label-slot
        >
          <template v-slot:prepend>
            <span class="text-weight-bold text-primary text-sm pl-3"
              >تاریخ</span
            >
          </template>

          <template v-slot:append>
            <q-avatar>
              <i class="i-bi:calendar-fill bg-primary text-1rem" />
            </q-avatar>
          </template>
        </q-input>
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

import "@/assets/datepicker/jalalidatepicker.css";
import "@/assets/datepicker/jalalidatepicker.js";
import { emitChangeFn } from "element-plus";
(window as any).jalaliDatepicker.startWatch();

interface MessageInterface {
  text: string;
  date: string;
  id?: number | string;
}

const { data } = defineProps<{
  data: MessageInterface;
}>();

const emit = defineEmits(["return", "success"]);

const id = data?.id;

const model = ref<MessageInterface>({
  text: data?.text || "",
  date: data?.date || "",
});

const rules = computed(() => {
  return {
    text: {
      required: helpers.withMessage("لطفا پیام خود را وارد کنید", required),
    },
    date: {
      required: helpers.withMessage("لطفا  تاریخ پیام را وارد کنید", required),
    },
  };
});

const vee = useVuelidate(rules, model as any);

const submitMessage = async () => {
  vee.value.$touch();

  if (vee.value.$invalid) {
    alertify({
      type: "error",
      text: vee.value.$errors[0].$message,
    });
    return;
  }
  const METHOD = id ? "PUT" : "POST";
  const URL = id ? `messages/${id}` : "messages";

  const { error } = $(
    await useAdminFetch(
      URL,
      {
        method: METHOD,
        body: JSON.stringify(model.value),
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
