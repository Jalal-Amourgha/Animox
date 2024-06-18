import { MouseEventHandler } from "react";
export interface ButtonProps {
  bg: boolean;
  title: string;
  classes?: string;
  btnType?: "button" | "submit";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AnimeProps {
  mal_id: string;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  type: string;
  episodes: number;
  score: string;
}

export interface AnimeDetailsProps extends AnimeProps {
  synopsis: string;
  studios: Array<any>;
  popularity: number;
  scored_by: number;
  favorites: number;
  memebers: number;
  rank: number;
  rating: string;
  source: string;
  status: string;
  demographics: Array<any>;
  year: number;
}

export interface AnimeCharacters {
  character: {
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };

  favorites: number;
  role: string;
}

export interface RecommendationsProps {
  mal_id(mal_id: any): void;
  entry: {
    mal_id: number;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    title: string;
  };
  votes: number;
}

export interface AnimeReviewsProps {
  reactions: {
    overall: number;
    nice: number;
    love_it: number;
  };
  date: string;
  review: string;
  user: {
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

export interface MangaProps {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  score: string;
  rank: number;
  genres: any[];
}
export interface UserProps {
  username: string;
  email: string;
  image: string;
  banner: string;
  reviews: any[] | any;
  watchlist: any[] | any;
  readlist: any[] | any;
  createdAt: string;
}
