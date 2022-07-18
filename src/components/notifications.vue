<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useNotificationStore } from "~/store/notifications";

const store = useNotificationStore();
const successMessage = computed(() => store.$state.success);
const dangerMessage = computed(() => store.$state.danger);
const isMessageShowing = computed(
  () => successMessage.value || dangerMessage.value
);
const message = computed(() => store.message);
const eventSource = ref<EventSource | null>(null);

const classNames = computed(() => {
  const classes = [];
  if (isMessageShowing.value) {
    classes.push("bottom-4");
    classes.push(successMessage.value ? "bg-green-100" : "bg-red-100");
  } else {
    classes.push("-bottom-64");
  }

  return classes;
});

enum NotificationMessageType {
  Success = 0,
  Danger,
  Warning,
}

interface NotificationMessage {
  messageType: NotificationMessageType;
  message: string;
}

onMounted(() => {
  eventSource.value = new EventSource(
    `${import.meta.env.VITE_API_BASE_URL ?? ""}/notifications`
  );

  eventSource.value.onmessage = async (e: MessageEvent) => {
    const message: NotificationMessage = JSON.parse(e.data);

    switch (message.messageType) {
      case NotificationMessageType.Success:
        await store.success(message.message);
        break;
      case NotificationMessageType.Danger:
        await store.danger(message.message);
        break;
    }
  };
});

onBeforeUnmount(() => {
  eventSource.value?.close();
  eventSource.value = null;
});
</script>

<template>
  <div
    class="h-32 w-64 fixed right-4 transition-all rounded"
    :class="classNames"
  >
    <div class="text-center py-2">Сообщение</div>
    <hr class="border-green-700" />
    <div class="text-center">{{ message }}</div>
  </div>
</template>
