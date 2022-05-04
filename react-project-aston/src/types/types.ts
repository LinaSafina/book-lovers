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
  authors: { name: string }[];
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
  favourites: { [index: string]: boolean };
  user: { email: string };
};

export type LocationState = {
  page?: string;
  component?: string;
};

export type PaginationType = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage?: number;
};

export type FavouritesType = {
  [index: string]: boolean;
};

export type HistoryType = {
  search: string;
  copyright: boolean | string;
  languages: string | string[];
}[];
