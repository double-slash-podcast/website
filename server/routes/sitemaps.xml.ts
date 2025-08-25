import path from 'path';
import fs from 'fs';
import {SitemapStream, streamToPromise} from 'sitemap';

// find file and get stats
const getModifiedDate = (id: string | undefined): {lastmod: Date | null} => {
  if (!id) return {lastmod: null};
  // use id for get complete path, format id is content:podcasts:051.docusaurus:index.md
  const _path = id
    .replace(/[:]+/g, '/')
    .replace('podcasts/', '')
    .replace('articles/', '')
    .replace('custom/', '');
  const stats = fs.statSync(path.resolve(`./content/`, _path));
  return {lastmod: stats.mtime};
};

export default defineEventHandler(async event => {
  // global info from config app
  const {
    baseInfos: {siteUrl},
  } = useAppConfig();

  // Fetch all documents
  const pod = await queryCollection(event, 'podcasts').all();
  const art = await queryCollection(event, 'articles').all();
  const cus = await queryCollection(event, 'custom').all();

  const docs = [...pod, ...art, ...cus];

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
  for (const doc of docs) {
    const {lastmod} = getModifiedDate(doc.id);
    // remove custom for content page
    const _path = `${doc.path}/`.replace(/^\/custom/, '');
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
