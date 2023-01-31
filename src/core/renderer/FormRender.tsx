import React, { memo, RefObject, useEffect, useMemo } from 'react';
import { Form, Select, InputNumber, Input, Switch, Radio } from 'antd';
import Upload from '../../components/FormComponents/Upload';
import DataList from '../../components/FormComponents/DataList';
import MutiText from '../../components/FormComponents/MutiText';
import Color from '../../components/FormComponents/Color';
import CardPicker from '../../components/FormComponents/CardPicker';
import Table from '../../components/FormComponents/Table';
import Pos from '../../components/FormComponents/Pos';
import MLMonacoEditor from '@/components/FormComponents/MLMonacoEditor';
import { Store } from 'antd/lib/form/interface';
import { useWatch } from 'antd/lib/form/Form';
import DataIndexSelector from '@/components/FormComponents/DataIndexSelector';
import { useWhyDidYouUpdate } from 'ahooks';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    //待修改
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { style: { width: 110 } },
};

interface FormEditorProps {
  uid: string;
  onSave: Function;
  defaultValue: { [key: string]: any };
  config: Array<any>;
}

const FormItemRender = memo(
  (props) => {
    const { item } = props;
    return (
      <React.Fragment key={item.key}>
        {item.type === 'Number' && (
          <Form.Item label={item.name} name={item.key}>
            <InputNumber max={item.range && item.range[1]} />
          </Form.Item>
        )}
        {item.type === 'Text' && (
          <Form.Item label={item.name} name={item.key}>
            <Input />
          </Form.Item>
        )}
        {item.type === 'TextArea' && (
          <Form.Item label={item.name} name={item.key}>
            <TextArea rows={4} />
          </Form.Item>
        )}
        {item.type === 'MutiText' && (
          <Form.Item label={item.name} name={item.key}>
            <MutiText />
          </Form.Item>
        )}
        {/* {item.type === 'DataList' && (
    <Form.Item label={item.name} name={item.key}>
      <DataList cropRate={item.cropRate} />
    </Form.Item>
  )} */}
        {item.type === 'Color' && (
          <Form.Item label={item.name} name={item.key}>
            <Color />
          </Form.Item>
        )}

        {item.type === 'DataIndexSelector' && (
          <Form.Item label={item.name} name={item.key}>
            <DataIndexSelector />
          </Form.Item>
        )}

        {item.type === 'Select' && (
          <Form.Item label={item.name} name={item.key}>
            <Select placeholder="请选择" popupClassName="dark-select-dropdown">
              {item?.options?.map((v: any, i: number) => {
                return (
                  <Option value={v.value} key={i}>
                    {v.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
        {item.type === 'Radio' && (
          <Form.Item label={item.name} name={item.key}>
            <Radio.Group options={item?.options} />
          </Form.Item>
        )}
        {item.type === 'Switch' && (
          <Form.Item label={item.name} name={item.key} valuePropName="checked">
            <Switch />
          </Form.Item>
        )}
        {item.type === 'Upload' && (
          <Form.Item
            label={item.name}
            name={item.key}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload cropRate={item.cropRate} isCrop={item.isCrop} />
          </Form.Item>
        )}
        {item.type === 'Table' && (
          <Form.Item label={item.name} name={item.key} valuePropName="data">
            <Table data={item.data} />
          </Form.Item>
        )}
        {item.type === 'Pos' && (
          <Form.Item label={item.name} name={item.key}>
            <Pos />
          </Form.Item>
        )}
        {item.type === 'MonacoEditor' && (
          <Form.Item label={item.name} name={item.key}>
            <MLMonacoEditor />
          </Form.Item>
        )}
      </React.Fragment>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
  },
);

const FormEditor = (props: FormEditorProps) => {
  const { config, defaultValue, onSave, uid } = props;
  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

  // 渲染优化
  const DependenciesItem = useMemo(() => {
    return (props) => {
      const { config } = props;
      const { dependencies } = config;
      // 没有依赖项直接return
      if (!dependencies) {
        return <FormItemRender item={config} />;
      }

      const { logic = 'and', items } = dependencies;
      const result: any[] | undefined = items?.map(
        (item: { dependKey: string; dependValues: string[] }) => {
          const value = useWatch(item?.dependKey, form);
          if (item?.dependValues && !item.dependValues?.includes(value)) {
            return false;
          }
          return true;
        },
      );
      const getMeet = () => {
        if (logic === 'and') {
          return result?.every((item) => item);
        } else if (logic === 'or') {
          return result?.some((item) => item);
        }
      };
      const isMeet = getMeet();
      // 有依赖项并且全部匹配则渲染表单组件
      if (isMeet) {
        return <FormItemRender item={config} />;
      }
      // 默认不渲染
      return <></>;
    };
  }, [config]);

  return (
    <Form
      form={form}
      name={`form_editor`}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={defaultValue}
      onValuesChange={handlechange}
      colon={false}
    >
      {config?.map((item) => (
        <DependenciesItem config={item} />
      ))}
    </Form>
  );
};

export default memo(FormEditor);
