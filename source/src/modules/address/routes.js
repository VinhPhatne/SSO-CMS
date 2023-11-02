import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import AddressListPage from '.';
import AddressSavePage from './AddressSavePage';
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
                return [{ breadcrumbName: t.formatMessage(messages.address) }];
            },
        },
    },
    addressSavePage: {
        path: paths.addressSavePage,
        component: AddressSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.address.create.baseURL, apiConfig.address.update.baseURL],
        pageOptions: {
            objectName: commonMessage.address,
            listPageUrl: paths.addressListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(commonMessage.address), path: paths.addressListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
