<template>
  <div>
    <h1>Leaderboard</h1>
    <Card v-for="(entry, index) in leaderboard" :key="index">
      <template #title>{{ entry.name }}</template>
      <template #content> {{ entry.score }} points </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface LeaderboardEntry {
  name: string;
  score: number;
}

const leaderboard = ref<LeaderboardEntry[]>([]);

const fetchLeaderboard = async () => {
  const response = await fetch("/api/leaderboard");
  leaderboard.value = await response.json();
};

onMounted(fetchLeaderboard);
</script>
