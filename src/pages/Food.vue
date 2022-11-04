<template>
  <FoodEdit
    v-if="showEditFood"
    :data="currentData"
    @cancel="showEditFood = !showEditFood"
  />
  <main>
    <div flex gap-5 justify-center flex-row-reverse max-w="11/12" mx-auto>
      <div class="flex items-center justify-center">
        <button
          min-w-35
          bg-primary
          text-white
          rounded-xl
          mx-1
          p-3
          @click="showEditFood = !showEditFood"
        >
          افزودن غذا
        </button>
        <button min-w-35 bg-primary text-white rounded-xl mx-1 p-3>حذف</button>
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
        <span>واحد</span>
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
            <span>
              {{ item.name }}
            </span>
          </div>
          <span flex justify-center>
            {{ item.modules[0]?.name }}
          </span>
          <span justify-end pl-8 flex>
            <Edit @click="handleDelete(item)" />
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

interface ItemInterface {
  id: string | number;
  selected: boolean;
  name: string;
  modules: any[];
}

let showEditFood = $ref(false);
let currentData = $ref({});

const handleDelete = (item: ItemInterface) => {};

const data = ref<ItemInterface[]>([]);
const foodModule = ref([]);

onBeforeMount(async () => {
  const { data: food } = await useAdminFetch("arta/food").json();
  const { data: foodModuleData } = await useAdminFetch(
    "arta/foodmodule"
  ).json();

  data.value = food.value;
  foodModule.value = foodModuleData.value;
});

let allActive = $ref(false);

function change() {
  allActive = !allActive;
  data.value.forEach((item) => {
    if (allActive) item.selected = true;
    else item.selected = false;
  });
}
const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["name", "id"],
};

let search = $ref("زینب");

// const fuse = new Fuse(data.value, options);

const { results } = useFuse(search, data);

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
  return results.value.slice(CALC, CALC + 8) as unknown as {
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
