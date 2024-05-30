import { UserRole } from './enums';
import { IArticle, IImage, IText, ITokenUser, IVideo } from './viewmodels';

export class Text implements IText {
  content: string;

  constructor(data?: IText) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Image implements IImage {
  imageUrl: string;

  constructor(data?: IImage) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Video implements IVideo {
  videoUrl: string;

  constructor(data?: IVideo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Article implements IArticle {
  id: string;
  title: string;
  author: string;
  text?: IText | undefined;
  image?: IImage | undefined;
  video?: IVideo | undefined;

  constructor(data?: IArticle) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class LoginResponse {
  accessToken: string;
}

export class TokenUser implements ITokenUser {
  sub: string;
  name: string;
  email: string;
  exp: number;
  role: UserRole;
  
  constructor(data?: IArticle) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
