<template>
  <Loading v-if="isSendingARequest" />
  <!-- <Error v-else-if="error" /> -->
  <main v-else>
    <EditBlogCategory
      v-if="showEditMessage"
      @return="showEditMessage = !showEditMessage"
      @success="onSuccess"
      :data="currentMessage"
    />
    <div flex gap-5 justify-center flex-row-reverse max-w="11/12" mx-auto>
      <div class="flex items-center justify-center">
        <button
          min-w-35
          bg-primary
          text-white
          rounded-xl
          mx-1
          p-3
          @click="(showEditMessage = !showEditMessage), (currentMessage = {})"
        >
          افزودن پیام
        </button>
        <button
          @click="handleDelete"
          min-w-35
          bg-primary
          text-white
          rounded-xl
          mx-1
          p-3
        >
          حذف
        </button>
      </div>

      <div class="min-w-120 grow rounded-xl bg-#F3F4F9 relative">
        <input
          type="text"
          bg-transparent
          placeholder="جستجو...."
          text-right
          w-full
          h-full
          pr-2
          text-primary
          placeholder:text-primary
          rounded-xl
          v-model="search"
        />
        <div
          bg-primary
          px-3
          text-white
          rounded-tl-xl
          rounded-bl-xl
          h-full
          absolute
          left-0
          top-0
          items-center
          flex
        >
          <div class="i-akar-icons:search w-8 h-8" />
        </div>
      </div>
      <button bg="#F3F4F9" w-35 rounded-lg text-primary @click="selectAll">
        انتخاب همه
      </button>
    </div>
    <!-- Table -->
    <section bg="#F3F4F9" w="11/12" mx-auto rounded-xl my-2>
      <!-- Heads -->
      <div flex p-5 justify-between items-center mx-auto w="full">
        <span>
          <el-checkbox @change="change" size="large" />

          عنوان</span
        >
        <span>تصویر</span>
        <span>ویرایش</span>
      </div>
      <!--  -->
      <div flex flex-col mx-auto w="full">
        <div
          grid
          grid-cols-3
          justify-between
          items-center
          py-3
          gap-2
          v-for="item in filteredData"
        >
          <div flex items-center gap-3 pr-4 w-75>
            <el-checkbox v-model="item.selected" size="large" />
          </div>
          <img
            :src="item.featured_image"
            alt="featured_image"
            v-if="item.featured_image"
          />
          <span justify-end pl-8 flex>
            <Edit @click="(currentMessage = item), (showEditMessage = true)" />
          </span>
        </div>
      </div>
    </section>
    <!-- Navigation  -->
    <div flex items-center justify-center gap-3>
      <div
        class="i-fontisto:angle-right"
        bg="orange"
        rounded-lg
        width="24"
        text-primary
        p="1.5"
        @click="moveRight"
      />

      <span
        bg="orange"
        rounded-lg
        width="24"
        text-primary
        px-3
        py-1
        font-600
        v-if="currentIndex + 1 <= howManySections"
      >
        {{ currentIndex + 1 }}
      </span>
      <span text-white font-600 bg-primary px-3 py-1 rounded-lg>
        {{ currentIndex }}
      </span>
      <span
        v-if="currentIndex - 1 > 0"
        bg="orange"
        rounded-lg
        width="24"
        text-primary
        px-3
        py-1
        font-600
      >
        {{ currentIndex - 1 }}
      </span>

      <div
        class="i-fontisto:angle-left"
        bg="orange"
        rounded-lg
        width="24"
        text-primary
        p="1.5"
        @click="moveLeft"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFuse } from "@vueuse/integrations/useFuse";

let isSendingARequest = $ref(true);

const showEditMessage = ref(false);

const currentMessage = ref<ItemInterface | {}>({});

interface ItemInterface {
  id: string | number;
  selected: boolean;
  text: string;
  date: string;
}

const handleDelete = () => {
  isSendingARequest = true;
  filteredData.value.forEach((el) => {
    if (el.selected) {
      useAdminFetch(`blogcategory/${el.id}/`).delete();
    }
  });

  fetchData();

  isSendingARequest = false;
};

const data = ref<ItemInterface[]>([]);

// Fuse Js Results Which Gets Updated After Initial Api Call
const results = ref<any[]>([]);

const fetchData = async () => {
  const { data: blogcategory } = await useAdminFetch("blogcategory").json();

  data.value = blogcategory.value.map((el: ItemInterface) => ({
    ...el,
    selected: false,
  }));
  isSendingARequest = false;
  results.value = useFuse(search, data, options).results.value;
};

onBeforeMount(async () => {
  await fetchData();
});

let allActive = $ref(false);

function change() {
  allActive = !allActive;
  data.value.forEach((item) => {
    if (allActive) item.selected = true;
    else item.selected = false;
  });
}

const onSuccess = () => {
  fetchData();
  showEditMessage.value = !showEditMessage.value;
};

const options = computed(() => ({
  fuseOptions: {
    keys: ["text", "date"],
  },
  matchAllWhenSearchEmpty: true,
}));

let search = $ref("");

watch(
  () => search,
  () => {
    results.value = useFuse(search, data, options).results.value;
  }
);

const selectAll = () => {
  data.value.forEach((el) => (el.selected = true));
};

let currentIndex = ref(1);

let howManySections = computed(() => {
  let number = 0;
  for (let i = 0; i < data.value.length; i += 8) {
    number++;
  }
  return number;
});

let filteredData = computed(() => {
  const CALC = (currentIndex.value - 1) * 8;

  return results.value
    .map((el) => el.item)
    .slice(CALC, CALC + 8) as unknown as {
    name: string;
    selected: boolean;
    id: string;
  }[];
});

const moveLeft = () => {
  if (currentIndex.value - 1 > 0) currentIndex.value -= 1;
};
const moveRight = () => {
  if (currentIndex.value + 1 <= howManySections.value) currentIndex.value += 1;
};
</script>
<route lang="yaml">
meta:
  auth: true
  layout: admin
</route>
