export enum Gender {
  Male,
  Female,
}

export enum Role {
  Manager,
  Psychologist,
  Patient,
  None,
}

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

export interface IPsychologist {
  type: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface IPsychologistArticleMap {
  psychologistDetails?: IPsychologist;
  article?: IArticle[];
}
