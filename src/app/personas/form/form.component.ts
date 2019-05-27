import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private  persona: Persona = new Persona();

  constructor(private personaService: PersonaService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarPersona();
  }

  cargarPersona(): void{
    this.activateRoute.params.subscribe(param => {
      let id = param['idPersona'];
      if(id){
        this.personaService.getPersona(id).subscribe(
          (persona) => this.persona = persona
        )
        
      }
    })
  }

  create(): void{
    this.personaService.create(this.persona).subscribe(
      cliente => {
        this.router.navigate(['/inicio'])
      },
      err => {
        console.log('codigo de error desde el backend: '+ err.status);
        console.log(err.error.errors);
      }
    );
  }

  update(): void{
    this.personaService.update(this.persona).subscribe(
      json => {
        this.router.navigate(['/inicio'])
      },
      err => {
        console.log("codigo de error desde el backend: "+ err.status);
        console.log(err.error.errors);
      }
    );
  }

}
