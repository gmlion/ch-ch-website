import { computed } from 'vue';
import { electionSlugs } from '../utils/url';
import {useStore} from "@nanostores/vue";
import {availableLanguages} from "~/generate/store/publicationStore";
import type {RouteLocationNormalizedLoadedGeneric} from "vue-router";

const availableLanguagesStore = useStore( availableLanguages );

export const availableLocales = computed(() => (this as any).$i18n.locales);

export const changeLocale = (code: string, oldLocale: string, route: RouteLocationNormalizedLoadedGeneric) => {
    const currentPath = route.path.toLowerCase();


    if (availableLanguagesStore.value === null) {
        let newPath = '';

        if (currentPath.includes(oldLocale)) {
            newPath = currentPath.replace(oldLocale, code);

            if (route.query.q) {
                newPath += `?q=${route.query.q}`;
            }
        } else {
            newPath = `/${code}${currentPath}`;
        }

        if (currentPath.includes(electionSlugs[oldLocale])) {
            newPath = newPath.replace(
                electionSlugs[oldLocale],
                electionSlugs[code]
            );
        }

        window.location.href = newPath;
    } else {
        availableLanguagesStore.value?.forEach((language) => {
            if (language.locale === code) {
                window.location.pathname = language.route;
            }
        });
    }
};

export const isNotAvailable = (locale: string) => {
    if (availableLanguagesStore.value === null) {
        return false;
    }
    if (locale === (this as any).$i18n.locale) {
        return false;
    }
    return !availableLanguagesStore.value.some(
        (language: any) => language.locale === locale
    );
};