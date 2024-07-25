<template>
  <a class="skip-to-content-link" href="#main">
    {{ $t("skipToMainContent") }}
  </a>
  <a class="skip-to-content-link" href="#navigation">
    {{ $t("skipToNavigation") }}
  </a>
  <a class="hidden skip-to-content-link lg:block" href="#language">
    {{ $t("skipToLanguage") }}
  </a>
  <a class="skip-to-content-link lg:hidden" href="#language-mobile">
    {{ $t("skipToLanguage") }}
  </a>
</template>
<style lang="postcss" scoped>
.skip-to-content-link {
  background-color: gray;
  height: 30px;
  left: 0px;
  padding: 8px;
  position: absolute;
  top: 0px;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  color: black;
}

.skip-to-content-link:focus {
  width: auto;
  height: auto;
  clip: auto;
}
</style>
