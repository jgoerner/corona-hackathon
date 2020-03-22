import {Component, OnInit} from '@angular/core';
import {
  AllocatorWebEndpoint,
  EmployeeWebEndpoint,
  Job,
  JobRecommendation,
  JobWebEndpoint
} from '../../../../shared/apina-api';
import {mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
  jobs: Job[];

  recommendations: JobRecommendation[];

  constructor(private employeeWebEndpoint: EmployeeWebEndpoint,
              private jobWebEndpoint: JobWebEndpoint,
              private allocatorWebEndpoint: AllocatorWebEndpoint) {
    this.employeeWebEndpoint.getCurrent().pipe(
      mergeMap((employee) => {
        return this.allocatorWebEndpoint.findMatchesById(employee.id)
      }),
      mergeMap((recommendations: JobRecommendation[]) => {
        this.recommendations = recommendations;
        return forkJoin(recommendations.map((job) => this.jobWebEndpoint.findById(job.jobId)))
      })
    ).subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  ngOnInit(): void {

  }
}
