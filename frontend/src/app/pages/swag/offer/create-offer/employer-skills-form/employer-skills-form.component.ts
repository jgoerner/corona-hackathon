import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employer-skills-form',
  templateUrl: './employer-skills-form.component.html',
  styleUrls: ['./employer-skills-form.component.scss']
})
export class EmployerSkillsFormComponent implements OnInit {

  skills = [
    {label: 'Immatrikuliert', value: 'Immatrikuliert'},
    {label: 'Deutsch-sprachig', value: 'Deutsch-sprachig'},
    {label: 'Englisch-sprachig', value: 'Englisch-sprachig'},
    {label: 'Führerschein', value: 'Führerschein'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  updateSkills(skills: object[]) {
    console.log(skills);
  }
}
