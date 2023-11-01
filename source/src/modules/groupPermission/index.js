import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import React, { useEffect } from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { DEFAULT_TABLE_ITEM_SIZE, UserTypes, groupPermissionKindsOptions, storageKeys } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { FieldTypes } from '@constants/formConfig';
import useQueryParams from '@hooks/useQueryParams';
import { getData } from '@utils/localStorage';

const GroupPermissionListPage = () => {
    const { setQueryParams } = useQueryParams();
    const useKind = getData(storageKeys.USER_KIND) || UserTypes.ADMIN;
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.groupPermission,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'role',
        },
        override: (funcs) => {
            funcs.getList = () => {
                const params = mixinFuncs.prepareGetListParams(queryFilter);
                mixinFuncs.handleFetchList({ kind: useKind, ...params });
            };

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
        { title: 'Name', dataIndex: 'name' },
        { title: 'Description', dataIndex: 'description' },
        mixinFuncs.renderActionColumn({ edit: true }, { width: '100px' }),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: 'Name',
        },
        {
            key: 'kind',
            type: FieldTypes.SELECT,
            options: groupPermissionKindsOptions,
            placeholder: 'Kind',
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={[{ breadcrumbName: 'Role' }]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    initialValues: { kind: useKind, ...queryFilter },
                })}
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

export default GroupPermissionListPage;
