import { FC, useEffect, useState } from 'react';
import './css/index.css'
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { Card, List, Tooltip, Typography } from 'antd';
import { queryProductByEmergeApi } from "../../../api";
import { UserOutlined, PayCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Paragraph, Link, Text, Title } = Typography;

const EmergeCart: FC<any> = ({ ...rest }): any => {
    const { val }: { val: any } = { ...rest }



    const history = useHistory();
    const [emergeCartData, setEmergeCartData] = useState([])




    useEffect(() => {
        queryProductByEmerge()
    }, [])

    const queryProductByEmerge = async () => {
        await queryProductByEmergeApi("/product/queryProductByEmerge", { params: { emergeTag: val.emergeTag } }).then((res) => {
            console.log("queryProductByEmerge", res)
            setEmergeCartData(res.data)
        })
    }

    const toClassificationPage = (value: any) => {
        localStorage.removeItem("classificationTitle");
        localStorage.setItem("classificationTitle", value);
        history.replace({ pathname: "/classificationPage", state: { value } });
    }

    const toProductDetailsPage = (value?: any) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }

    return (
        <>
            <Card className="emerge-cart" title={val.emergeTag} extra={<Link onClick={() => { toClassificationPage(val.emergeTag) }}>{`更多>>>`}</Link>}>
                {/* <List
                    grid={{ gutter: 16, column: 4 }}
                    itemLayout="horizontal"
                    dataSource={emergeCartData}
                    renderItem={(item: any) => (
                        <List.Item onClick={() => { toProductDetailsPage(item["productId"]) }}>
                             <List.Item.Meta
                                avatar={<Avatar shape="square" size={64} src={item.productRotationImg[0]} />}
                                title={<><div>{item.productName}</div><Text type="danger">¥${item.productPrice}</Text></>}
                                description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis="false">{item.productMsg} </Paragraph></Tooltip>}
                            /> 
                            <Card onClick={() => { toProductDetailsPage(item.productId) }}
                                hoverable
                                cover={<img alt="example" src={item.productRotationImg[0]} />}
                            >
                                <Title level={4}><Text type="danger">￥{item.productSellingPrice}</Text></Title>
                                <Meta title={item.productName} description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis={false}>{item.productMsg} </Paragraph></Tooltip>} />
                            </Card>
                        </List.Item>
                    )}
                /> */}

                {emergeCartData.map((item: any) => {
                    return (
                        <div className="emerge-cart-item">
                            <Card onClick={() => { toProductDetailsPage(item.productId) }}
                                hoverable
                                cover={<img className="emerge-cart-item-img" src={item.productRotationImg[0]} />}
                            >
                                <Meta
                                    // avatar={<PayCircleOutlined />}
                                    title={<>
                                        <Title level={5}>{item.productName}</Title>
                                        <Text type="danger">￥{item.productSellingPrice}</Text>
                                    </>}
                                    description={<Tooltip placement="top" title={item.productMsg}>
                                        <Paragraph ellipsis >{item.productMsg} </Paragraph>
                                    </Tooltip>}
                                />
                            </Card>
                        </div>
                    )
                })}
            </Card>
        </>
    )

}

export default EmergeCart;