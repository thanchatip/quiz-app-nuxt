<!-- pages/index.vue -->
<template>
  <div>
    <h1>Quiz</h1>
    {{ response }}
    <div v-for="(question, index) in questions" :key="index" class="question">
      <h3>{{ question.question }}</h3>
      <ul>
        <li v-for="(choice, idx) in question.choices" :key="idx">
          <input
            type="radio"
            :name="'question-' + index"
            :value="choice"
            v-model="answers[index]"
          />
          <label>{{ choice }}</label>
        </li>
      </ul>
    </div>
    <Button @click="submit">Submit</Button>
  </div>
</template>

<script lang="ts" setup>
interface Question {
  question: string;
  choices: string[];
}

const questions = ref();
const answers = ref<string[]>([]);

async function fetchQuestions() {
  const response = await useFetch('/api/questions');
  //questions.value = response;
  //answers.value = new Array(questions.value.length).fill('');
}

onMounted(async () => await fetchQuestions());

const router = useRouter();

const submit = async () => {
  const score = answers.value.filter(
    (answer, index) => answer === questions.value[index].choices[0]
  ).length;
  const name = prompt('Enter your name for the leaderboard:');
  await fetch('/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score }),
  });
  router.push('/leaderboard');
};
</script>

<style>
.question {
  margin-bottom: 20px;
}
</style>
