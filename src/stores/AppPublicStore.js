import { EventEmitter } from "events";
import firebase from '../lib/firebase';
import AuthStore from "./AuthStore";

class AppPublicStore extends EventEmitter {

    appPublic = {
        authentication: false,
        authenticationMethods: {
            email: true,
            facebook: false,
            google: true,
            twitter: false
        },
        author: '',
        description: '',
        introductionPage: false,
        introductionPageColor: '',
        language: '',
        logoStorageRef: '',
        primaryThemeColor: '',
        secondaryThemeColor: '',
        title: '',
    }
    
    loading = true;

    constructor() {
        super();
        this.fetchPublicData();
    }

    fetchPublicData = async () => {
        await AuthStore.readyPromise;
        console.log(firebase.database().ref('/public'));
        firebase.database().ref('/public').on('value', this.handleValue);
    }

    handleValue = async snapshot => {
        const val = snapshot.val();
        console.log('val', val);
        if (val) this.appPublic = val;
        this.loading = false;
        this.emit('change');
    }

}

export default new AppPublicStore();
