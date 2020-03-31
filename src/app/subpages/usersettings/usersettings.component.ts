import { AuthService } from './../../services/auth.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss']
})
export class UsersettingsComponent implements OnInit {
  public adminKey;
  public imageSrc;
  public adminData = {
    about: '',
    address: '',
    country: '',
    email: '',
    fb: '',
    ig: '',
    lin: '',
    name: '',
    photourl: '',
    pubb: '',
    tollone: '',
    tollthree: '',
    tolltwo: '',
    tw: '',
    website: '',
  }
  imgFile: any;
  constructor(private funcService: FuncService, private authService: AuthService) { }

  ngOnInit(): void {
    this.adminKey = localStorage.getItem('bhAdminHash');
    setTimeout(() => {
      this.getMainProfile();
    }, 500);
  }

  public getMainProfile() {
    this.funcService.getAdminProfile(this.adminKey).subscribe(data => {
      this.adminData = {
        about: data['about'],
        address: data['address'],
        country: data['country'],
        email: data['email'],
        fb: data['fb'],
        ig: data['ig'],
        lin: data['lin'],
        name: data['name'],
        photourl: data['photourl'],
        pubb: data['pubb'],
        tollone: data['tollone'],
        tollthree: data['tollthree'],
        tolltwo: data['tolltwo'],
        tw: data['tw'],
        website: data['website'],
      }
    })
  }

  public updateToll() {
    this.funcService.editToll(this.adminKey, this.adminData)
  }

  public updateProfile() {
    this.funcService.editAdminProfile(this.adminKey, this.adminData)
  }

  public sendReset() {
    this.authService.resetPassword(this.adminData['email']);
  }

  public onFileSelected(ev) {
    const reader = new FileReader();
    if(ev.target.files && ev.target.files.length) {
      const [file] = ev.target.files;
      this.imgFile = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  public profileUpload() {
    this.funcService.updateImage(this.adminKey, this.imgFile);
  }
}
