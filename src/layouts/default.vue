<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import messageService from "~/api/messages";
import Notifications from "~/components/notifications.vue";

const { t } = useI18n();
const scroll = ref<number>(0);

const handleScroll = () => {
  scroll.value = window.scrollY;
};

onMounted(() => {
  document.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", handleScroll);
});

const scrollTop = () => {
  window.scrollTo(0, 0);
};

const grab = async () => {
  await messageService.grab();
};

const invisible = computed(() => scroll.value <= 200);
</script>

<template>
  <header class="fixed min-h-12 bg-blue-500 w-full z-10 flex items-center">
    <div class="container mx-auto inline-flex items-center">
      <router-link to="/">
        <carbon-delivery-parcel
          color="white"
          class="text-2xl cursor-pointer transition-all hover:text-gray-200"
        />
      </router-link>
      <router-link
        to="/users"
        class="text-white pl-4 hover:text-gray-200 cursor-pointer transition-all"
      >
        {{ t("users") }}
      </router-link>
      <div class="flex-1"></div>
      <button class="btn" @click="grab">Получить</button>
    </div>
  </header>
  <main class="container mx-auto pt-12 p-2">
    <router-view />
  </main>
  <notifications />
  <button
    class="fixed w-10 h-10 rounded-full focus:outline-none transition-all right-4 bottom-4 bg-blue-500 hover:bg-blue-700 cursor-pointer py-2 text-center block z-10"
    :class="{ 'opacity-0': invisible }"
    @click="scrollTop"
  >
    <carbon-chevron-up class="text-white" />
  </button>
</template>
