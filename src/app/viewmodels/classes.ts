import { UserRole } from './enums';
import { IArticle, IBreathControl, ICreateBreathContolLogRequest, ICreateMeditationLogRequest, ICreateWalkLogRequest, IImage, IMeditation, IQuestion, IRegisterPatientRequest, IRole, IText, ITokenUser, IUpdateActionDurationTimeRequest, IVideo, IWalk } from './viewmodels';
import {
  IArticle,
  IExpandedArticle,
  IImage,
  IPsychologist,
  IRegisterPatientRequest,
  IRole,
  IText,
  ITokenUser,
  IVideo,
} from './viewmodels';

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

export class ExpendedArticle implements IExpandedArticle {
  constructor(data?: IExpandedArticle) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
  article: IArticle;
  authorName: string;
}

export class Psychologist implements IPsychologist {
  constructor(data?: IPsychologist) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
  type: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  roleId: string;
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

  constructor(data?: ITokenUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class RegisterPatientRequest implements IRegisterPatientRequest {
  type: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  roleId: string;

  constructor(data?: IRegisterPatientRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Role implements IRole {
  roleId: string;
  name: string;

  constructor(data?: IRole) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Question implements IQuestion {
  question: string;
  answers: string[];
  selectedAnswer?: string;
}

export class Meditation implements IMeditation {
  music: boolean;
  stressReliefActionId: string;
  patientId: string;
  startedAt: string;
  durationTime: number;

  constructor(data?: IMeditation) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class BreathControl implements IBreathControl {
  tempo: number;
  stressReliefActionId: string;
  patientId: string;
  startedAt: string;
  durationTime: number;

  constructor(data?: IBreathControl) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class Walk implements IWalk {
  kilometers: number;
  stressReliefActionId: string;
  patientId: string;
  startedAt: string;
  durationTime: number;

  constructor(data?: IWalk) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class CreateMeditationLogRequest implements ICreateMeditationLogRequest {
  patientId: string;
  music: boolean;

  constructor(data?: ICreateMeditationLogRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class CreateBreathControlLogRequest implements ICreateBreathContolLogRequest {
  patientId: string;
  tempo: number;

  constructor(data?: ICreateBreathContolLogRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class CreateWalkLogRequest implements ICreateWalkLogRequest {
  patientId: string;
  kilometers: number;

  constructor(data?: ICreateWalkLogRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

export class UpdateActionDurationTimeRequest implements IUpdateActionDurationTimeRequest {
  stressReliefActionId: string;
  durationTime: number;

  constructor(data?: IUpdateActionDurationTimeRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}