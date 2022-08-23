import { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"; 
import { Button, Card, message, List, Avatar, Tooltip, Typography } from 'antd';
import { queryAllEmergeApi, queryProductByEmergeApi } from "../../../api";

const { Paragraph, Link } = Typography;

const SuspensionBar: FC = () => {
    const [productPositioning, setProductPositioning] = useState([])
    useEffect(() => {
        queryAllEmerge();
    }, [])
    const queryAllEmerge = async () => {
        await queryAllEmergeApi("http://localhost:8787/emerge/queryAllEmerge", {}).then((allEmerge) => {
            setProductPositioning(allEmerge.data)
        })
    }
    return (
        <>
            {
                productPositioning.map((res: any, key: number) => {
                    return (
                        <div key={key} style={{ marginTop: "20px" }}>
                            <SuspensionBarCard value={res.emergeTag} />
                        </div>
                    )
                })
            }
        </>
    )
}

function SuspensionBarCard(rest: any) {
    const { value }: { value: any } = rest
    const history = useHistory();
    const [recommendationColumn, setRecommendationColumn] = useState([])

    useEffect(() => {
        asyncData()
    }, [value])

    const asyncData = async () => {
        await queryProductByEmergeApi("/product/queryProductByEmerge", { params: { emergeTag: value } }).then((myData) => {
            setRecommendationColumn(myData.data)
        })

    }
    const toClassificationPage = (value: any) => {
        localStorage.removeItem("classificationTitle");
        localStorage.setItem("classificationTitle", value);
        history.replace({ pathname: "/classificationPage", state: { value } });
    }
    const toProductDetailsPage = (value: any) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }
    return (
        <>
            <Card title={value} extra={<Link onClick={() => { toClassificationPage(value) }}>{`更多>>>`}</Link>} style={{ width: 300 }}>
                <List
                    itemLayout="horizontal"
                    dataSource={recommendationColumn}
                    renderItem={(item: any) => (
                        <List.Item actions={[<Button type="primary" size="small" ghost onClick={() => { toProductDetailsPage(item.productId) }}> 详情 </Button>,]}>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" size={64} src={item.productRotationImg[0]} />}
                                title={item.productName}
                                description={<Tooltip placement="top" title={item.productMsg}><Paragraph ellipsis={false}>{item.productMsg} </Paragraph></Tooltip>}
                            />
                        </List.Item>
                    )}
                />
            </Card>

        </>
    )
}

export default SuspensionBar;