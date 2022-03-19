import { defaultImage, defaultTitle } from '@/components/shared/Layout/config';
import config from '@/config';
import type { Person, WebSite, Graph, ImageObject } from '@/types/schema';

const authorId = `${config.appURL}/#/schema/person/1`;

const authorSchema: Person = {
  '@type': 'Person',
  '@id': authorId,
  name: AUTHOR_NAME,
  url: AUTHOR_URL
};

const imageId = `${config.appURL}/#/schema/image/1`;

const imageSchema: ImageObject = {
  '@type': 'ImageObject',
  '@id': imageId,
  name: 'logo',
  url: defaultImage,
  contentUrl: defaultImage
};

const webSiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': `${config.appURL}/#/schema/website/1`,
  name: `${APP_NAME} : ${defaultTitle}`,
  description: `Singkat tautan dengan mudah dan gratis di ${APP_NAME}`,
  inLanguage: 'id-ID',
  url: config.appURL,
  image: {
    '@type': 'ImageObject',
    '@id': imageId
  },
  publisher: {
    '@type': 'Person',
    '@id': authorId
  }
};

const schema: Graph = {
  '@context': 'https://schema.org',
  '@graph': [authorSchema, imageSchema, webSiteSchema]
};

export default schema;
