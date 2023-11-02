import apiConfig from '@constants/apiConfig';
import UserListPage from '.';
import { commonMessage } from '@locales/intl';
import UserSavePage from './UserSavePage';

const paths = {
    adminsListPage: '/admins',
    adminsSavePage: '/admins/:id',
    adminsLeaderListPage: '/admins-leader',
    adminsLeaderSavePage: '/admins-leader/:id',
    userListPage: '/user',
    userSavePage: '/user/:id',
};
export default {

    userListPage: {
        path: paths.userListPage,
        auth: true,
        component: UserListPage,
        permission: [apiConfig.user.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.user,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.user) }];
            },
        },
    },
    userSavePage: {
        path: paths.userSavePage,
        component: UserSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.user,
            listPageUrl: paths.userListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.user), path: paths.userListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
