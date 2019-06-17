import { EventEmitter } from "events";
import firebase from '../lib/firebase';
import AuthStore from "./AuthStore";
import { appId } from "../config";
import _slugify from 'slugify';

const slugify = str => _slugify(str, {
    replacement: '-',   // replace spaces with replacement
    remove: null,       // regex to remove characters
    lower: true         // result in lower case
});

class AppPagesStore extends EventEmitter {

    appPages;
    loading = true;

    constructor() {
        super();

        this.appPages = [];

        this.fetchPages();
    }

    handleSnapshot = querySnapshot => {
        const appPages = [];
        querySnapshot.forEach(doc => appPages.push(doc.data()));
        this.appPages = appPages;
        console.log(appPages);
        this.loading = false;
        this.emit('change');
    }

    getPages = appPages => {
        if (typeof appPages === 'object') {
            return Object.keys(appPages).map(id => ({ id, ...appPages[id] }));
        } else return [];
    }
    
    fetchPages = async () => {
        console.log(appId);
        await AuthStore.readyPromise;
        firebase.firestore().collection('appPages')
            .where('uid', '==', AuthStore.user.uid)
            .where('appKey', '==', appId)
            .onSnapshot(this.handleSnapshot);
        
    }

    createPageUrl = page => {
        if (page.isHomePage) return '/';
        else return '/pages/' + slugify(page.frontmatter.title);
    }
}

export default new AppPagesStore();
