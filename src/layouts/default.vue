<template>
  <div class="flex flex-col h-full">
    <header class="fixed min-h-12 bg-blue-500 w-full z-10 flex items-center">
      <router-link to="/" class="d-flex pl-10">
        <carbon-delivery-parcel color="white" class="text-2xl cursor-pointer transition-all hover:text-gray-200" />
      </router-link>
      <div class="container mx-auto">
      </div>
    </header>
    <main class="container mx-auto mt-12 h-full p-2">
      <router-view />
    </main>
  </div>
</template>
