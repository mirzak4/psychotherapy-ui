import { UserRole } from './enums';

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

export interface IRegisterPatientRequest {
  type: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  roleId: string;
}

export interface IRole {
  roleId: string;
  name: string;
}

export interface IPsychologist {
  type: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  roleId: string;
}

export interface IPsychologistArticleMap {
  psychologistDetails?: IPsychologist;
  article?: IArticle[];
}
