import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import { ActivatedRoute } from '@angular/router';
import { Response } from 'selenium-webdriver/http';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[];

  constructor(private personaService: PersonaService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(
      response => {
        this.personas = response;
      }
    );
  }

  delete(persona: Persona): void{
    this.personaService.delete(persona.id).subscribe(
      response =>{
        this.personas = this.personas.filter(per => per !== persona);
      }
    );
  }

}
