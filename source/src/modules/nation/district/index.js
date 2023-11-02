import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import React, { useEffect, useState } from 'react';
import BaseTable from '@components/common/table/BaseTable';
import { AppConstants, categoryKind, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import useTranslate from '@hooks/useTranslate';
import { defineMessages, FormattedMessage } from 'react-intl';
import { commonMessage } from '@locales/intl';
import { nationKindOptions,statusOptions } from '@constants/masterData';
import { Button, Tag } from 'antd';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '@routes';
import { RightSquareOutlined } from '@ant-design/icons';

const message = defineMessages({
    objectName: 'Nation',
});

const DistrictListPage = () => {
    const translate = useTranslate();
    const { pathname: pagePath } = useLocation();
    const queryParameters = new URLSearchParams(window.location.search);
    const provinceId = queryParameters.get('provinceId');
    const provinceName = queryParameters.get('provinceName');

    const nationValues = translate.formatKeys(nationKindOptions, ['label']);
    const navigate = useNavigate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.nation,
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
            funcs.getList = () => {
                const params = mixinFuncs.prepareGetListParams(queryFilter);
                mixinFuncs.handleFetchList({ ...params, kind: 2,provinceId:null });
            };
            funcs.getCreateLink = () => {
                return `${pagePath}/create?provinceId=${provinceId}&provinceName=${provinceName}`;
            };
            funcs.getItemDetailLink = (dataRow) => {
                return `${pagePath}/${dataRow.id}?provinceId=${provinceId}&provinceName=${provinceName}`;
            };
            funcs.additionalActionColumnButtons = () => ({
                district: ({ id,name }) => (
                    <BaseTooltip title={translate.formatMessage(commonMessage.village)}>
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                    routes.districtListPage.path +
                                        `/village?provinceId=${provinceId}&provinceName=${provinceName}&districtId=${id}&districtName=${name}`,
                                );
                            }}
                        >
                            <RightSquareOutlined />
                        </Button>
                    </BaseTooltip>
                ),
            });
        },
    });


    const columns = [
        { title: <FormattedMessage defaultMessage="Name" />, dataIndex: 'name' },
        {
            title: <FormattedMessage defaultMessage="Post Code" />,
            width: 180,
            dataIndex: 'postCode',
        },
        {
            title: translate.formatMessage(commonMessage.nation),
            dataIndex: 'kind',
            align: 'center',
            width: 120,
            render(dataRow) {
                const kind = nationValues.find((item) => item.value == dataRow);
                return (
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{kind.label}</div>
                );
            },
        },
        mixinFuncs.renderActionColumn(
            {
                district:true,
                edit: true,
                delete: true,
            },
            { width: '130px' },
        ),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.name),
        },
        
    ];

    return (
        <PageWrapper
            routes={[
                { breadcrumbName: translate.formatMessage(commonMessage.nation),path: routes.nationListPage.path },
                { breadcrumbName: translate.formatMessage(commonMessage.district) }]}
        >
            <ListPage
                title={
                    <span style={{ fontWeight: 'normal', fontSize: '16px' }}>{provinceName}</span>
                }
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default DistrictListPage;
