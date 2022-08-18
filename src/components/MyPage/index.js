import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Image, List, Typography, Space, Divider } from 'antd';
import "./css/index.css";
import axios from "axios"

const { Text, Title } = Typography;
function MyPage() {
    const history = useHistory();
    const location = useLocation();
    const user = localStorage.getItem("user");

    const queryAllOrder = () => {
        if (user !== null) {
            axios.get("http://localhost:8787/order/queryAllOrderByUserName", { params: { userName: user } }).then((val) => {
                setOrderData(val.data)
                console.log(val.data)
            })
        }
    }

    useEffect(() => {
        if (user === null) {
            history.push("/");
        } else {
            queryAllOrder();
        }
    }, [user])

    const [orderData, setOrderData] = useState([]);


    return (
        <>
            <div>
                <Divider orientation="left">我的订单</Divider>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    itemLayout="horizontal"
                    dataSource={orderData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<div style={{ width: "120px" }}><Image style={{ width: "100%" }} src={item.productRotationImg} /></div>}
                                title={<>
                                    <Space size="small  ">
                                        <Text strong>{item.productName}</Text>
                                        <Text type="danger">¥{item.productSellingPrice}</Text>
                                        <Text type="secondary">X{item.selectNum}</Text>
                                        <Text type="danger">共：¥{item.orderTotal}</Text>
                                    </Space>
                                </>}
                                description={<>
                                    <Space direction="vertical">
                                        <Text type="secondary">订单号:{item.orderNumber}</Text>
                                        <Text type="secondary">订单创建时间:{item.orderCreationTime}</Text>
                                        <Text type="secondary">订单付款时间:{item.orderPaymentTime}</Text>
                                        <Text type="secondary">订单发货时间:{item.orderDeliveryTime}</Text>
                                    </Space>
                                </>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

function ItemCard() {


    return (
        <>
            <div>

            </div>
        </>
    )
}





export default MyPage;