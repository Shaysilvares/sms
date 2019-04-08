import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //public telefone: Array<string> = [];
  public telefone: string;
  public mensagem: string;
  public formulario: FormGroup;
  public toast: any;

  constructor(
    public navCtrl: NavController, 
    public sms: SMS, 
    public androidPermissions: AndroidPermissions,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {

      this.formulario = this.formBuilder.group({
        telefone: ['', Validators.required],
        mensagem: ['', Validators.required]
      })

  }


  enviarSMS() {    
    let options: {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    }
    
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      
      let telArray = this.telefone.split(",");

      telArray.forEach(tel => {
        this.sms.send(tel, this.mensagem, options).then(() => {
          console.log("enviou");          
          this.toast = this.toastCtrl.create({
            message: 'Seu SMS foi enviado com sucesso!',
            duration: 6000,
            position: "bottom"
          });
          this.toast.present();
          }).catch((error) => {
            console.log(JSON.stringify(error));
            this.toast = this.toastCtrl.create({
              message: 'Erro ao enviar o SMS',
              duration: 6000,
              position: "bottom"
            });
            this.toast.present();
        });
      });

    }).catch((err)=> {
      console.log(err);
    });

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS));
  } 
}
