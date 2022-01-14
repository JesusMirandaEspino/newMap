
//IMPORTAR LOS MODULOS NECESARIOS PARA LAS FUNCIONES.
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm,  } from '@angular/forms';


declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('addressngForm', { static: false }) addressngForm: NgForm;

/*  Restricciones de paises
  autocomplete.setComponentRestrictions({
  country: ["us", "pr", "vi", "gu", "mp"],
});

*/


  public addressForm: FormGroup;



  optionsAutocomplete = {
  // bounds: defaultBounds,
  componentRestrictions: { country: "us" },
  fields: ["address_components", "geometry" ],
  types: ["address"],
};




  valueStreet: string = '';
  map: any;
  address:string;
  lat: string;
  long: string;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;

  constructor(

    public zone: NgZone,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  //CARGAMOS EL MAPA EN ONINIT
  ngOnInit() {
    // code
    this.setupForm();
  }


  //AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions: any, status: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }





  //FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
  SelectSearchResult(item:any) {
    //AQUI PONDREMOS LO QUE QUERAMOS QUE PASE CON EL PLACE ESCOGIDO, GUARDARLO, SUBIRLO A FIRESTORE.
    console.log(this.autocomplete.input);
    this.placeid = item.place_id;
    this.autocomplete.input = item.description;
    this.valueStreet = item.description;
    this.addressForm.value.street = item.description;
    console.log( item.description, 'Datos: ',  this.addressForm.value );
    console.log(item );
    this.ClearAutocomplete();
  }


  //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
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


actualzarAdress(  item ){


// code

}


/*

// This sample uses the Places Autocomplete widget to:
// 1. Help the user select a place
// 2. Retrieve the address components associated with that place
// 3. Populate the form fields with those address components.
// This sample requires the Places library, Maps JavaScript API.
// Include the libraries=places parameter when you first load the API.
// For example: <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let autocomplete: google.maps.places.Autocomplete;


function initAutocomplete() {
  address1Field = this.addressForm.value.state;
  address2Field = this.addressForm.value.municipality;
  postalField = this.addressForm.value.postal_code;

  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca", "mx"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        console.log( `${component.long_name} ${address1}` );
        break;
      }

      case "route": {
        console.log( component.short_name );
        break;
      }

      case "postal_code": {
        console.log(  `${component.long_name}${postcode}` );
        break;
      }

      case "postal_code_suffix": {
        console.log( `${postcode}-${component.long_name}`);
        break;
      }

      case "locality": {
          console.log( component.long_name );

        break;
      }

      case "administrative_area_level_1": {
        console.log( component.short_name );
        break;
      }

      case "country": {
        console.log( component.long_name );
          component.long_name
        break;
    }
  }

  address1Field.value = address1;
  postalField.value = postcode;

  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  address2Field.focus();
}





  var  editClntInfoAutocomplete, addrStreet ="",
       addressComponets = {
                    street_number: 'short_name',
                    route: 'long_name',
                    locality: 'long_name',
                    administrative_area_level_1: 'short_name',
                    country: 'long_name',
                    postal_code: 'short_name'
       };




Ejemplo con codigo postal

function initEditClntInfoAutoComplete() {   // Callback

      editClntInfoAutocomplete = new google.maps.places.Autocomplete(
            @type {!HTMLInputElement} (document.getElementById('clntInfoEditAddr1')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        editClntInfoAutocomplete.addListener('place_changed', fillInEditClntInfoAddress);
    }

    function fillInEditClntInfoAddress() {

        var place = editClntInfoAutocomplete.getPlace();

            clearPrevEditFrmAddrVals();

        for ( var i = 0; i < place.address_components.length; i++) {

              var addressType = place.address_components[i].types[0];
              if (  addressComponets[addressType] ) {
                    var val = place.address_components[i][addressComponets[addressType]];

                    assignEditFrmAddrFieldsVal(addressType, val );
              }

         }

           if( addrStreet != "")
                 document.getElementById("clntInfoEditAddr1").value = addrStreet;

     }

     function assignEditFrmAddrFieldsVal( addressType , val ) {

            switch( addressType ) {
                case "administrative_area_level_1":
                        document.getElementById("clntInfoEditState").value = val;  break;
                case "locality":
                    document.getElementById("clntInfoEditCity").value = val;  break;
                //   case "country":
                //        document.getElementById("addressType").value = val;  break;
                case "postal_code":
                    document.getElementById("clntInfoEditZip").value = val;  break;
                case "street_number":
                case "route":
                    addrStreet += " "+val;      break;

            }

     }

     function clearPrevEditFrmAddrVals(){
         var editClntFrmAddrIDs = ["clntInfoEditState","clntInfoEditCity","clntInfoEditZip","clntInfoEditAddr1"];
             addrStreet = "";

         for( var frmID in editClntFrmAddrIDs )
              wrap(editClntFrmAddrIDs[frmID]).val("");
     }





*/


}
