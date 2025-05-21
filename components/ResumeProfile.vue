<script setup lang="ts">
import { computed } from 'vue'
import type { Resume, Status } from '@/types/resume'

const props = defineProps<{ resume: Resume }>()

const resumeStatuses: Status[] = [
  {
    label: "Новое",
    status: "new",
  },
  {
    label: "Просмотрено",
    status: "viewed",
  },
  {
    label: "Отправлено приглашение",
    status: "invited",
  },
  {
    label: "Назначено собеседование",
    status: "interview_scheduled",
  },
  {
    label: "Не дошел",
    status: "no_show",
  },
  {
    label: "Проведено собеседование",
    status: "interviewed",
  },
  {
    label: "Ожидание ответа",
    status: "waiting_response",
  },
  {
    label: "Принятие решения",
    status: "decision_making",
  },
  {
    label: "Принят",
    status: "accepted",
  },
  {
    label: "Отклонено",
    status: "rejected",
  },
  {
    label: "Архивировано",
    status: "archived",
  }
]


const currentStatus = computed(() => resumeStatuses.find(s => s.status === props.resume.status))

const mainInfo = computed(() => {
  const description = props.resume.description ?? ''
  const lines = description.split(/\r?\n/)
  const info: Record<string, string> = {}

  for (const line of lines) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      info[key.trim()] = rest.join(':').trim()
    }
  }

  return info
})

</script>
  
  <template>
    <UCard class="bg-gray-900 text-white rounded-xl h-full w-full">
      <div class="space-y-6">
        <div class="flex gap-3 flex-wrap justify-start">
        <UButton icon="i-heroicons-printer" variant="ghost" size="xl"  />
        <UButton icon="i-heroicons-document-text" variant="ghost" size="xl" />
        <UButton icon="i-heroicons-document-text" variant="ghost" size="xl"/>
        <UButton icon="i-heroicons-clipboard-document-list" variant="ghost" size="xl" />
        <UButton icon="i-heroicons-trash" variant="ghost" size="xl"/>
        <UButton icon="i-heroicons-star" variant="ghost" size="xl"/>
        <UButton icon="i-heroicons-heart" variant="ghost" size="xl"/>
      </div>

      <div class="flex gap-4">
        <UAvatar
          size="3xl" 
          class="bg-white text-black"
          :src="resume.photo"
          :alt="resume.name"
          :text="resume.name"
        />
        <div class="flex-1 space-y-1">
          <div class="flex items-center gap-2 text-xl font-semibold">
            {{ resume.name }}
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
          </div>
          <div class="flex gap-1 items-center">
            Кандидат на вакансию:
            <div class="flex items-center gap-2 text-sky-400 underline">
              Жадный благотворитель
              <UIcon name="i-heroicons-arrow-top-right-on-square" />
            </div>
            <span class="text-sm text-blue-300 ml-1">(14.08.2024 Отклик)</span>
          </div>
          <div class="text-sm text-gray-400">Просмотрено</div>
          <div class="text-sm">Возраст не указан</div>
          <div class="flex items-start flex-col gap-1">
            <div class="flex items-center gap-2">
              <UButton icon="i-heroicons-phone" color="primary" variant="link" size="lg" :label="resume.phone" />
              <div class="flex items-center gap-2">
                <UIcon name="i-simple-icons-whatsapp" class="text-lg text-green-400" />
                <UIcon name="i-simple-icons-viber" class="text-lg text-purple-400" />
                <UIcon name="i-simple-icons-telegram" class="text-lg text-sky-400" />
              </div>
            </div>
            <UButton icon="i-heroicons-envelope" color="primary" variant="link" size="lg" :label="resume.email" />
            
          </div>
        </div>
      </div>

      <div class="flex flex-wrap flex-col gap-2">
      <div class="font-semibold">Дела:</div>
      <div class="flex flex-wrap gap-2">
        <UButton label="Собеседование запланировано" color="primary" variant="solid" class="p-3" />
        <UButton label="Создать видеозвонок"  variant="outline" class="p-3 hover:bg-primary hover:text-white"/>
        <UButton label="Запланировать событие" variant="outline" class="p-3 hover:bg-primary hover:text-white"/>
        <UButton label="Отправить запрос" variant="outline" class="p-3 hover:bg-primary hover:text-white"/>
      </div>
      </div>

      <div class="space-y-2">
        <div class="font-semibold">Статус рассмотрения:</div>
        <div class="flex flex-wrap gap-6">
          <div
            v-for="status in resumeStatuses"
            :key="status.status"
            :class="[
              'relative rounded-l-md px-6 h-10 flex items-center justify-center',
              currentStatus?.status === status.status ? 'bg-gray-500' : 'bg-white',
              'before:absolute before:top-0 before:right-0 before:w-0 before:h-0 before:border-t-[20px] before:border-b-[20px] before:border-l-[14px] before:border-transparent before:translate-x-full',
              currentStatus?.status === status.status ? 'before:border-l-gray-500' : 'before:border-l-white'
            ]"
          >
            <span class="text-sm text-black">{{ status.label }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-2 text-sm">
        <div class="font-semibold">Pikabu отклик</div>
        <div class="text-gray-400">Отклик с портала pikabu.</div>
        <div class="flex gap-2">
          <span>Дата рождения:</span>
          <span class="text-white font-medium">{{ resume.birth_date }}</span>
        </div>
        <div 
          v-for="(value, key) in mainInfo"
          :key="key"
          class="flex gap-2"  
        >
          <span>{{ key }}:</span>
          <span class="text-white font-medium">{{ value }}</span>
        </div>
        <div class="mt-2 text-gray-300">Сопроводительное письмо</div>
      </div>

      <div class="bg-cyan-700 text-white p-4 rounded flex gap-2">
        <UIcon name="i-heroicons-information-circle" class="text-2xl" />
        <div class="flex flex-col gap-2">
          <span>Файлы портфолио:</span>
          <NuxtLink 
           :to="resume.portfolios ? resume.portfolios : '#'"
            target="_blank"
            class="underline font-semibold"
          >
            Резюме:
          </NuxtLink>
        </div>
      </div>
      </div>
    </UCard>
  </template>
