import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Divider, Typography, Form, Input, InputNumber, Radio, Button, Tabs, Descriptions, Image, Card, message, List, Badge, Space, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import './css/index.css';
import SuspensionBar from "../public/suspensionBar/index"

import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import qs from "qs";

const { Text, Paragraph, Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

function ProductDetailsPage() {
    //获取登录的用户，未登录的为null
    const user = localStorage.getItem("user");
    const history = useHistory();
    const location = useLocation();
    const { pathname, state } = { ...location };

    //获取页面产品id，根据产品id来获取产品信息，产品id由点击的卡片页面从路由跳转过来，并存储在localStorage（本地缓存）中
    const ProductDetailsProductId = localStorage.getItem("ProductDetailsProductId") || state.value;

    //创建form表单
    const [myform] = Form.useForm();

    //绑定评论信息
    const [comment, setComment] = useState(null);


    //产品信息
    const [productDetails, setProductDetails] = useState(null)


    useEffect(() => {
        queryProductById();
        queryCommentsByProductId();
    }, [ProductDetailsProductId])

    const queryProductById = async () => {
        await axios.get("http://localhost:8787/product/queryProductById", { params: { productId: ProductDetailsProductId } })
            .then((productData) => {
                setProductDetails(productData.data)
                setBigPictureSrc(productData.data.productRotationImg[0])
                console.log(productData.data)
            })
    }

    const queryCommentsByProductId = async () => {
        await axios.get("http://localhost:8787/comment/queryCommentsByProductId", { params: { productId: ProductDetailsProductId } })
            .then((commentsData) => {
                console.log(commentsData.data)
                setCommentData(commentsData.data)
            })
    }


    const toProductDetailsPage = () => {
        history.replace()
    }
    //加入购物车
    const onFinish = (values) => {
        //用户没登录跳至登录注册页
        if (user === null) {
            message.warn("用户没登录")
            history.push("/loginPage")
        } else {
            axios.post("http://localhost:8787/shop/insertShop", qs.stringify(values)).then((val) => {
                if (val) {
                    history.push("/shoppingCartPage")
                    message.success("成功添加到购物车")
                } else {
                    message.warn("添加失败")
                }
            })
        }

        console.log(values);
    };

    //提交评论
    const onComment = () => {
        console.log(comment)
        if (comment === "") {
            message.warning('评论不能为空');
        }
    }


    //轮播大图（第一张图）
    const [bigPictureSrc, setBigPictureSrc] = useState(null);

    //评论信息
    const [commentData, setCommentData] = useState([]);


    return (
        <>
            {productDetails == null ? "" : <div>
                <Divider style={{ fontSize: "20px", padding: "20px 0px" }} orientation="left">{productDetails.productName}</Divider>
                <Row gutter={[40, 40]} wrap={false}>
                    <Col flex="300px" >
                        <SuspensionBar />
                    </Col>
                    <Col flex="auto" >
                        <div style={{ display: "flex", }}>
                            <div style={{ width: "400px", margin: "0px 30px" }}>
                                <div style={{ width: "100%", marginBottom: "10px" }} >
                                    <BigPicture src={bigPictureSrc} />
                                </div>
                                <Row justify="space-around">
                                    {productDetails.productRotationImg.map((val, key) => {
                                        return <Col key={key} span={4}><img onMouseEnter={(e) => { setBigPictureSrc(e.target.src) }} style={{ width: "100%", cursor: "pointer" }} src={val} /></Col>
                                    })}
                                </Row>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Space wrap>
                                    <Title level={4}>{productDetails.productMsg}</Title>
                                </Space>

                                <Title level={4}><Text type="secondary">  销售价格：</Text><Text type="danger">￥{productDetails.productSellingPrice}</Text></Title>
                                <div><Text type="secondary">  市场价格：</Text><Text delete> ￥{productDetails.productPrice}</Text></div>
                                <Row>
                                    <Col flex={1}><Text type="secondary">  库存：{productDetails.productStock}</Text></Col>
                                    <Col flex={1}><Text type="secondary">  销量：{productDetails.productSalesVolume}</Text></Col>
                                </Row>
                                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={myform} onFinish={onFinish}>

                                    <Form.Item name="productRotationImg" hidden initialValue={productDetails.productRotationImg[0]}> <Input /> </Form.Item>
                                    <Form.Item name="userName" hidden initialValue={user}> <Input /> </Form.Item>
                                    <Form.Item name="productId" hidden initialValue={productDetails.productId}> <Input /> </Form.Item>
                                    <Form.Item name="productName" hidden initialValue={productDetails.productName}> <Input /> </Form.Item>
                                    <Form.Item name="productSellingPrice" hidden initialValue={productDetails.productSellingPrice}> <Input /> </Form.Item>
                                    <Form.Item label="颜色：" >
                                        <Form.Item name="selectColor" noStyle initialValue={productDetails.productColor[0]}>
                                            <Radio.Group buttonStyle="solid">{productDetails.productColor.map((val, key) => { return <Radio.Button key={key} value={val}>{val}</Radio.Button> })}</Radio.Group>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item label="尺寸：" >
                                        <Form.Item name="selectSize" noStyle initialValue={productDetails.productSize[0]}>
                                            <Radio.Group buttonStyle="solid">{productDetails.productSize.map((val, key) => { return <Radio.Button key={key} value={val}>{val}</Radio.Button> })}</Radio.Group>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item label="数量： " >
                                        <Form.Item name="selectNum" noStyle initialValue={1}>
                                            <InputNumber min={1} max={productDetails.productStock} />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            加入购物车
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        <div style={{ margin: "50px 10px" }}>
                            <Tabs type="card">
                                <TabPane tab="图片介绍" key="1">
                                    {productDetails.productMsgImg.map((val, key) => {
                                        return <div key={key} ><Image width="100%" src={val} /></div>
                                    })}
                                </TabPane>
                                <TabPane tab="商品介绍" key="2">
                                    <Descriptions title={productDetails.productName} bordered >
                                        <Descriptions.Item label="商品编号">{productDetails.productId}</Descriptions.Item>
                                        <Descriptions.Item label="商品名称">{productDetails.productName}</Descriptions.Item>
                                        <Descriptions.Item label="商品信息">{productDetails.productMsg}</Descriptions.Item>
                                        <Descriptions.Item label="商品类型">{productDetails.productType}</Descriptions.Item>
                                        <Descriptions.Item label="销售价格">{productDetails.productSellingPrice}</Descriptions.Item>
                                        <Descriptions.Item label="市场价格">{productDetails.productPrice}</Descriptions.Item>
                                        <Descriptions.Item label="库存">{productDetails.productStock}</Descriptions.Item>
                                        <Descriptions.Item label="销量">{productDetails.productSalesVolume}</Descriptions.Item>
                                        <Descriptions.Item label="尺寸">{productDetails.productSize}</Descriptions.Item>
                                        <Descriptions.Item label="颜色">{productDetails.productColor}</Descriptions.Item>
                                        <Descriptions.Item label="商品定位">{productDetails.productEmergeSite}</Descriptions.Item>
                                    </Descriptions>
                                </TabPane>
                                <TabPane tab={<Badge count={commentData.length} showZero overflowCount={99}>评论</Badge>} key="3">
                                    <div >
                                        <List
                                            itemLayout="horizontal"
                                            pagination={{ pageSize: 10 }}
                                            dataSource={commentData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<UserOutlined />}
                                                        title={<Space align="start" size={15}> <span>{item.userName}</span><span>发布时间：{item.createDate}</span></Space>}
                                                        description={item.commentMsg}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                        {/* <Row>
                                            <Col flex="100px">
                                                <UserOutlined /><span>{user}</span>
                                            </Col>
                                            <Col flex="auto">
                                                <TextArea allowClear rows={4} onChange={(e) => { setComment(e.target.value) }} />
                                            </Col>
                                        </Row>
                                        <Button type="primary" block onClick={onComment}>
                                            提交评论
                                        </Button> */}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>}
        </>
    )
}

function BigPicture({ ...rest }) {
    const { src } = { ...rest }
    return (
        <>
            <img style={{ width: "100%" }} src={src} />
        </>
    )
}

export default ProductDetailsPage;