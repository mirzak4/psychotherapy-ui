import { Routes } from "@angular/router";
import { MeditationComponent } from "./meditation/meditation.component";
import { StressReliefComponent } from "./stress-relief.component";
import { BreathControlComponent } from "./breath-control/breath-control.component";
import { WalkComponent } from "./walk/walk.component";

export default [
    {
        path: '',
        component: StressReliefComponent
    },
    {
        path: 'meditation',
        component: MeditationComponent
    },
    {
        path: 'breath-control',
        component: BreathControlComponent
    },
    {
        path: 'walk',
        component: WalkComponent
    }
] as Routes;