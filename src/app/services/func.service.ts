import { UiService } from './ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
    providedIn: 'root'
})
export class FuncService {
    public apiUrl = 'https://coronavirus-19-api.herokuapp.com/';
    public dateAPI = "http://worldtimeapi.org/api/ip";
    public createdAt = firebase.firestore.Timestamp.now().seconds;
    constructor(private firestore: AngularFirestore, private uiService: UiService, private http: HttpClient,
        private storage: AngularFireStorage) { }

    public getVAll() {
        return this.http.get(`${this.apiUrl}all`);
    }
    public getDate() {
        return this.http.get(`${this.dateAPI}`);
    }

    public getVAllByCountries() {
        return this.http.get(`${this.apiUrl}countries`);
    }

    public getCatlimitFeeds() {
        return this.firestore.collection('mainfeeds', ref => ref.limit(10).orderBy('createdAt', 'desc')).get();
    }

    public getMoreCatFeeds(lastFeed) {
        return this.firestore.collection('mainfeeds', ref => ref.limit(10).orderBy('createdAt', 'desc').startAfter(lastFeed)).get();
    }

    public getMoreCountryAment(key, lastAnno) {
        return this.firestore.collection('announcement', ref => ref.where('ownerKey', '==', `${key}`).limit(50).orderBy('createdAt', 'desc').startAfter(lastAnno)).get();
    }

    public getCountryAment(key) {
        return this.firestore.collection('announcement', ref => ref.where('ownerKey', '==', `${key}`).limit(50).orderBy('createdAt', 'desc')).get();
    }

    public addAnnounce(key, title, type, body) {
        this.uiService.showLoader();
        const annoData = {
            ownerKey: key,
            title: title,
            type: type,
            body: body,
            createdAt: this.createdAt
        }

        return this.firestore.collection('behaleadmin').doc(`${key}`).get().toPromise().then((data) => {
            const gotData = data.data()['country'];
            annoData['country'] = gotData;
            this.firestore.collection('announcement').add(annoData).then((res) => {
                this.firestore.collection('announcement').doc(res.id).update({
                    annoKey: res.id
                });
                this.uiService.hideLoader();
                this.uiService.showSuccess('Announcement Broadcasted');
            }).catch(err => {
                this.uiService.hideLoader();
                this.uiService.showError(err.message);
            })
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public deleteAnnounce(key) {
        this.uiService.showLoader();
        return this.firestore.collection('announcement').doc(key).delete().then(() => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Announcement Deleted');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public editAnnounce(key, title, type, body) {
        this.uiService.showLoader();
        const annoData = {
            title: title,
            type: type,
            body: body,
        }
        return this.firestore.collection('announcement').doc(key).update(annoData).then(() => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Announcement Edited');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public getAdminProfile(key) {
        return this.firestore.collection('behaleadmin').doc(key).valueChanges();
    }

    public editAdminProfile(key, data) {
        this.uiService.showLoader();
        return this.firestore.collection('behaleadmin').doc(key).update(data).then((res) => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Profile Updated');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public editToll(key, data) {
        this.uiService.showLoader();
        return this.firestore.collection('behaleadmin').doc(key).update(data).then((res) => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Toll Information Updated');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public updateImage(key, file) {
        this.uiService.showLoader();
        return this.storage.ref(`behaleadminprofile/${key}`).put(file).then((data) => {
            data.ref.getDownloadURL().then((res) => {
                this.firestore.collection('behaleadmin').doc(key).update({
                    photourl: res
                });
                this.uiService.hideLoader();
                this.uiService.showSuccess('Profile Image Updated');
            });
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public getReports() {
        let adminCountry = localStorage.getItem('bhAdminCountry');
        return this.firestore.collection('reports', ref => ref.where('country', '==', `${adminCountry}`).orderBy('createdAt', 'desc').limit(30)).get();
    }

    public getMoreReports(lastReport) {
        let adminCountry = localStorage.getItem('bhAdminCountry');
        return this.firestore.collection('reports', ref => ref.where('country', '==', `${adminCountry}`).orderBy('createdAt', 'desc').limit(30).startAfter(lastReport)).get();
    }

    public changeReportStatus(key, status) {
        this.uiService.showLoader();
        return this.firestore.collection('reports').doc(`${key}`).update({
            status: status
        }).then(() => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Report Updated');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showWarning(err.message);
        })
    }

    public getUserTrace(key) {
        return this.firestore.collection('behaleusers').doc(`${key}`).get();
    }

    public searchUser(email) {
        this.uiService.showLoader();
        let adminCountry = localStorage.getItem('bhAdminCountry');
        return this.firestore.collection('behaleusers', ref => ref.where('email', '==', `${email}`).where('country', '==', `${adminCountry}`)).get();
    }
}
