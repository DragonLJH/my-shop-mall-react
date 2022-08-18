import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { List, Card, Divider, Typography, Tooltip, Row, Col } from 'antd';
import SuspensionBar from "../public/suspensionBar/index"
import axios from 'axios';


const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;
function ClassificationPage() {

    const history = useHistory();
    const location = useLocation();
    const { pathname, state } = { ...location };
    const typeTitle = localStorage.getItem("typeTitle") || state.value;
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        asyncData()
    }, [])

    /*--------------------------------------（方法、函数）------------------------------------------------------------*/
    const asyncData = async () => {
        await axios.get("http://localhost:8787/product/queryProductByType", { params: { productType: typeTitle } }).then((myData) => {
            setTypeData(myData.data)
        })

    }

    const toProductDetailsPage = (value) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }



    return (
        <>
            <Divider orientation="center">{`<<${typeTitle}>>`}</Divider>
            <Row wrap={false} gutter={40}>
                <Col flex="200px">
                    <SuspensionBar />
                </Col>
                <Col flex="auto">
                    <List
                        grid={{ gutter: 16, column: 5 }}
                        pagination={{ pageSize: 15 }}
                        dataSource={typeData}
                        renderItem={item => (
                            <List.Item>
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
                </Col>
            </Row>

        </>
    )
}

export default ClassificationPage;