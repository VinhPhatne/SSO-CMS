import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { BaseForm } from '@components/common/form/BaseForm';
import SelectField from '@components/common/form/SelectField';
import { formSize, statusOptions } from '@constants/masterData';

const message = defineMessages({
    objectName: 'setting',
});

const SettingForm = (props) => {
    const translate = useTranslate();
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, isEditing, size = 'small' } = props;
    const statusValues = translate.formatKeys(statusOptions, ['label']);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
    }, [dataDetail]);
    useEffect(() => {
        if (!isEditing) {
            form.setFieldsValue({
                status: statusValues[0].value,
            });
        }
    }, [isEditing]);
    return (
        <BaseForm
            id={formId}
            onFinish={handleSubmit}
            form={form}
            onValuesChange={onValuesChange}
            style={{ width: formSize[size] ?? size }}
        >
            <Card className="card-form" bordered={false}>
                <Row>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.settingValue)}
                            required
                            name="settingValue"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.description)}
                            type="textarea"
                            name="description"
                        />
                    </Col>
                </Row>

                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default SettingForm;
