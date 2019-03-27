import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public telefone: Array<string> = ["21982828022", "21969982508"];
  public mensagem: string;

  constructor(public navCtrl: NavController, public sms: SMS, public androidPermissions: AndroidPermissions) {

  }


  enviarSMS() {
    let options: {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    }

    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      console.log(typeof this.telefone);
      this.sms.send(this.telefone, this.mensagem, options).then(() => {
        console.log("enviou");
        }).catch((error) => {
          console.log(JSON.stringify(error));
      });
    }).catch((err)=> {
      console.log(err);
    });

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS));
  } 
}
