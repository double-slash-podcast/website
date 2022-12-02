import path from 'path';
import fs from 'fs';
import {SitemapStream, streamToPromise} from 'sitemap';
import {serverQueryContent} from '#content/server';

// find file and get stats
const getModifiedDate = (id: string | undefined): {lastmod: Date | null} => {
  if (!id) return {lastmod: null};
  // use id for get complete path, format id is content:podcasts:051.docusaurus:index.md
  const _path = id.replace(/[:]+/g, '/');
  const stats = fs.statSync(path.resolve(`./`, _path));
  return {lastmod: stats.mtime};
};

export default defineEventHandler(async event => {
  // global info from config app
  const config = useRuntimeConfig();
  const {siteUrl} = config.public;

  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const _docs = docs
    // .filter(doc => doc?._path?.includes('/podcasts'))
    .filter(doc => !doc?._path?.includes('/transcript'));

  const sitemap = new SitemapStream({
    hostname: siteUrl,
  });

  // homepage
  sitemap.write({
    url: '',
    changefreq: 'monthly',
  });

  // list podcasts
  sitemap.write({
    url: '/articles/',
    changefreq: 'monthly',
    priority: 0.7,
  });

  // list podcasts
  sitemap.write({
    url: '/podcasts/',
    changefreq: 'monthly',
    priority: 0.7,
  });

  // podcasts
  for (const doc of _docs) {
    const {lastmod} = getModifiedDate(doc._id);
    // remove custom for content page
    const _path = `${doc._path}/`.replace(/^\/custom/, '');
    sitemap.write({
      url: `${_path}`,
      changefreq: 'monthly',
      lastmod,
      priority: 1.0,
    });
  }
  sitemap.end();
  return streamToPromise(sitemap);
});
