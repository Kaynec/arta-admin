<template>
  <div
    grow
    shadow-md
    max-w-75
    h-full
    flex
    flex-col
    items-center
    justify-start
    relative
    pt-25
  >
    <img src="../assets/purple-logo.png" alt="purple background" />
    <ul
      flex
      flex-col
      items-center
      justify-center
      grow
      w="75%"
      left-0
      absolute
      mt="50"
      gap-1
    >
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/home"
      >
        <div class="i-bxs:dashboard" />
        داشبورد
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/dailyqoute"
      >
        <div class="i-carbon:string-text" />
        جملات روز
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/blogcategory"
      >
        <div class="i-fa6-solid:align-right" />
        دسته بندی بلاگ
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/blogpost"
      >
        <div class="i-bi:file-earmark-plus" />
        پست‌های بلاگ
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/food"
      >
        <div class="i-ion:fast-food-outline" />
        غذاها
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/sportactivity"
      >
        <div class="i-ion:football" />
        فعالیت های ورزشی
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/sicknessrecord"
      >
        <div class="i-mdi:emoticon-sick-outline" />
        سوابق بیماری
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/drarta"
      >
        <div class="i-fa6-solid:user-doctor" />
        پیام دکتر آرتا
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/users"
      >
        <div class="i-gridicons:multiple-users" />

        کاربران
      </RouterLink>
      <RouterLink
        class="router-link"
        :exact-active-class="'bg-primary shadow-2xl text-white'"
        to="/messages"
      >
        <div class="i-jam:messages-f" />

        پیام ها
      </RouterLink>
    </ul>
  </div>
</template>
