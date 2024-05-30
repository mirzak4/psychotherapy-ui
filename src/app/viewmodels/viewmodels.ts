import { UserRole } from "./enums";

export interface IText {
  content: string;
}

export interface IImage {
  imageUrl: string;
}

export interface IVideo {
  videoUrl: string;
}

export interface IArticle {
  id: string;
  title: string;
  author: string;
  text?: IText;
  image?: IImage;
  video?: IVideo;
}

export interface ITokenUser {
  sub: string;
  name: string;
  email: string;
  exp: number;
  role: UserRole;
}
