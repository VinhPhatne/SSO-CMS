import apiConfig from '@constants/apiConfig';
import UserAdminListPage from '.';
import UserAdminSavePage from './UserAdminSavePage';
import { commonMessage } from '@locales/intl';
const paths = {
    adminsListPage: '/admins',
    adminsSavePage: '/admins/:id',
    adminsLeaderListPage: '/admins-leader',
    adminsLeaderSavePage: '/admins-leader/:id',
};
export default {
    adminsListPage: {
        path: paths.adminsListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.user.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.admins,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.userAdmin) }];
            },
        },
    },
    adminsSavePage: {
        path: paths.adminsSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.admins,
            listPageUrl: paths.adminsListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.userAdmin), path: paths.adminsListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },

    ///LEADER

    adminsLeaderListPage: {
        path: paths.adminsLeaderListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.user.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.adminsLeader,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.userAdminLeader) }];
            },
        },
    },
    adminsLeaderSavePage: {
        path: paths.adminsLeaderSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.adminsLeader,
            listPageUrl: paths.adminsLeaderListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.userAdminLeader), path: paths.adminsLeaderListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
