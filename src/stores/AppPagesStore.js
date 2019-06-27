import { EventEmitter } from "events";
import firebase from '../lib/firebase';
import AuthStore from "./AuthStore";
import _slugify from 'slugify';
import * as ROUTES from '../constants/routes';
import { adminId, appId, device, platform } from '../config';

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

        this.init();
    }

    init = async () => {
        console.log(appId);
        await AuthStore.readyPromise;
        console.log(AuthStore);

        this.fetchPages();
    }



    handleSnapshot = querySnapshot => {
        const appPages = [];
        querySnapshot.forEach(doc => appPages.push(doc.data()));
        this.appPages = appPages
            .sort((a,b) => (b.frontmatter.title - a.frontmatter.title) || 0)
            .sort((a,b) => (b.frontmatter.layout === 'home' ? 1 : 0) - (a.frontmatter.layout === 'home' ? 1 : 0))
            .sort((a,b) => (b.frontmatter.weight - a.frontmatter.weight) || 0);
        this.loading = false;
        this.emit('change');
        console.log('HANDLE SNAPSHOT', appPages);
    }

    getPages = appPages => {
        if (typeof appPages === 'object') {
            return Object.keys(appPages).map(id => ({ id, ...appPages[id] }));
        } else return [];
    }

    fetchPages = async () => {
        firebase.firestore().collection('appPages')
            .where('uid', '==', adminId)
            .where('appKey', '==', appId)
            .onSnapshot(this.handleSnapshot);
    }

    createPageUrl = page => {
        let path;
        if (page.frontmatter.layout === 'home') path = ROUTES.HOME;
        else path = ROUTES.APP_PAGE.replace(':titleSlug', slugify(page.frontmatter.title));

        return path
            .replace(':adminId', adminId)
            .replace(':appId', appId)
            .replace(':device', device)
            .replace(':platform', platform);
    }
}

export default new AppPagesStore();
