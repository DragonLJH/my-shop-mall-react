import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './css/index.css';
import { Card, List, Tooltip, Typography } from 'antd';
import { queryProductByProductMsgApi } from "../../api";
const { Meta } = Card;
const { Paragraph, Link, Text, Title } = Typography;

function SearchPage() {
    const history = useHistory();
    const location = useLocation();
    const { state }: { state: any } = { ...location };
    const myLoclSearch = localStorage.getItem("myLoclSearch") || state.value;

    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        queryProductByProductMsg();
        console.log("SearchPage-state", state)
    }, [state])

    const queryProductByProductMsg = async () => {
        await queryProductByProductMsgApi("/product/queryProductByProductMsg", { params: { productMsg: myLoclSearch } })
            .then((myData) => {
                setSearchData(myData.data)
                console.log(myData.data)
            })
    }
    const toProductDetailsPage = (value: string) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }


    return (
        <>
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    itemLayout="horizontal"
                    dataSource={searchData}
                    renderItem={(item: any) => (
                        <List.Item onClick={() => { toProductDetailsPage(item.productId) }}>
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
            </div>
        </>
    )
}

export default SearchPage;