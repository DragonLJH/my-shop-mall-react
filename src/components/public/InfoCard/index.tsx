import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { List, Card, Divider, Typography, Tooltip, Row, Col } from 'antd';
import "./css/index.css"

const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;
const InfoCard: FC<{ item: any, isflex: boolean }> = (props: any) => {

    const history = useHistory();
    const location = useLocation();

    const { item, isflex } = props
    const toProductDetailsPage = (value: string) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }
    return (
        <>
            <Card className={`info-card ${isflex ? "info-card-flex" : ""}`} onClick={() => { toProductDetailsPage(item.productId) }}
                hoverable
                cover={<img className="info-card-img" alt="example" src={item.productRotationImg[0]} />}
            >
                <Meta
                    title={<>
                        <Title level={5}>{item.productName}</Title>
                        <Text type="danger">￥{item.productSellingPrice}</Text>
                    </>}
                    description={<Paragraph ellipsis={{ rows: 2, tooltip: item.productMsg }} >{item.productMsg} </Paragraph>}
                />
            </Card>
        </>
    )
}




export default InfoCard