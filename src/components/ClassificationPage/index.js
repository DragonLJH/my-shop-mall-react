import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { List, Card, Divider, Typography, Tooltip } from 'antd';
import axios from 'axios';


const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;
function ClassificationPage() {

    const history = useHistory();
    const location = useLocation();
    const { pathname, state } = { ...location };
    const classificationTitle = localStorage.getItem("classificationTitle") || state.value;
    const [classificationData, setClassificationData] = useState([]);

    useEffect(() => {
        asyncData()
    }, [])

    /*--------------------------------------（方法、函数）------------------------------------------------------------*/
    const asyncData = async () => {
        await axios.get("http://localhost:8787/product/queryProductByEmerge", { params: { emergeTag: classificationTitle } }).then((myData) => {
            setClassificationData(myData.data)
        })

    }

    const toProductDetailsPage = (value) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }



    return (
        <>
            <Divider orientation="center">{`<<${classificationTitle}>>`}</Divider>
            <List
                grid={{ gutter: 16, column: 5 }}
                pagination={{ pageSize: 15 }}
                dataSource={classificationData}
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
        </>
    )
}

export default ClassificationPage;