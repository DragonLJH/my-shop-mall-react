import { FC, useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, Row, Col, message, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { queryUserByUserNameApi } from "../../../api";
import exportContext from "../../../exportContext"
import "./css/index.css"

const { Link } = Typography;

const TopNav: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = { ...location };
    const topNavContext: any = useContext(exportContext);
    const user = topNavContext.user || localStorage.getItem("user");
    const [form] = Form.useForm();
    const onFinish = (values: { username: any; password: any; }) => {
        queryUserByUserNameApi("/user/queryUserByUserName", { params: { userName: values.username, userPassword: values.password } })
            .then((myData) => {
                if (myData.data) {

                    topNavContext.Login(() => {
                        history.push(pathname);
                        setFlag(true);
                    }, values.username)
                } else {
                    message.error("用户名或密码错误")
                }
            })
        form.resetFields();
    };
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if (user !== null) {
            setFlag(true)
        }
    }, [user])
    const showFlag = () => {
        let successful = () => {
            return (
                <Col style={{ width: "300px" }}>
                    <Space size="middle">
                        <Button danger type="primary" icon={<PoweroffOutlined />} onClick={() => { return topNavContext.Exit(() => { history.push(pathname); setFlag(false); }) }} > {user} 退出登录 </Button>
                        {/* <span onClick={() => { history.push("/myPage"); }}><UserOutlined />我的</span> */}
                        <Link href="#/myPage" >
                            <UserOutlined />我的
                        </Link>
                    </Space>
                </Col >
            )
        }
        let unsuccessful = () => {
            return (
                <Col style={{ width: "800px", backgroundColor: "#e3e4e5", color: "#999" }}>
                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                { required: true, message: '请输入正确的用户名（手机号）', pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                { required: true, message: '请输入密码' },
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="link" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="link" onClick={() => { history.push({ pathname: "/loginPage", state: { value: 1 } }); }}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            )
        }
        return flag ? successful() : unsuccessful()
    }

    return (
        <div className="top-nav">
            {pathname === "/loginPage" ? "" :
                <Row style={{ backgroundColor: "#f5f5f5" }} wrap={false}>
                    <Col flex="auto"></Col>
                    {showFlag()}
                </Row>
            }

        </div>
    )
}

export default TopNav;