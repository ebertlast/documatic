import { Component, OnInit } from '@angular/core';
// import { AutenticacionService } from 'app/services/seguridad/autenticacion.service';
import { Usuario } from 'app/models/usuario';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from 'app/services/seguridad/usuarios.service';
import { Helper } from 'app/helpers/helper';
import { app } from '../../../../../environments/environment';
@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.css']
})
export class UsuarioViewComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public clave = '';
  public reclave = '';
  constructor(
    // private _autenticacionService:AutenticacionService,
    private _activatedRoute: ActivatedRoute,
    private _usuariosService: UsuariosService,
    private _helper: Helper
  ) {

    // this.usuario=this._autenticacionService.usuario;

  }

  ngOnInit() {
    this.getUsuario();
  }

  private getUsuario() {
    let _usuario: string;
    this._activatedRoute.params.forEach((params: Params) => {
      _usuario = params['usuario'];
    });
    if (_usuario !== '') {
      this._usuariosService.getUsuario(_usuario)
        .subscribe(
        usuario => {
          this.usuario = usuario;

          this.usuario.firma = app.apiurl + '/' + this.usuario.firma;
          if (parseInt(this.usuario.activo.toString()) === 1) {
          } else {
          }
          if (parseInt(this.usuario.masculino.toString()) === 1) {
          } else {
          }
          const yyyy = (this.usuario.fechanacimiento.toString().substr(0, 4));
          const mm = (this.usuario.fechanacimiento.toString().substr(5, 2));
          const dd = (this.usuario.fechanacimiento.toString().substr(8, 2));

          // $("input[name='fechanacimiento']").val(dd+'/'+mm+'/'+yyyy);

        }
        );
    }
  }

  fileChangeEvent(filesInput: any) {
    const files = filesInput.srcElement.files;
    if (files.length <= 0) {
      return;
    }

    const postData = { usuario: this.usuario.usuario }; // Put your form data variable. This is only example.
    this._usuariosService.uploadFirma(postData, files).then(nombre => {
      console.log('nombre:');

      console.log(nombre['filename']);
      this.usuario.firma = 'uploads/firmas/' + nombre['filename'];

      this._usuariosService.setFirma(this.usuario)
        .subscribe(
        actualizado => {
          // console.log(actualizado);
          if (actualizado) {
            // this._router.navigate(['/usuarios']);
            this._helper.notificationToast('Firma actualizada', 'Usuarios');
            this.usuario.firma = app.apiurl + '/' + this.usuario.firma;
          }
        }
        );

      // this.model.nombre=nombre.toString();
    });
  }

  public actualizarClave() {
    if (this.clave !== this.reclave || this.clave === '') {
      document.getElementById('clave').focus();
      return false;
    } else {
      this._usuariosService.cambiarClave(this.clave).subscribe(success => {
        // console.log(success);
        if (success.success === true) {
          this._helper.notificationToast('Clave de acceso actualizada', 'Usuarios');
        } else {
          this._helper.notificationToast('Ha ocurrido un problema para actualizar tu clave de acceso, ¡vuelve a intentarlo!'
            , 'Usuarios', 'error');
        }
      });
    }

    return false;
  }
}
