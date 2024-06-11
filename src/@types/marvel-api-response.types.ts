export type ResponseSchema<Result> = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data<Result>;
};

export type CharactersResponse = ResponseSchema<Hero>;

export type Data<Result> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
};

export type Hero = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
};

export type Thumbnail = {
  path: string;
  extension: string;
};

export type Comics = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Item = {
  resourceURI: string;
  name: string;
  type?: string;
};

export type Series = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Stories = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Events = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

export type Url = {
  type: string;
  url: string;
};

// comic

export type ComicResponse = ResponseSchema<Comic>;

export type Comic = {
  id: number;
  title: string;
  dates: Date[];
  thumbnail: Thumbnail;
};

export type Date = {
  type: string;
  date: string;
};
