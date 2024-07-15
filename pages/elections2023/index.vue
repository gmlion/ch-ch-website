<script setup>
const route = useRoute();
console.log(route.fullPath);
</script>
<template>Index {{ route.fullPath }}</template>
