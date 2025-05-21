<template>
   <div class="w-full">
    <ResumeProfile v-if="resumeData" :resume="resumeData" />
  </div>
</template>

<script setup lang="ts">
import type { Resume } from '@/types/resume'

const config = useRuntimeConfig()

const { data: resumeData } = await useFetch<Resume>('/test/v2/app', {
  baseURL: config.public.apiBase,
  transform: (data: Resume) => {
    return {
      ...data,
      photo: data.photo ? `${config.public.apiBase}${data.photo}` : '',
      phone: data.phone ? `+${data.phone}` : '',
      portfolios: data.portfolios ?  `${config.public.apiBase}${data.portfolios}` : null
    }
  },
})
</script>
