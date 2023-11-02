import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserAdminForm from './SettingForm';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import useFetch from '@hooks/useFetch';
import routes from '@routes';

const message = defineMessages({
    objectName: 'setting',
});

const SettingSavePage = () => {
    const translate = useTranslate();
    const { id } = useParams();
    const { data } = useFetch(apiConfig.settings.getSettingsList, {
        immediate: true,
        mappingData: (res) => res.data?.content?.map((item) => ({ value: item.id, label: item.name })),
        params: {},
    });
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.settings.getById,
            create: apiConfig.settings.create,
            update: apiConfig.settings.update,
        },
        options: {
            getListUrl: routes.listSettingsPage.path,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    isEditable: 0,
                    isSystem: 0,
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
        },
    });

    return (
        <PageWrapper
            loading={loading}
            routes={[
                {
                    breadcrumbName: translate.formatMessage(commonMessage.listSetting),
                    path: routes.listSettingsPage.path,
                },
                { breadcrumbName: title },
            ]}
        >
            <UserAdminForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                groups={data || []}
            />
        </PageWrapper>
    );
};

export default SettingSavePage;
