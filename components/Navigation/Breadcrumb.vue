<script lang="ts" setup>
import type {Breadcrumb} from "~/generate/types/menu";

const router = useRouter();
const {locale} = useI18n();

const breadcrumb = computed(() => {
  const route = router.currentRoute.value;
  const routePath = route.path.split("/").filter((path) => path !== "" && path !== locale.value);
  const breadcrumb: Breadcrumb[] = [];

  let routeString = "";

  routePath.forEach((path) => {
    routeString += "/" + path;
    const resolvedRoute = router.resolve(`/${locale.value}${routeString}`);

    const label = resolvedRoute.name || path;
    breadcrumb.push({
      id: routeString,
      label: label as string,
      route: routeString,
    });
  });

  return breadcrumb;
});
</script>

<template>
  <ul class="flex gap-4 text-lg mb-6 flex-wrap">
    <li>
      <a
          class="nav-breadcrumb font-semibold no-underline text-tertiary-yellow hover:text-secondary-yellow"
          :href="'/' + locale"
      >{{ $t("allTopics") }}</a
      >
    </li>
    <li
        v-for="(item, index) in breadcrumb"
        :key="item.id"
        class="flex gap-4 items-center"
    >
      <svg-icon
          name="arrow-right"
          class="w-4 h-4 text-inherit text-tertiary-yellow"
          aria-hidden="true"
      />
      <a
          v-if="index < breadcrumb.length - 1"
          class="nav-breadcrumb font-semibold no-underline text-tertiary-yellow hover:text-secondary-yellow"
          :href="'/' + locale + '/' + item.route.slice(1)"
      >
        {{ item.label }}
      </a>
      <span v-else class="text-gray-600">{{ item.label }}</span>
    </li>
  </ul>
</template>