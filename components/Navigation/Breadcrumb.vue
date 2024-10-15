<script lang="ts" setup>
import type {Breadcrumb} from "~/generate/types/menuTypes";

const router = useRouter();
const {locale} = useI18n();
const props = defineProps<{
  targetUrl?: string;
  isElection? : boolean;
}>();

const homeUrl = () => {
  if (props.isElection) {
    return `/${locale.value}/${getElectionLabel(locale.value)}`;
  }
  return `/${locale.value}`;
}

const breadcrumb = computed(() => {

  const route = props.targetUrl ? props.targetUrl : router.currentRoute.value.path;
  const routePath = route.split("/").filter((path) => path !== "" && path !== locale.value);
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
  // if isElection, remove the first element of the breadcrumb since it is the election label
  if (props.isElection) {
    breadcrumb.shift();
  }
  return breadcrumb;
});
</script>

<template>
  <ul class="flex gap-4 text-lg mb-6 lg:mb-10 flex-wrap">
    <li>
      <a
          class="nav-breadcrumb font-semibold no-underline text-secondary-yellow hover:text-tertiary-yellow"
          :href="homeUrl()"
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
          class="w-4 h-4 text-inherit text-secondary-yellow"
          aria-hidden="true"
      />
      <a
          v-if="index < breadcrumb.length - 1"
          class="nav-breadcrumb font-semibold no-underline text-secondary-yellow hover:text-tertiary-yellow"
          :href="'/' + locale + '/' + item.route.slice(1)"
      >
        {{ item.label }}
      </a>
      <span v-else class="text-gray-300 font-semibold">{{ item.label }}</span>
    </li>
  </ul>
</template>