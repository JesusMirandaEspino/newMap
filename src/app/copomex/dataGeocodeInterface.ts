export interface Datageocode {
    error:         boolean;
    code_error:    number;
    error_message: null;
    response:      Response;
}

export interface Response {
    cp:                string;
    calle:             null;
    numero:            null;
    asentamiento:      string[];
    tipo_asentamiento: string;
    municipio:         string;
    estado:            string;
    ciudad:            string;
    pais:              string;
    geocoding:         Geocoding[];
}

export interface Geocoding {
    lat:   null;
    lng:   null;
    label: null;
}
