import { UiService } from './ui.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminuser;
  // tslint:disable-next-line:max-line-length
  constructor(
    public afauth: AngularFireAuth,
    public afs: AngularFirestore,
    public rt: Router,
    public toastS: ToastService,
    private uiService: UiService
  ) { }
  public login(loginData) {
    this.uiService.showLoader();
    return this.afauth.auth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        console.log('logged');
        
        const adminuid = res.user.uid;
        this.authEmailCheck(loginData.email, adminuid);
      })
      .catch(err => {
        console.log('not not');
        
        this.uiService.hideLoader();
        this.toastS.mainError(err.message);
      });
  }
  public logout() {
    return this.afauth.auth.signOut().then(() => {
      this.rt.navigate(['login']);
      window.location.reload();
    });
  }
  get authState(): any {
    return this.afauth.authState;
  }
  get adminAuthUser(): any {
    return this.afauth.auth.currentUser;
  }

  public authEmailCheck(email, adm) {
    firebase
      .firestore()
      .collection('behaleadmin')
      .where('email', '==', `${email}`)
      .get()
      .then(res => {
        console.log('not not');
        if (res.empty === true) {
          return this.afauth.auth.signOut().then(() => {
            setTimeout(() => {
              this.toastS.mainError(`Cannot Login. Admins Only`);
              this.uiService.hideLoader();
            }, 1000);
          });
        } else {
          console.log('logged');
          this.rt.navigate(['dashboard']).then(() => {
            this.afs
              .collection('behaleadmin')
              .doc(`${adm}`)
              .valueChanges()
              .subscribe(data => {
                this.toastS.mainSuccess(`Welcome Admin`);
              });
            this.uiService.hideLoader();
          });
        }
      });
  }
}