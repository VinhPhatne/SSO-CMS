import { Card, Col, Form, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import useTranslate from '@hooks/useTranslate';
import { nationKindOptions,statusOptions } from '@constants/masterData';
import { FormattedMessage } from 'react-intl';
import { BaseForm } from '@components/common/form/BaseForm';

const DistrictForm = ({ formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing }) => {
    const translate = useTranslate();

    const queryParameters = new URLSearchParams(window.location.search);
    const parentId = queryParameters.get('parentId');
    const nationValues = translate.formatKeys(nationKindOptions, ['label']);
    const statusValues = translate.formatKeys(statusOptions, ['label']);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });


    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({
            ...values,
            parentId: parentId,
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            kind: 2,
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
        <BaseForm id={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className="card-form" bordered={false}>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextField required label={<FormattedMessage defaultMessage="Name" />} name="name" />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            required
                            disabled={true}
                            label={<FormattedMessage defaultMessage="Kind" />}
                            name="kind"
                            options={nationValues}
                        />
                    </Col>
                </Row>
                {/* <Row gutter={10}>
                    
                    <Col span={12}>
                        <TextField required label={<FormattedMessage defaultMessage="Paren" />} name="parent" />
                    </Col>
                </Row> */}
                <Row gutter={10}>
                    <Col span={12}>
                        <TextField
                            required
                            label={<FormattedMessage defaultMessage="PostCode" />}
                            name="postCode"
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            required
                            label={<FormattedMessage defaultMessage="Status" />}
                            name="status"
                            options={statusValues}
                        />
                    </Col>
                </Row>
                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default DistrictForm;
