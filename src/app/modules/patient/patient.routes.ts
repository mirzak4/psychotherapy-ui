import { Routes } from "@angular/router";
import { PsychologistSelectComponent } from "./components/psychologist-select/psychologist-select.component";
import { DailyReportComponent } from "./components/reports/daily-report/daily-report.component";
import { StressReliefComponent } from "./components/stress-relief/stress-relief.component";
import { StressReliefActionLogsComponent } from "./components/reports/stress-relief-action-logs/stress-relief-action-logs.component";
import { ReportsComponent } from "./components/reports/reports.component";

export default [
    {
        path: 'psychologist-select',
        component: PsychologistSelectComponent
    },
    {
        path: 'reports',
        children: [
            {
                path: '',
                component: ReportsComponent
            },
            {
                path: 'daily',
                component: DailyReportComponent
            },
            {
                path: 'stress-relief',
                component: StressReliefActionLogsComponent
            }
        ]
    },
    {
        path: 'stress-relief',
        loadChildren: () => import('./components/stress-relief/stress-relief.routes')
    }
] as Routes;