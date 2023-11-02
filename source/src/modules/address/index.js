import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import BaseTable from '@components/common/table/BaseTable';

import { UserOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import AvatarField from '@components/common/form/AvatarField';
import { commonMessage } from '@locales/intl';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import { FieldTypes } from '@constants/formConfig';

const AddressListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.address,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(pageOptions.objectName),
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
        {
            title: translate.formatMessage(commonMessage.address),
            dataIndex: 'address',
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.province),
            dataIndex: ['provinceInfo', 'name'],
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.district),
            dataIndex: ['districtInfo', 'name'],
            width: '200px',
        },
        {
            title: translate.formatMessage(commonMessage.ward),
            dataIndex: ['wardInfo', 'name'],
            width: '200px',
        },

        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];
    const { data: nationData } = useFetch(apiConfig.nation.autocomplete, {
        immediate: true,
        mappingData: ({ data }) =>
            data.content.map((item) => ({
                kind: item.kind,
                value: item.id,
                label: item.name,
            })),
    });
    useEffect(() => {
        let listProvince = [];
        let listDistrict = [];
        let listWard = [];
        if (nationData) {
            nationData.map((nation) => {
                if (nation?.kind == 1) {
                    listProvince.push(nation);
                } else if (nation?.kind == 2) {
                    listDistrict.push(nation);
                } else {
                    listWard.push(nation);
                }
            });
            setProvinceOptions(listProvince);
            setDistrictOptions(listDistrict);
            setWardOptions(listWard);
        }
    }, [nationData]);
    const searchFields = [
        {
            key: 'provinceId',
            type: FieldTypes.SELECT,
            placeholder: translate.formatMessage(commonMessage.province),
            options: provinceOptions,
        },
        {
            key: 'districtId',
            type: FieldTypes.SELECT,
            placeholder: translate.formatMessage(commonMessage.district),
            options: districtOptions,
        },
        {
            key: 'wardId',
            type: FieldTypes.SELECT,
            placeholder: translate.formatMessage(commonMessage.ward),
            options: wardOptions,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
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

export default AddressListPage;
