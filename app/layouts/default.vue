<template>
  <v-app>
    <slot />

    <v-snackbar
      v-model="snackbar.open"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template #actions>
        <v-btn
          density="comfortable"
          icon="fa-solid fa-xmark"
          @click="closeSnackbar"
        />
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
const baseStore = useBaseStore();
const { snackbar } = storeToRefs(baseStore);
const { closeSnackbar } = baseStore;
</script>

<style scoped></style>
