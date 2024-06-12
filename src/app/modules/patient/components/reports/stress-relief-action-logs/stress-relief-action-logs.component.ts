import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StressReliefService } from '../../../services/stress-relief/stress-relief.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IStresReliefAction } from '../../../../../viewmodels/viewmodels';
import { StressReliefActionType } from '../../../../../viewmodels/enums';
import { DurationFormatPipe } from '../../../pipes/duration-format/duration-format.pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-stress-relief-action-logs',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DatePipe,
    DurationFormatPipe,
    MatPaginatorModule
  ],
  templateUrl: './stress-relief-action-logs.component.html',
  styleUrl: './stress-relief-action-logs.component.scss'
})
export class StressReliefActionLogsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<IStresReliefAction> = new MatTableDataSource([]);
  displayedColumns = ['type', 'startedAt', 'duration', 'additional'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _stressReliefService: StressReliefService,
    private _authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this._stressReliefService.getAllActionLogs(this._authService.currentUserId).subscribe((result) => {
      this.dataSource.data = result.stressReliefActionLogs;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getActionType(action: IStresReliefAction) {
    if ('music' in action) {
      return StressReliefActionType.Meditation;
    }
    if ('tempo' in action) {
      return StressReliefActionType.BreathControl;
    }
    return StressReliefActionType.Walk;
  }

  getAdditionalInfo(action: IStresReliefAction) {
    if ('music' in action) {
      return action.music ? 'Done with music' : 'Done without music';
    }
    if ('tempo' in action) {
      return `Breath tempo was ${action.tempo}`;
    }
    if ('kilometers' in action) {
      return `Total distance walked: ${action.kilometers}`;
    }
    return '';
  }

}
