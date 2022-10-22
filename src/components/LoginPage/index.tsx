import { FC, useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './css/index.css'
import exportContext from "../../exportContext"
import { queryUserByUserNameApi, insertUserApi } from "../../api";
import { Form, Input, Button, Tabs, Row, Col, message } from 'antd';


const { TabPane } = Tabs;

const LoginPage: FC = () => {
    const history = useHistory();
    const location = useLocation();
    console.log(history, location)
    //切换 清空 表单
    const callback = () => { LonReset(); RonReset(); }
    //登录 表单
    const [Lform] = Form.useForm();
    //注册 表单
    const [Rform] = Form.useForm();
    const myConsumer: any = useContext(exportContext);
    const layout = { labelCol: { span: 8, }, wrapperCol: { span: 8, }, };
    const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
    //登录 验证
    const LonFinish = (values: { userName: any; userPassword: any; }) => {
        LonReset();
        console.log(values)
        queryUserByUserNameApi("/user/queryUserByUserName", { params: { userName: values.userName, userPassword: values.userPassword } })
            .then((myData) => {
                console.log(myData)
                if (myData.data) {
                    myConsumer.Login(() => {
                        history.push("/");
                    }, values.userName)
                } else {
                    message.error("用户名或密码错误")
                }
            })
        console.log(myConsumer)

    };
    //注册 验证
    const RonFinish = (values: { userName: any; userPassword: any; }) => {
        RonReset();
        insertUserApi("/user/insertUser", { userName: values.userName, userPassword: values.userPassword }, {})
            .then((myData) => {
                console.log(myData)
                if (myData.data) {
                    message.success("注册成功，请登录")

                } else {
                    message.error("用户名或密码错误")
                }
            })
        console.log(values);
    };

    //登录 清空
    const LonReset = () => {
        Lform.resetFields();
    };
    //注册 清空
    const RonReset = () => {
        Rform.resetFields();
    };
    return (
        <>
            <Row>
                <Col flex="1 1 ">
                </Col>
                <Col flex="0 1 700px">
                    <Tabs defaultActiveKey="1" size="large" centered tabBarGutter={50}>
                        <TabPane tab="登录" key="1">
                            <Form {...layout} form={Lform} name="control-hooks" onFinish={LonFinish}>
                                <Form.Item name="userName" label="账号" rules={[{ required: true, message: '请输入您的账号', pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ },]} >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="userPassword" label="密码" rules={[{ required: true, message: '请输入您的密码！', },]} >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button htmlType="button" onClick={LonReset}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form {...layout} form={Rform} name="control-hooks" onFinish={RonFinish}>
                                <Form.Item name="userName" label="账号" rules={[{ required: true, message: '请输入您的账号', },]} >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="userPassword" label="密码" rules={[{ required: true, message: '请输入您的密码！', },]} hasFeedback >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item name="confirm" label="确认密码" dependencies={['userPassword']} hasFeedback
                                    rules={[{ required: true, message: '请确认您的密码！', },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('userPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('您输入的两个密码不匹配！'));
                                        },
                                    }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                    <Button htmlType="button" onClick={RonReset}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>


        </>
    )
}

export default LoginPage;