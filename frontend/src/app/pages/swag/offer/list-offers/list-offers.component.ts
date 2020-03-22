import {Component, OnInit} from '@angular/core';
import {Job, JobWebEndpoint} from '../../../../shared/apina-api';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})

export class ListOffersComponent implements OnInit {
  jobs: Job[];

  constructor(private jobWebEndpoint: JobWebEndpoint) {
    jobWebEndpoint.findAll().subscribe(jobs => {
      this.jobs = jobs;
    })
  }

  ngOnInit(): void {
  }
}
