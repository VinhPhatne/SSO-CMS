import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import React from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import useAuth from '@hooks/useAuth';

const message = defineMessages({
    objectName: 'setting',
});
const SettingListPage = () => {
    const translate = useTranslate();
    const { isAdmin } = useAuth();
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.settings,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };
        },
    });
    const columns = [
        { title: translate.formatMessage(commonMessage.groupName), dataIndex: 'groupName' },
        { title: translate.formatMessage(commonMessage.description), dataIndex: 'description' },
        // { title: translate.formatMessage(commonMessage.isEditable), dataIndex: 'isEditable' },
        // { title: translate.formatMessage(commonMessage.isSystem), dataIndex: 'isSystem' },
        { title: translate.formatMessage(commonMessage.settingKey), dataIndex: 'settingKey' },
        { title: translate.formatMessage(commonMessage.settingValue), dataIndex: 'settingValue' },
        {
            title: translate.formatMessage(commonMessage.modifiedDate),
            dataIndex: 'modifiedDate',
            width: '180px',
        },
        {
            title: translate.formatMessage(commonMessage.createdDate),
            dataIndex: 'createdDate',
            width: '180px',
            // render: (createdDate) => convertUtcToTimezone(createdDate),
        },
        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'groupName',
            placeholder: translate.formatMessage(commonMessage.groupName),
        },
    ];

    return (
        <PageWrapper routes={[{ breadcrumbName: translate.formatMessage(commonMessage.listSetting) }]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default SettingListPage;
