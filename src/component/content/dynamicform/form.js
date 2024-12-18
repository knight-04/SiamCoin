import React, { useState } from 'react';
import {
  Layout, Steps, Button, Form, Input,
  DatePicker, message, Card, Descriptions, Upload, Select,
  Radio, Checkbox, Switch, Slider, Rate, ColorPicker, InputNumber,
  Cascader, TreeSelect, TimePicker, Mentions, Transfer, notification, Typography
} from 'antd';
import stepFormData from './step_form.js';
import { PaperClipOutlined, UploadOutlined, CheckCircleFilled } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea.js';

const { Content } = Layout;
const { Title, Text } = Typography;

const DynamicForm = ({ isMobile }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [allFormData, setAllFormData] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  const allSteps = [
    ...stepFormData.steps,
    {
      stepId: 'summary',
      stepName: 'สรุปข้อมูล',
      stepDescription: 'ตรวจสอบข้อมูลของคุณ',
    }
  ];

  const items = allSteps.map((step) => ({
    key: step.stepId,
    title: step.stepName,
  }));

  const next = async () => {
    try {
      const values = await form.validateFields();
      setAllFormData({
        ...allFormData,
        [allSteps[current].stepId]: values
      });
      setCurrent(current + 1);
      form.resetFields();
    } catch (error) {
      console.log('Form validation failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const renderFormItem = (formField) => {
    switch (formField.type) {
      case 'text':
        return <Input style={{ width: !isMobile ? '500px' : '100%' }} placeholder={`กรุณากรอก${formField.field}`} />;

      case 'select':
        return (
          <Select
            style={{ width: !isMobile ? '500px' : '100%' }}
            placeholder={`เลือก${formField.field}`}
            options={formField.options || []}
          />
        );

      case 'textarea':
        return (
          <TextArea
            rows={4}
            placeholder={`กรุณากรอก${formField.field}`}
            maxLength={formField.maxLength}
          />
        );

      case 'date':
        return <DatePicker style={{ width: !isMobile ? '500px' : '100%' }} />;

      case 'dateRange':
        return <DatePicker.RangePicker style={{ width: !isMobile ? '500px' : '100%' }} />;

      case 'radio':
        return (
          <Radio.Group>
            {(formField.options || []).map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'checkbox':
        return (
          <Checkbox.Group>
            {(formField.options || []).map(option => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case 'switch':
        return <Switch checkedChildren={formField.checkedLabel} unCheckedChildren={formField.uncheckedLabel} />;

      case 'slider':
        return (
          <Slider
            range={formField.range}
            min={formField.min}
            max={formField.max}
            marks={formField.marks}
          />
        );

      case 'rate':
        return <Rate allowHalf defaultValue={formField.defaultValue || 0} />;

      case 'colorPicker':
        return <ColorPicker />;

      case 'number':
        return (
          <InputNumber
            style={{ width: !isMobile ? '500px' : '100%' }}
            min={formField.min}
            max={formField.max}
            step={formField.step}
            placeholder={`กรุณากรอก${formField.field}`}
          />
        );

      case 'cascader':
        return (
          <Cascader
            options={formField.options || []}
            style={{ width: !isMobile ? '500px' : '100%' }}
            placeholder={`เลือก${formField.field}`}
          />
        );

      case 'treeSelect':
        return (
          <TreeSelect
            treeData={formField.treeData || []}
            style={{ width: !isMobile ? '500px' : '100%' }}
            placeholder={`เลือก${formField.field}`}
            multiple={formField.multiple}
            treeCheckable={formField.treeCheckable}
          />
        );

      case 'file':
        return (
          <Upload
            accept={formField.accept || ".pdf,.doc,.docx,.jpg,.jpeg,.png"}
            beforeUpload={(file) => {
              const isLt5M = file.size / 1024 / 1024 < (formField.maxSize || 5);
              if (!isLt5M) {
                message.error(`ไฟล์ต้องมีขนาดไม่เกิน ${formField.maxSize || 5}MB!`);
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
            maxCount={formField.maxCount || 1}
            listType={formField.listType || "text"}
            onChange={(info) => {
              const fileList = info.fileList.map(file => ({
                name: file.name,
                type: file.type,
                size: file.size
              }));
              form.setFieldsValue({
                [formField.formId]: fileList
              });
            }}
          >
            <Button icon={<UploadOutlined />}>
              คลิกเพื่อแนบไฟล์ {formField.field}
            </Button>
          </Upload>
        );

      case 'timePicker':
        return (
          <TimePicker
            style={{ width: !isMobile ? '500px' : '100%' }}
            format={formField.format || 'HH:mm:ss'}
          />
        );

      case 'timeRangePicker':
        return (
          <TimePicker.RangePicker
            style={{ width: !isMobile ? '500px' : '100%' }}
            format={formField.format || 'HH:mm:ss'}
          />
        );

      case 'mentions':
        return (
          <Mentions
            style={{ width: !isMobile ? '500px' : '100%' }}
            options={(formField.options || []).map(opt => ({
              value: opt.value,
              label: opt.label,
            }))}
          />
        );

      case 'transfer':
        return (
          <Transfer
            dataSource={formField.dataSource || []}
            targetKeys={formField.targetKeys || []}
            titles={formField.titles || ['Source', 'Target']}
            render={item => item.title}
          />
        );

      default:
        return <Input style={{ width: !isMobile ? '500px' : '100%' }} />;
    }
  };

  const SummaryContent = () => {
    const formatValue = (value, type) => {
      if (!value) return '-';

      switch (type) {
        case 'date':
          return value.$d ? value.format('DD/MM/YYYY') : value;

        case 'dateRange':
          if (Array.isArray(value)) {
            return value.map(date => date.$d ? date.format('DD/MM/YYYY') : date).join(' - ');
          }
          return '-';

        case 'file':
          if (Array.isArray(value)) {
            return (
              <div>
                {value.map((file, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <span style={{ marginRight: 8 }}><PaperClipOutlined /></span>
                    {file.name}
                    <span style={{ marginLeft: 8, color: '#888' }}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))}
              </div>
            );
          }
          return '-';

        case 'checkbox':
          if (Array.isArray(value)) {
            return value.join(', ');
          }
          return value;

        case 'switch':
          return value ? 'เปิด' : 'ปิด';

        case 'slider':
          return `${value}`;

        case 'rate':
          return `${value} ดาว`;

        case 'colorPicker':

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: 24,
                height: 24,
                backgroundColor: value.toHexString?.() || value,
                border: '1px solid #d9d9d9',
                borderRadius: 4,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
              <span>{value.toHexString?.() || value}</span>
            </div>
          );

        default:
          return typeof value === 'object' ? JSON.stringify(value) : value;
      }
    };

    return (
      <Card title="สรุปข้อมูลทั้งหมด" bordered={true}>
        {stepFormData.steps.map((step) => (
          <Card
            key={step.stepId}
            type="inner"
            title={step.stepName}
            style={{ marginBottom: 16 }}
          >
            <Descriptions column={1}>
              {step.forms.map((field) => (
                <Descriptions.Item
                  key={field.formId}
                  label={field.field}
                  labelStyle={
                    (field.type === 'textarea' || field.type === 'file')
                      ? { alignSelf: 'flex-start' }
                      : {}
                  }
                >
                  {formatValue(allFormData[step.stepId]?.[field.formId], field.type)}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        ))}
      </Card>
    );
  };

  const renderContent = () => {
    if (current === allSteps.length - 1) {
      return <SummaryContent />;
    }

    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={allFormData[allSteps[current].stepId]}
      >
        {stepFormData.steps[current].forms.map((formField) => (
          <Form.Item
            key={formField.formId}
            label={formField.field}
            name={formField.formId}
            rules={[{
              required: formField.required,
              message: `กรุณากรอก${formField.field}`
            }]}
          >
            {renderFormItem(formField)}
          </Form.Item>
        ))}
      </Form>
    );
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submit all form data:', allFormData);
      
      notification.open({
        message: null,
        description: (
          <div style={{ 
            padding: '20px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <CheckCircleFilled style={{ 
              fontSize: 60, 
              color: '#52c41a'
            }} />
            <Title level={4} style={{ 
              margin: 0,
              color: '#52c41a',
              textAlign: 'center'
            }}>
              บันทึกข้อมูลสำเร็จ!
            </Title>
            <Text style={{ 
              fontSize: 16,
              textAlign: 'center',
              color: '#666'
            }}>
              ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว
              <br />
              ขอบคุณสำหรับการกรอกข้อมูล
            </Text>
            <Button 
              type="primary"
              onClick={() => {
                form.resetFields();
                setAllFormData({});
                setCurrent(0);
                notification.destroy(); 
              }}
              style={{ marginTop: 10 }}
            >
              ตกลง
            </Button>
          </div>
        ),
        duration: null,
        placement: 'top',
        style: {
          width: 400,
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        },
        className: 'custom-notification',
        closeIcon: null,
        onClose: () => {
          form.resetFields();
          setAllFormData({});
          setCurrent(0);
        }
      });
   
    } catch (error) {
      notification.error({
        message: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
        style: {
          width: 400,
          borderRadius: '12px'
        }
      });
    } finally {
      setSubmitLoading(false);
    }
   };

  return (
    <Content style={{
      margin: '24px 16px',
      padding: 24,
      background: '#fff',
      borderRadius: 8,
      minHeight: 280
    }}>
      <div>
        <h2>{stepFormData.name}</h2>
        <p>{stepFormData.description}</p>

        <Steps current={current} items={items} />

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          {renderContent()}
        </div>

        <Form.Item>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: 24
          }}>
            {current > 0 && (
              <Button
                style={{ marginRight: 8 }}
                onClick={() => prev()}
              >
                ย้อนกลับ
              </Button>
            )}
            {current < allSteps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
              >
                ถัดไป
              </Button>
            )}
            {current === allSteps.length - 1 && (
              <Button
                type="primary"
                onClick={() => handleSubmit()}
              >
                ยืนยันข้อมูล
              </Button>
            )}
          </div>
        </Form.Item>
      </div>
    </Content>
  );
};

export default DynamicForm;