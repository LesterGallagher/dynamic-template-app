import * as ROUTES from './routes'

export const APP_SPLITTER_ROUTES = [
    {
        icon: 'md-mail-send',
        route: ROUTES.NEW_ROUTE,
        text: 'Pagina 1'
    },
    {
        icon: 'md-assignment-check',
        route: ROUTES.ROUTES_LIST,
        text: 'Pagina 2'
    },
    {   
        icon: 'md-accounts-alt',
        route: ROUTES.FIND_COURIER,
        text: 'Pagina 3',
    },
    {
        icon: 'md-card-travel',
        route: ROUTES.MY_DELIVERIES,
        text: 'Pagina 4'
    },
    {
        icon: 'md-case',
        route: ROUTES.MY_ROUTE_ORDERS,
        text: 'Pagina 5',
    },
    {
        route: ROUTES.PERSONAL_CHATS_OVERVIEW,
        text: 'Mijn Berichten',
        icon: 'md-comment-text'
    },
    {
        icon: 'md-account-o',
        text: 'Account',
        route: ROUTES.ACCOUNT
    },
    {
        icon: 'md-account',
        route: ROUTES.PERSONAL_PROFILE,
        text: 'Profiel'
    },
    {
        icon: 'md-settings',
        route: ROUTES.SETTINGS,
        text: 'Instellingen'
    },
    {
        icon: 'md-info',
        route: ROUTES.ABOUT,
        text: 'Over'
    }
];