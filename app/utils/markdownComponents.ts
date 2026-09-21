import ProseA from '~/components/global/ProseA.vue';

/**
 * Tag map for ContentRenderer when prose components are off.
 * Keeps ProseA so external markdown links still get target=_blank.
 */
export const markdownComponents = {a: ProseA};
