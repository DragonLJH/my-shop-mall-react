import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './css/index.css';
import { Card, List, Tooltip, Typography, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { queryProductByProductMsgApi } from "../../api";
import Item from 'antd/lib/list/Item';
const { Meta } = Card;
const { Paragraph, Link, Text, Title } = Typography;

function SearchPage() {
    const history = useHistory();
    const location = useLocation();
    const { state }: { state: any } = { ...location };
    const myLoclSearch = localStorage.getItem("myLoclSearch") || state.value;

    const [searchData, setSearchData] = useState([])
    const [showData, setShowData] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        queryProductByProductMsg();
    }, [state])

    const queryProductByProductMsg = async () => {
        await queryProductByProductMsgApi("/product/queryProductByProductMsg", { params: { productMsg: myLoclSearch } })
            .then((myData) => {
                setSearchData(myData.data)
                getShowData(myData.data, 1)
                setTotal(myData.data.length)
                setCurrent(1)
                console.log(myData.data)
            })
    }

    const getShowData = (data: any, page: number, pageSize: number = 10) => {
        let res = data.filter((value: any, index: number) => {
            return (page - 1) * pageSize <= index && index < page * pageSize
        })
        setShowData(res)
    }


    const toProductDetailsPage = (value: string) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }
    // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    //     console.log("onShowSizeChange")
    //     getShowData(searchData, current, pageSize)
    // };
    const onChange = (page: number, pageSize?: number) => {
        console.log("onChange", page, pageSize)
        getShowData(searchData, page, pageSize)
    };
    return (
        <>
            {showData.map((item: any, index: number) => {
                return (
                    <div className="searc-data-item" key={index} >
                        <Card onClick={() => { toProductDetailsPage(item.productId) }}
                            hoverable
                            cover={<img className="searc-data-item-img" src={item.productRotationImg[0]} />}
                        >
                            <Meta
                                title={<>
                                    <Title level={5}>{item.productName}</Title>
                                    <Text type="danger">￥{item.productSellingPrice}</Text>
                                </>}
                                description={<Paragraph ellipsis={{ rows: 2, tooltip: item.productMsg }} >{item.productMsg} </Paragraph>}
                            />
                        </Card>
                        
                    </div>
                )
            })}
            <Pagination
                showSizeChanger
                current={current}
                // onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                defaultCurrent={1}
                total={total}
            />
            {/* <List
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
            /> */}
        </>
    )
}

export default SearchPage;