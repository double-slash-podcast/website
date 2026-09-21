import {
  ensureContentSignalInRobotsTxt,
  formatContentSignalPairs,
} from '../../app/utils/contentSignals';

type RobotsGroup = {
  contentSignal?: string[];
};

type RobotsConfigHookContext = {
  groups: RobotsGroup[];
};

type RobotsTxtHookContext = {
  robotsTxt: string;
};

/**
 * Guarantee Content Signals survive prerender: restore them on groups, then
 * patch the final robots.txt if the directive is still missing.
 */
export default defineNitroPlugin(nitroApp => {
  const pairs = formatContentSignalPairs();

  nitroApp.hooks.hook('robots:config', (ctx: RobotsConfigHookContext) => {
    for (const group of ctx.groups) {
      if (!group.contentSignal?.length) {
        group.contentSignal = [pairs];
      }
    }
  });

  nitroApp.hooks.hook('robots:robots-txt', (ctx: RobotsTxtHookContext) => {
    ctx.robotsTxt = ensureContentSignalInRobotsTxt(ctx.robotsTxt);
  });
});
