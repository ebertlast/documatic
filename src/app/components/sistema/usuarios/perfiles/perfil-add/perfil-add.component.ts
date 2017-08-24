import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import { Helper } from '../../../../../helpers/helper';
import { Navlink } from '../../../../../models/navlink';
import { Perfil } from '../../../../../models/perfil';
import { PerfilesService } from '../../../../../services/seguridad/perfiles.service';
import { environment } from '../../../../../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-perfil-add',
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.css']
})
export class PerfilAddComponent implements OnInit {
  public perfil: Perfil = new Perfil();
  constructor(
    private _appComponent: AppComponent,
    private _perfilesService: PerfilesService,
    private _activatedRoute: ActivatedRoute,
    private _helper: Helper,
    private _router: Router
  ) { }

  ngOnInit() {
    $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
    });
    this.refrescarNavegacion();
  }

  public refrescarNavegacion() {
    // this._appComponent.setTitle('Editando Perfil '+this.perfil.denominacion);
    const links: Navlink[] = [
      { url: 'usuarios', title: 'Usuarios', active: false },
      { url: 'perfiles', title: 'Perfiles', active: false },
      // { url: 'perfil/' + this.perfil.perfilid, title: 'Perfil ' + this.perfil.denominacion, active: false },
      { url: '', title: 'Nuevo Perfil', active: true }
    ];
    this._appComponent.setLinks(links);
  }
  public getActivo() {
    return this._helper.getCheckedRadio('i-checks-activo');
  }
  public onSubmit() {
    this.perfil.activo = this.getActivo();
    console.log(this.perfil);
    if (this.perfil.perfilid.trim() === '' || this.perfil.denominacion.trim() === '') {
      this._helper.notificationToast('Datos Incompletos', 'Perfiles', 'error');
      return false;
    } else {
      this._perfilesService.addPerfil(this.perfil)
        .subscribe(success => {
          if (success) {
            window.history.back();
          }
        });
    }
    return false;
  }
}
