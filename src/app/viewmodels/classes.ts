import { IArticle, IImage, IText, IVideo } from './viewmodels';

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
