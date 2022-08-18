import { useEffect, useState } from 'react';
import './css/index.css'
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { Card, List, Tooltip, Typography } from 'antd';

const { Meta } = Card;
const { Paragraph, Link, Text, Title } = Typography;

function EmergeCart({ ...rest }) {
    const { val } = { ...rest }



    const history = useHistory();
    const [emergeCartData, setEmergeCartData] = useState([])




    useEffect(() => {
        queryProductByEmerge()
    }, [])

    const queryProductByEmerge = async () => {
        await axios.get("http://localhost:8787/product/queryProductByEmerge", { params: { emergeTag: val.emergeTag } }).then((res) => {
            console.log("queryProductByEmerge", res)
            setEmergeCartData(res.data)
        })
    }

    const toClassificationPage = (value) => {
        localStorage.removeItem("classificationTitle");
        localStorage.setItem("classificationTitle", value);
        history.replace({ pathname: "/classificationPage", state: { value } });
    }

    const toProductDetailsPage = (value) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }

    return (
        <div>
            <Card title={val.emergeTag} extra={<Link onClick={() => { toClassificationPage(val.emergeTag) }}>{`更多>>>`}</Link>}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    itemLayout="horizontal"
                    dataSource={emergeCartData}
                    renderItem={item => (
                        <List.Item onClick={() => { toProductDetailsPage(item.productId) }}>
                            {/* <List.Item.Meta
                                avatar={<Avatar shape="square" size={64} src={item.productRotationImg[0]} />}
                                title={<><div>{item.productName}</div><Text type="danger">¥${item.productPrice}</Text></>}
                                description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis="false">{item.productMsg} </Paragraph></Tooltip>}
                            /> */}
                            <Card onClick={() => { toProductDetailsPage(item.productId) }}
                                hoverable
                                cover={<img alt="example" src={item.productRotationImg[0]} />}
                            >
                                <Title level={4}><Text type="danger">￥{item.productSellingPrice}</Text></Title>
                                <Meta title={item.productName} description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis="false">{item.productMsg} </Paragraph></Tooltip>} />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>

        </div>
    )

}

export default EmergeCart;