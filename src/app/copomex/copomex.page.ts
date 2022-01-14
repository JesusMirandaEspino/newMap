import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm,  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map  }  from 'rxjs/operators';

// importacion de la interface para tomar los datos
import { Datageocode } from './dataGeocodeInterface';

@Component({
  selector: 'app-copomex',
  templateUrl: './copomex.page.html',
  styleUrls: ['./copomex.page.scss'],
})
export class CopomexPage implements OnInit {

    @ViewChild('addressngForm', { static: false }) addressngForm: NgForm;

    // Variables para la consulta a la API de Addres Copomex
      private urlPart1: string = 'https://api.copomex.com/query/info_cp_geocoding/';
      private urlPart2: string = '?type=simplified&token=';
      key = '0fd6ae7e-3944-48e4-8dd6-46268cf7f05f';

    // Es otra API para codigos postales https://github.com/acrogenesis/API-Codigos-Postales   https://forcsec.com/api-codigos-postales


    // variable para tomar las respuesta de la consulta
      dataAddres: Datageocode;

      public addressForm: FormGroup;

  constructor( private http: HttpClient  ) {
    // code
  }

  ngOnInit() {
    // code
    this.setupForm();
  }


  // servicio para hacer el get De la consulta
  getDataByPostalCode(  postalCode: any ):Observable<Datageocode>{
    console.log( postalCode  );
      return this.http.get<Datageocode>( `${this.urlPart1}${postalCode}${this.urlPart2}${this.key}` )
      .pipe( map(  (results )  => results )  );
  }

// funcion para tomar el resultado de la consulta y ponerlos es las campos respectivos
  GetAddresFromApi(postalCode:any){

    this.getDataByPostalCode(postalCode).subscribe( ( data ) => {

      this.dataAddres = data;

      // Se iguala los valores recibidos de la consulta a los campos
      this.addressForm.controls['municipality'].setValue( this.dataAddres.response.municipio );
      this.addressForm.controls['state'].setValue( this.dataAddres.response.estado );
      this.addressForm.controls['suburb'].setValue( this.dataAddres.response.asentamiento[0] );

    } );


  }




//Formulario
  setupForm() {


    this.addressForm = new FormGroup({
      user:new FormControl(''),
      current_home: new FormControl(''),
      street: new FormControl(''),
      no_outsite_inside: new FormControl(''),
      postal_code: new FormControl(''),
      suburb: new FormControl(''),
      municipality: new FormControl(''),
      state: new FormControl(''),
      phone: new FormControl(''),
      cellphone: new FormControl(''),
      email: new FormControl(''),
      invoice: new FormControl(''),
      });



  }



}
