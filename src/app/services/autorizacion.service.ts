import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  
  constructor(private http: HttpClient) { }

  public consulta : any;
  //public id: any;
  public fecha: any;
  public motivo: String;
  public IPServidor: String = 'http://192.168.1.100:8080';
  public URLservidor: String;

  listarTodasLasAutorizaciones(){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = this.URLservidor+'/restful/services/Autorizacion/actions/listAll/invoke';

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  } //end listarTodasLasAutorizaciones()

  obtenerAutorizacionById(autorizacionId: string){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+autorizacionId;

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  } //end obtenerAutorizacionById()

  obtenerSolicitanteEmpresaByURL(solicitanteEmpresaURL: string){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = solicitanteEmpresaURL;

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  } //end obtenerSolicitanteEmpresaByURL()



  cerrarAutorizacion(id: any, fecha: any){
    console.log("entro aca con el id: "+id)

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+id+'/actions/Cerrar/invoke'

    this.consulta = this.http.post(URL,
      {
        "cierre:": {
          "value": fecha
        }
      }, httpOptions);
      console.log("Cerro la autorizacion ("+id+") con fecha: '"+fecha+"'");
    console.log(this.consulta);
    //return alert("cerrada")
    return this.consulta;
    console.log("fin de cerrar")
  }//end cerrarAutorizacion()



  cancelarAutorizacion(id: any, fecha: any, motivo:String){
    console.log("entro aca con el id: "+id+" motivo: "+motivo+" fecha: "+fecha)

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+id+'/actions/Cancelar/invoke'

    this.consulta = this.http.post(URL,
      {
        "cierre:": {
          "value": fecha
        },
        "motivoCancelacion:": {
          "value": motivo
        }
      }, httpOptions);
      console.log("Cancelada la autorizacion ("+id+") con fecha: '"+fecha+"' y motivo: '"+motivo+"'");
    console.log(this.consulta);
    //return alert("cerrada")
    return this.consulta;
    console.log("fin de Cancelar")
  }//end cerrarAutorizacion()

} //end class
