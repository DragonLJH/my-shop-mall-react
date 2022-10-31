import { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { List, Card, Divider, Typography, Tooltip, Row, Col } from 'antd';
import { queryProductByTypeApi } from "../../api";
import SuspensionBar from "../public/suspensionBar/index"
import InfoCard from "../public/InfoCard/index"

import "./css/index.css"

const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;
const ClassificationPage: FC = () => {

    const history = useHistory();
    const location: any = useLocation();
    const { pathname, state } = location;
    const typeTitle = localStorage.getItem("typeTitle") || state.value;
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        asyncData()
    }, [])

    /*--------------------------------------（方法、函数）------------------------------------------------------------*/
    const asyncData = async () => {
        await queryProductByTypeApi("/product/queryProductByType", { params: { productType: typeTitle } }).then((myData) => {
            setTypeData(myData.data)
        })

    }

    const toProductDetailsPage = (value: any) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }



    return (
        <>
            <Divider orientation="center">{`<<${typeTitle}>>`}</Divider>
            <Row wrap={false} gutter={40}>
                <Col flex="200px" className="type-row-left">
                    <SuspensionBar />
                </Col>
                <Col flex="auto">
                    <List
                        pagination={{ pageSize: 15 }}
                        dataSource={typeData}
                        renderItem={(item: any) => (
                            <InfoCard item={item} isflex={true} />
                        )}
                    />
                </Col>
            </Row>

        </>
    )
}

export default ClassificationPage;