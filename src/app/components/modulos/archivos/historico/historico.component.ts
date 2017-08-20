import { Component, OnInit } from '@angular/core';
import { Navlink as Link } from 'app/models/navlink';
import { app } from '../../../../../environments/environment';
import { AppComponent } from 'app/app.component';
import { Helper } from 'app/helpers/helper';

import { Archivo, Usuario, Aprobacion } from 'app/models/index';
import { ArchivoService } from 'app/services/modulos/archivos/archivo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  public archivos: Archivo[] = [];
  public archivo: Archivo = new Archivo();
  public app = app;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _helper: Helper,
    private _appComponent: AppComponent,
    private _archivoService: ArchivoService,
  ) { }

  ngOnInit() {
    this.getArchivo();
    this.getArchivos();
  }
  setLinks() {
    const links: Link[] = [
      { url: '', title: 'Gestión Documental', active: true },
      { url: '/archivos', title: 'Documentos', active: false },
      { url: '', title: 'Histórico de ' + this.archivo.denominacion, active: true },
    ];
    this._appComponent.setLinks(links);
  }
  getArchivo() {
    let _archivoid: string;
    this._activatedRoute.params.forEach((params: Params) => {
      _archivoid = params['archivoid'];
    });

    if (_archivoid !== '') {
      this._archivoService.get(_archivoid)
        .subscribe(
        archivo => {
          this.archivo = archivo[0];
          this.setLinks();
        }
        );
    } else {
      this._helper.goBack();
    }
  }
  getArchivos() {
    let _archivoid: string;
    this._activatedRoute.params.forEach((params: Params) => {
      _archivoid = params['archivoid'];
    });
    this.archivos = [];
    this._archivoService.getObsoletos(_archivoid)
      .subscribe(
      list => {
        // list.forEach(archivo => {
        //   if ((archivo.archivoidaux === this.archivo.archivoid)
        //     && archivo.archivoid !== this.archivo.archivoid && archivo.archivoidaux !== '') {
        //     // console.log(archivo.archivoid);

        //     this.archivos.push(archivo);
        //   }
        // });
        this.archivos = list;
        // console.log(this.archivos);
      }
      );
  }
}
