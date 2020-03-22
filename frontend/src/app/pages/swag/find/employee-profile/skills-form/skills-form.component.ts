import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {

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
