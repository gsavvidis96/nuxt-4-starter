<template>
  <div class="d-flex flex-column flex-grow-1 align-center ga-4 pa-4">
    <v-chip>
      {{ $dayjs().format("DD/MM/YYYY HH:mm") }}
    </v-chip>

    <v-tooltip :text="`Switch to ${isDark ? 'light' : 'dark'} mode`">
      <template #activator="{ props }">
        <v-btn v-bind="props" @click="toggleDark()">
          <template #prepend>
            <v-icon class="text-medium-emphasis" size="small">{{
              isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"
            }}</v-icon>
          </template>

          {{ isDark ? "Light" : "Dark" }} mode
        </v-btn>
      </template>
    </v-tooltip>

    <form
      class="d-flex flex-column ga-4 border pa-4 rounded"
      novalidate
      @submit="onSubmit"
    >
      <div class="text-h6 text-center align-self-center">
        Random form with validation
      </div>

      <v-text-field
        v-model.trim="email"
        label="Email"
        type="email"
        hide-details="auto"
        density="compact"
        variant="outlined"
        color="primary"
        class="flex-grow-0"
        :error-messages="meta.touched ? errors.email : ''"
      />

      <v-btn color="primary" type="submit" :loading="loader" class="mt-auto"
        >Submit</v-btn
      >
    </form>

    <div class="text-body-2 font-weight-semibold">
      This is a semibold text which is a custom utility class
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useTheme } from "vuetify";

const theme = useTheme();

const { $apiClient } = useNuxtApp();

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { openSnackbar } = useBaseStore();

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .email("Must be a valid email")
    .trim(),
});

const { defineField, handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema,
});

const [email] = defineField("email");

const loader = ref(false);

const onSubmit = handleSubmit(async () => {
  loader.value = true;

  try {
    console.log("email: ", email.value);

    const { data } = await $apiClient.get("/todos");

    console.log("TODOS: ", data);

    resetForm();

    openSnackbar({
      text: "Successful request",
      color: "success",
    });
  } catch (e) {
    console.error(e);

    openSnackbar({
      text: "Failed request",
      color: "error",
    });
  } finally {
    loader.value = false;
  }
});

watch(isDark, (newValue) => {
  theme.change(newValue ? "dark" : "light");
});
</script>

<style scoped></style>
