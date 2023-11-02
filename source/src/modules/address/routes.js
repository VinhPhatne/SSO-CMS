import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import AddressListPage from '.';
const paths = {
    addressListPage: '/address',
    addressSavePage: '/address/:id',
};
export default {
    addressListPage: {
        path: paths.addressListPage,
        auth: true,
        component: AddressListPage,
        permission: [apiConfig.address.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.address,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.userAdmin) }];
            },
        },
    },
    addressSavePage: {
        path: paths.addressSavePage,
        // component: AddressSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.address,
            listPageUrl: paths.addressListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.userAdmin), path: paths.addressListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
