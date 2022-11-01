<template>
  <form
    @submit.prevent="login"
    h-screen
    class="bg"
    items-center
    justify-center
    flex
    flex-col
    gap-3
  >
    <img src="@/assets/logo.png" alt="logo png" />
    <div relative rounded-xl min-w-100 min-h-15 flex items-center bg-white>
      <input
        type="text"
        placeholder="نام کاربری"
        w-full
        h-full
        bg-transparent
        pr="2.75rem"
        rounded-xl
        v-model="Login.username"
      />
      <div
        class="i-carbon:user-avatar"
        absolute
        right-0
        text-2rem
        text-gray-500
      />
    </div>
    <div relative rounded-xl min-w-100 min-h-15 flex items-center bg-white>
      <input
        type="password"
        placeholder="رمز عبور"
        w-full
        h-full
        bg-transparent
        pr="2.75rem"
        rounded-xl
        v-model="Login.password"
      />
      <div
        class="i-clarity:lock-solid"
        absolute
        right-0
        text-2rem
        text-gray-500
      />
    </div>
    <button type="submit" btn>Login</button>
  </form>
</template>

<script setup lang="ts">
const Login = reactive({
  username: "",
  password: "",
});

async function login() {
  const infoForSend = {
    username: Login.username.trim(),
    password: Login.password.trim(),
  };

  try {
    const { data, error } = $(
      await useAdminFetch("auth/jwt/create").post(infoForSend).json()
    );

    if (error) {
      alertify({
        type: "error",
        text: error,
      });
    }
    console.log(data);
    useAdminStore().setToken(data.access);
  } catch (error) {}
}
</script>

<style scoped>
.bg {
  background: linear-gradient(180deg, #6e4fd1 0%, #37217f 100%);
}
</style>
