/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
} from 'antd';
import LoginForm from './LoginForm';
import ModalForm from './ModalForm';
import HorizontalForm from './HorizontalForm';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { FormProps } from 'antd/lib/form';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

type BasicFormProps = {} & FormProps;

class BasicForms extends Component<BasicFormProps> {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form &&
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
    };
    handleConfirmBlur = (e: React.FocusEvent) => {
        const value = e.target && (e.target as any).value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form!.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form!.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form!;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{ width: '60px' }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="??????" second="????????????" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="????????????" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem {...formItemLayout} label="??????" hasFeedback>
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: '??????????????????????????????!',
                                                },
                                                {
                                                    required: true,
                                                    message: '?????????????????????!',
                                                },
                                            ],
                                        })(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="??????" hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '???????????????!',
                                                },
                                                {
                                                    validator: this.checkConfirm,
                                                },
                                            ],
                                        })(<Input type="password" />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="????????????" hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '?????????????????????!',
                                                },
                                                {
                                                    validator: this.checkPassword,
                                                },
                                            ],
                                        })(
                                            <Input
                                                type="password"
                                                onBlur={this.handleConfirmBlur}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={
                                            <span>
                                                ??????&nbsp;
                                                <Tooltip title="??????????????????????">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </span>
                                        }
                                        hasFeedback
                                    >
                                        {getFieldDecorator('nickname', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '???????????????!',
                                                    whitespace: true,
                                                },
                                            ],
                                        })(<Input />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="????????????">
                                        {getFieldDecorator('residence', {
                                            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                            rules: [
                                                {
                                                    type: 'array',
                                                    required: true,
                                                    message: '???????????????????????????!',
                                                },
                                            ],
                                        })(<Cascader options={residences} />)}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="????????????">
                                        {getFieldDecorator('phone', {
                                            rules: [
                                                { required: true, message: '???????????????????????????!' },
                                            ],
                                        })(<Input addonBefore={prefixSelector} />)}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="?????????"
                                        extra="????????????????????????????????????."
                                    >
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                {getFieldDecorator('captcha', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '??????????????????????????????!',
                                                        },
                                                    ],
                                                })(<Input size="large" />)}
                                            </Col>
                                            <Col span={12}>
                                                <Button size="large">???????????????</Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>
                                                ?????????????????? <span>??????</span>
                                            </Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">
                                            ??????
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="????????????" bordered={false}>
                                <LoginForm />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={14}>
                        <div className="gutter-box">
                            <Card title="????????????" bordered={false}>
                                <HorizontalForm />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={10}>
                        <div className="gutter-box">
                            <Card title="????????????" bordered={false}>
                                <ModalForm />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const BasicForm = Form.create()(BasicForms);

export default BasicForm;
