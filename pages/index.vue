<template>
  <div>
    <h1>Quiz</h1>
    <div v-for="(question, qIndex) in questions" :key="qIndex" class="question">
      <Card>
        <template #title>{{ qIndex + 1 }}. {{ question.question }}</template>
        <template #content>
          <div
            class="question"
            v-for="(choice, cIndex) in question.choices"
            :key="cIndex"
          >
            <RadioButton
              :name="'question-' + qIndex"
              :value="choice"
              v-model="answers[qIndex]"
            />
            <label class="choice-label">{{ choice }}</label>
          </div>
        </template>
      </Card>
    </div>
    <Button label="Submit" @click="submit" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface Question {
  question: string;
  choices: string[];
}

const questions = ref<Question[]>([]);
const answers = ref<string[]>([]);

const fetchQuestions = async () => {
  const response = await fetch("/api/question");
  questions.value = await response.json();
  answers.value = new Array(questions.value.length).fill("");
};

onMounted(fetchQuestions);

const router = useRouter();

const submit = async () => {
  const score = answers.value.filter(
    (answer, index) => answer === questions.value[index].choices[0]
  ).length;
  const name = prompt("Enter your name for the leaderboard:");
  await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });
  router.push("/leaderboard");
};
</script>

<style lang="scss" scoped>
.question {
  margin-bottom: 10px;
}

.choice-label {
  margin-left: 10px;
}
</style>
