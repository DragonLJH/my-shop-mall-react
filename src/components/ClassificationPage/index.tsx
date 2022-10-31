import { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { List, Card, Divider, Typography, Tooltip, Row, Col } from 'antd';
import { queryProductByEmergeApi } from "../../api";
import SuspensionBar from "../public/suspensionBar/index"
import InfoCard from "../public/InfoCard/index"
import "./css/index.css"
import Item from "antd/lib/list/Item";


const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;
const ClassificationPage: FC = () => {

    const history = useHistory();
    const location = useLocation();
    const { pathname, state }: { pathname: string, state: any } = { ...location };
    const classificationTitle = localStorage.getItem("classificationTitle") || state.value;
    const [classificationData, setClassificationData] = useState([]);

    useEffect(() => {
        asyncData()
    }, [])

    /*--------------------------------------（方法、函数）------------------------------------------------------------*/
    const asyncData = async () => {
        await queryProductByEmergeApi("/product/queryProductByEmerge", { params: { emergeTag: classificationTitle } }).then((myData) => {
            setClassificationData(myData.data)
        })

    }

    const toProductDetailsPage = (value: string) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }



    return (
        <>
            {/* <Divider orientation="center">{`<<${classificationTitle}>>`}</Divider> */}
            <div className="classification-title">
                <div className="classification-title-item">
                    <span>所有宝贝({classificationTitle})</span>
                </div>
                {/* <div className="classification-title-search">

                </div> */}
            </div>
            {/* <Row gutter={[40, 40]} wrap={false}>
                <Col flex="300px" >
                    <SuspensionBar />
                </Col>
                <Col flex="aotu" >

            <List
                grid={{ gutter: 16, column: 5 }}
                pagination={{ pageSize: 15 }}
                dataSource={classificationData}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card onClick={() => { toProductDetailsPage(item.productId) }}
                            hoverable
                            cover={<img alt="example" src={item.productRotationImg[0]} />}
                        >
                            <Title level={4}><Text type="danger">￥{item.productSellingPrice}</Text></Title>
                            <Meta title={item.productName} description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis={false}>{item.productMsg} </Paragraph></Tooltip>} />
                        </Card>
                    </List.Item>
                )}
            />
            </Col>
            </Row> */}
            <List
                className="classification-list"
                grid={{ gutter: 16, column: 5 }}
                pagination={{ pageSize: 15 }}
                dataSource={classificationData}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card onClick={() => { toProductDetailsPage(item.productId) }}
                            hoverable
                            cover={<img alt="example" src={item.productRotationImg[0]} />}
                        >
                            <Title level={4}><Text type="danger">￥{item.productSellingPrice}</Text></Title>
                            <Meta title={item.productName} description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis={false}>{item.productMsg} </Paragraph></Tooltip>} />
                        </Card>
                    </List.Item>
                )}
            />
            <div className="classification-main">
                {classificationData.map((item: any, index: number) => {
                    return (
                        // <div className="classification-main-item">
                        //     <Card onClick={() => { toProductDetailsPage(item.productId) }}
                        //         hoverable
                        //         cover={<img alt="example" src={item.productRotationImg[0]} />}
                        //     >
                        //         <Meta
                        //             title={<>
                        //                 <Title level={5}>{item.productName}</Title>
                        //                 <Text type="danger">￥{item.productSellingPrice}</Text>
                        //             </>}
                        //             description={<Paragraph ellipsis={{ rows: 2, tooltip: item.productMsg }} >{item.productMsg} </Paragraph>}
                        //         />
                        //     </Card>
                        // </div>
                        <InfoCard item={item} isflex={true} />
                    )
                })}
            </div>
        </>
    )
}

export default ClassificationPage;