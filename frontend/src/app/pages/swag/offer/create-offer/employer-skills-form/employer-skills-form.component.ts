import {Component, Input, OnInit} from '@angular/core';
import {Job, JobWebEndpoint} from '../../../../../shared/apina-api';

@Component({
  selector: 'app-employer-skills-form',
  templateUrl: './employer-skills-form.component.html',
  styleUrls: ['./employer-skills-form.component.scss']
})
export class EmployerSkillsFormComponent implements OnInit {

  @Input()
  job: Job;

  skills = [
    {label: 'Deutsch-sprachig', value: 'Deutsch-sprachig', checked: false},
    {label: 'Englisch-sprachig', value: 'Englisch-sprachig', checked: false},
    {label: 'Führerschein', value: 'Führerschein', checked: false},
    {label: 'Immatrikuliert', value: 'Immatrikuliert', checked: false}
  ];

  constructor(private jobWebEndpoint: JobWebEndpoint) {
  }

  ngOnInit() {
  }

  updateSkills() {
    if (this.job && this.job.id) {
      this.jobWebEndpoint.update(
        this.job.id, this.job.title,
        this.job.description,
        this.job.location,
        this.job.qty,
        this.job.salary,
        this.skills[0].checked,
        this.skills[1].checked,
        this.skills[2].checked,
        this.skills[3].checked).subscribe((res) => {
      });
    }
  }
}
