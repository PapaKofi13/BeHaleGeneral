import { UiService } from './../../services/ui.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  public adminKey;
  public announceData = [];
  public lastData;
  public editData;
  public editTitle;
  public editBody;
  public editType;
  public modalType = 'add';
  public annoForm: FormGroup;
  constructor(private funcService: FuncService, private uiService: UiService) { }

  ngOnInit(): void {
    this.adminKey = localStorage.getItem('bhAdminHash');
    this.annoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
    setTimeout(() => {
      this.getAnnouncements();
    }, 500);
  }

  public getAnnouncements() {
    this.announceData = [];
    this.funcService.getCountryAment(this.adminKey).subscribe(data => {
      data.docs.map(mdata => {
        this.announceData.push(mdata.data());
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    })
  }

  public getMoreCountryAment() {
    this.funcService.getMoreCountryAment(this.adminKey, this.lastData).subscribe(data => {
      data.docs.map(mdata => {
        this.announceData.push(mdata.data());
      });
      const arrlast = data.docs[data.docs.length - 1];
      this.lastData = arrlast;
    });
  }

  public addAnnouncement() {
    const adminType = localStorage.getItem('bhAdminType');
    if (adminType === 'admin') {
      this.funcService.addAnnounce(this.adminKey, this.annoForm.value.title, this.annoForm.value.type, this.annoForm.value.body);
    } else {
      this.uiService.showError(`You're not an Admin!`)
    }
  }

  public delAnnounce() {
    const adminType = localStorage.getItem('bhAdminType');
    if (adminType === 'admin') {
      this.funcService.deleteAnnounce(this.editData.annoKey);
    } else {
      this.uiService.showError(`You're not an Admin!`)
    }
  }

  public editAnnounce() {
    const adminType = localStorage.getItem('bhAdminType');
    if (adminType === 'admin') {
      this.funcService.editAnnounce(this.editData.annoKey, this.editTitle, this.editType, this.editBody);
    } else {
      this.uiService.showError(`You're not an Admin!`)
    }
  }

  public changeModal(type, data?) {
    this.modalType = type;
    this.editData = data;
    this.editType = data['type'];
    this.editTitle = data['title'];
    this.editBody = data['body'];
  }
}
