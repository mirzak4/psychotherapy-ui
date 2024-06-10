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

export interface IQuestion {
  question: string;
  answers: string[];
  selectedAnswer?: string;
}

export interface IStresReliefAction {
  stressReliefActionId: string;
  patientId: string;
  startedAt: string;
  durationTime: number;
}

export interface IMeditation extends IStresReliefAction {
  music: boolean;
}

export interface IBreathControl extends IStresReliefAction {
  tempo: number;
}

export interface IWalk extends IStresReliefAction {
  kilometers: number;
}

export interface ICreateMeditationLogRequest {
  patientId: string;
  music: boolean;
}

export interface ICreateBreathContolLogRequest {
  patientId: string;
  tempo: number;
}

export interface ICreateWalkLogRequest {
  patientId: string;
  kilometers: number;
}

export interface IUpdateActionDurationTimeRequest {
  stressReliefActionId: string;
  durationTime: number;
}