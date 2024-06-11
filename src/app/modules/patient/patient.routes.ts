import { Routes } from "@angular/router";
import { PsychologistSelectComponent } from "./components/psychologist-select/psychologist-select.component";
import { DailyReportComponent } from "./components/reports/daily-report/daily-report.component";
import { StressReliefComponent } from "./components/stress-relief/stress-relief.component";

export default [
    {
        path: 'psychologist-select',
        component: PsychologistSelectComponent
    },
    {
        path: 'report',
        component: DailyReportComponent
    },
    {
        path: 'stress-relief',
        loadChildren: () => import('./components/stress-relief/stress-relief.routes')
    }
] as Routes;