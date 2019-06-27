import app from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { deviceReady, parseQuery } from './util';
import { appId, adminId } from '../config';

// Initialize Firebase
// Your web app's Firebase configuration
export const config = {
    apiKey: "AIzaSyCaS8dXhdbJcUcYQIdyIyXdNZYCWkzpxrk",
    authDomain: "dynamic-template-app.firebaseapp.com",
    databaseURL: "https://dynamic-template-app.firebaseio.com",
    projectId: "dynamic-template-app",
    storageBucket: "dynamic-template-app.appspot.com",
    messagingSenderId: "420758845304",
    appId: "1:420758845304:web:394c65df279b8c73"
};

console.log(appId, adminId);

const ready = async self => {
    await app.auth().setPersistence(app.auth.Auth.Persistence.LOCAL)
    await deviceReady;
    return self;
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth;
        this.database = () => ({ ref: path => app.database().ref(`/users/${adminId}/apps/${appId}${path}`) })
        this.firestore = app.firestore;
        this.storage = app.storage;
        this.ready = ready(this);

        console.log(this.database())
    }
}

export default new Firebase();