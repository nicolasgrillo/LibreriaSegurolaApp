import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Libreria Segurola"
  services = [
    {"name":"Libros",
     "description":"En la sección Libros, usted podrá acceder al inventario disponible en todo momento."},
     {"name":"Insumos",
     "description":"Tenemos insumos a su disposición en todo momento y para todo tipo: Artísticos, Escolares, Integrales, Oficinísticos. Puede consultar a través de nuestros canales de contacto, especificados en la página de contacto."},
     {"name":"Impresiones",
      "description":"Atendemos de forma personalizada sus pedidos de impresión, para que pueda retirarlos sin espera. Enviénos un email con su contenido y comentarios, a cualquiera de las direcciones especificadas en la página de contacto."},
     {"name":"Fotocopias",
      "description":"Tomamos trabajos de fotocopias. Si desea puede ponerse en contacto y preguntar por el progreso del trabajo, a través de nuestros puntos de contacto."}
    ]

  constructor() { }

  ngOnInit() {
  }
}
