import { useEffect, useState } from 'react';
import { Table, Button, Space, Avatar, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './css/index.css'
import axios from 'axios';
import qs from "qs"

function ShoppingCartPage() {
    const userName = localStorage.getItem("user");

    const columns = [

        {
            title: '商品',
            render: (text) => <Space><Avatar shape="square" src={text.productRotationImg[0]} onClick={() => { console.log(text) }} /><span>{text.productName}</span></Space>,
        },
        {
            title: '产品规格',
            render: (text) => <Space><span>{text.selectColor}</span><span>{text.selectSize}</span></Space>,
        },
        {
            title: '单价',
            dataIndex: 'productSellingPrice',
            key: 'productSellingPrice',
        },
        {
            title: '数量',
            dataIndex: 'selectNum',
            key: 'selectNum',
            editable: true,
            render: (selectNum, text) => <InputNumber min={1} max={10} defaultValue={selectNum} onChange={(value) => onChange(value, text)} />,
        },
        {
            title: '小计',
            dataIndex: 'selectNum',
            key: 'selectNum',
            editable: true,
            render: (selectNum, text) => <span onChange={(selectedRowKeys, selectedRows) => { console.log(selectedRowKeys, selectedRows) }}> {`￥${(text.productSellingPrice * selectNum).toFixed(2)}`}</span>,
        },
        {
            title: '操作',
            render: (text) => <Button type="primary" danger onClick={() => onDel(text)} icon={<DeleteOutlined />}> 删除 </Button>,
        },
    ]
    // const [shoppingCartData, setShoppingCartData] = useState([
    //     {
    //         productId: 9728109,
    //         productRotationImg: ["http://dummyimage.com/400x500/FF0000", "http://dummyimage.com/400x500/00FF00", "http://dummyimage.com/400x500/0000FF", "http://dummyimage.com/400x500/FF6600",],
    //         productName: "商品名称1",
    //         SelectSize: '小号',
    //         SelectColor: '红色',
    //         productSellingPrice: 199,
    //         SelectNum: 1,
    //     },
    //     {
    //         productId: 9728119,
    //         productRotationImg: ["http://dummyimage.com/400x500/00FF00", "http://dummyimage.com/400x500/0000FF", "http://dummyimage.com/400x500/FF6600",],
    //         productName: "商品名称2",
    //         SelectSize: '中号',
    //         SelectColor: '绿色',
    //         productSellingPrice: 299,
    //         SelectNum: 1,
    //     },
    //     {
    //         productId: 9728100,
    //         productRotationImg: ["http://dummyimage.com/400x500/0000FF", "http://dummyimage.com/400x500/FF6600",],
    //         productName: "商品名称3",
    //         SelectSize: '大号',
    //         SelectColor: '绿色',
    //         productSellingPrice: 299,
    //         SelectNum: 1,
    //     },
    // ])
    const [shoppingCartData, setShoppingCartData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        setSelectedRowKeys([...selectedRowKeys]);
        setSelectedRows([...selectedRows]);
    };
    useEffect(() => {
        console.log("userName", userName)
        queryShopByUserName()
    }, [userName])

    const queryShopByUserName = async () => {
        await axios.get("http://localhost:8787/shop/queryShopByUserName", { params: { userName: userName } })
            .then((val) => {
                setShoppingCartData(val.data)
                console.log("queryShopByUserName", val)
            })
    }



    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onChange = (value, text) => {
        if (value !== null) {
            axios.post("http://localhost:8787/shop/updateShopById", qs.stringify({ selectNum: value, shopId: text.shopId }))
        }
        text.selectNum = value;
        let newShoppingCartData = [...shoppingCartData];
        console.log(value, text, newShoppingCartData);
        setShoppingCartData(newShoppingCartData);
    }

    const onDel = (text) => {
        axios.post("http://localhost:8787/shop/deleteShopbyId", qs.stringify({ shopId: text.shopId }))
            .then((val) => {
                if (val.data) {
                    message.success('商品删除成功');
                    queryShopByUserName()
                }else{
                    message.error('商品删除失败');
                }
                console.log("onDel",val)
            })
    }

    return (
        <>
            <Table
                rowKey="shopId"
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={shoppingCartData}
                summary={() => {
                    let sum = 0;
                    selectedRows.forEach((val) => {
                        sum = sum + (val.productSellingPrice * val.selectNum)
                    })
                    sum = sum.toFixed(2)
                    return (
                        <Table.Summary>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={6}>总计：￥{sum}</Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={4}><Button type="primary" danger onClick={() => { console.log(selectedRows) }}> 结算 </Button></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>)
                }}
            />
        </>
    )
}

export default ShoppingCartPage;