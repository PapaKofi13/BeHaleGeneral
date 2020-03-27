import { UiService } from './ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
    providedIn: 'root'
})
export class FuncService {

    public createdAt = firebase.firestore.Timestamp.now().seconds;
    constructor(private firestore: AngularFirestore, private uiService: UiService) { }

    public addNewFeed(data, type) {
        this.uiService.showLoader();
        let newData = data;
        newData['createdAt'] = this.createdAt;
        newData['type'] = type;

        return this.firestore.collection('mainfeeds').add(newData).then((res) => {
            this.firestore.collection('mainfeeds').doc(res.id).update({
                feedKey: res.id
            });
            this.uiService.showSuccess('Feed Added Successfully');
            this.uiService.hideLoader();
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        });
    }

    public getNewsFeed(type) {
        return this.firestore.collection('mainfeeds', ref => ref.where('type', '==', type).orderBy('createdAt', 'desc')).valueChanges();
    }
    public deleteNewsFeed(key) {
        return this.firestore.collection('mainfeeds').doc(key).delete().then(() => {
            this.uiService.showSuccess('Feed Deleted Successfully');
        }).catch(err => {
            this.uiService.showError(err.message);
        })
    }
}
