import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environment';
import { IBreathControl, ICreateBreathContolLogRequest, ICreateMeditationLogRequest, ICreateWalkLogRequest, IMeditation, IUpdateActionDurationTimeRequest, IWalk } from '../../../../viewmodels/viewmodels';

@Injectable({
  providedIn: 'root'
})
export class StressReliefService {
  private _http = inject(HttpClient);

  constructor() { }

  getMeditationAudio() {
    return this._http.get('assets/data/meditation_music.mp3', { responseType: 'blob' });
  }

  getBreathControlSignalAudio() {
    return this._http.get('assets/data/breath_control_signal.mp3', { responseType: 'blob' });
  }

  createMeditationLog(request: ICreateMeditationLogRequest) {
    return this._http.post<IMeditation>(environment.apiUrl + 'stressreliefservice/stressrelief/meditation', request);
  }

  createBreathControlLog(request: ICreateBreathContolLogRequest) {
    return this._http.post<IBreathControl>(environment.apiUrl + 'stressreliefservice/stressrelief/breathcontrol', request);
  }

  createWalkLog(request: ICreateWalkLogRequest) {
    return this._http.post<IWalk>(environment.apiUrl + 'stressreliefservice/stressrelief/walk', request);
  }

  updateActionDurationTime(request: IUpdateActionDurationTimeRequest) {
    return this._http.patch(environment.apiUrl + 'stressreliefservice/stressrelief/durationtime', request);
  }
}
