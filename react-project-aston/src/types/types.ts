export type Props = {
  children: React.ReactNode;
};

export type BookData = {
  id: number;
  detail: string;
  formats: { 'image/jpeg': string };
  title: string;
  download_count: number;
  languages: string[];
  subjects: string[];
  authors: object[];
};

export type BooksData = {
  count: number;
  results: BookData[];
};

export type RootState = {
  history: {
    search: string;
    copyright: boolean | string;
    languages: string | string[];
  }[];
  favourites: { string: boolean };
  user: { email: string };
  api: {};
};

export type LocationState = {
  page?: string;
  component?: string;
};

export type FavouriteObject = {
  string: boolean;
};
