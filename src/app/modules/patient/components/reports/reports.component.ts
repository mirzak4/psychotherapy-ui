import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/reports/report.service';
import { AuthService } from '../../../auth/services/auth.service';
import { IReport } from '../../../../viewmodels/viewmodels';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ReportDetailsComponent } from './report-details/report-details.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, AfterViewInit {
  reports: IReport[] = [];
  dataSource: MatTableDataSource<IReport> = new MatTableDataSource([]);
  displayedColumns = ['date', 'overallEmotion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _reportService: ReportService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._reportService.getDailyReportsForPatient(this._authService.currentUserId).subscribe((reports: IReport[]) => {
      this.reports = reports;
      this.dataSource.data = reports;
      if (!this.reports.some(r => {
        const dateNow = new Date();
        const reportDate = new Date(r.createdAt);
        return reportDate.getFullYear() === dateNow.getFullYear()
          && reportDate.getMonth() === dateNow.getMonth()
          && reportDate.getDate() === dateNow.getDate();
      })) {
        this._router.navigate(['daily'], { relativeTo: this._route });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getEmotionRating(report: IReport) {
    const content = report.content;
    if (content.includes('(really happy)'))
      return 'Really Happy';
    if (content.includes('(happy)'))
      return 'Happy';
    if (content.includes('(neutral)'))
      return 'Neutral';
    if (content.includes('(sad)'))
      return 'Sad';
    if (content.includes('(really sad)'))
      return 'Really Sad';
    return '';
  }

  getCreatedDate(dateString: string) {
    return new Date(dateString);
  }

  openReportDetails(report: IReport) {
    this._matDialog.open(ReportDetailsComponent, {
      panelClass: 'report-details-container',
      data: report
    });
  }
}
