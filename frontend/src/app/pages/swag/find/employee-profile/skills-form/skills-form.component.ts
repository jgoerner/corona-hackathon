import {Component, OnInit} from '@angular/core';
import {Employee, EmployeeWebEndpoint} from '../../../../../shared/apina-api';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

  employee: Employee;

  skills = [
    {label: 'Deutsch-sprachig', value: 'Deutsch-sprachig', checked: false},
    {label: 'Englisch-sprachig', value: 'Englisch-sprachig', checked: false},
    {label: 'Führerschein', value: 'Führerschein', checked: false},
    {label: 'Immatrikuliert', value: 'Immatrikuliert', checked: false}
  ];

  constructor(private employeeWebEndpoint: EmployeeWebEndpoint) {
  }

  ngOnInit() {
    this.employeeWebEndpoint.getCurrent().subscribe((employee) => {
      if (employee) {
        this.employee = employee;
        this.skills[0]['checked'] = this.employee.germanSkill;
        this.skills[1]['checked'] = this.employee.englishSkill;
        this.skills[2]['checked'] = this.employee.licenseSkill;
        this.skills[3]['checked'] = this.employee.studentSkill;
      }
    })
  }

  updateSkills() {
    if (this.employee && this.employee.id) {
      this.employeeWebEndpoint.update(this.employee.id,
        this.employee.name,
        this.employee.ageGroup,
        this.employee.location,
        this.skills[0]['checked'],
        this.skills[1]['checked'],
        this.skills[2]['checked'],
        this.skills[3]['checked']).subscribe((res) => {
      })
    }
  }
}
