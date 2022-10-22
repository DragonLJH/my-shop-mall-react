import { FC, useEffect, useState } from 'react';
import { Table, Button, Space, Avatar, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './css/index.css'
import { queryShopByUserNameApi, updateShopByIdApi, deleteShopbyIdApi } from "../../api";

const ShoppingCartPage: FC = () => {
    const userName = localStorage.getItem("user");

    const columns = [

        {
            title: '商品',
            render: (text: any) => <Space><Avatar shape="square" src={text.productRotationImg[0]} /><span>{text.productName}</span></Space>,
        },
        {
            title: '产品规格',
            render: (text: any) => <Space><span>{text.selectColor}</span><span>{text.selectSize}</span></Space>,
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
            render: (selectNum: any, text: any) => <InputNumber min={1} max={10} defaultValue={selectNum} onChange={(value) => onChange(value, text)} />,
        },
        {
            title: '小计',
            dataIndex: 'selectNum',
            key: 'selectNum',
            editable: true,
            render: (selectNum: any, text: any) => <span> {`￥${(text.productSellingPrice * selectNum).toFixed(2)}`}</span>,
        },
        {
            title: '操作',
            render: (text: any) => <Button type="primary" danger onClick={() => onDel(text)} icon={<DeleteOutlined />}> 删除 </Button>,
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
    const onSelectChange = (aselectedRowKeys: any, aselectedRows: any) => {
        setSelectedRowKeys(aselectedRowKeys);
        setSelectedRows(aselectedRows);
    };
    useEffect(() => {
        console.log("userName", userName)
        queryShopByUserName()
    }, [userName])

    const queryShopByUserName = async () => {
        await queryShopByUserNameApi("/shop/queryShopByUserName", { params: { userName: userName } })
            .then((val) => {
                setShoppingCartData(val.data)
                console.log("queryShopByUserName", val)
            })
    }



    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onChange = (value: any, text: any) => {
        if (value !== null) {
            updateShopByIdApi("/shop/updateShopById", { selectNum: value, shopId: text.shopId }, {})
        }
        text.selectNum = value;
        let newShoppingCartData = [...shoppingCartData];
        console.log(value, text, newShoppingCartData);
        setShoppingCartData(newShoppingCartData);
    }

    const onDel = (text: any) => {
        deleteShopbyIdApi("/shop/deleteShopbyId", { shopId: text.shopId }, {})
            .then((val) => {
                if (val.data) {
                    message.success('商品删除成功');
                    queryShopByUserName()
                } else {
                    message.error('商品删除失败');
                }
                console.log("onDel", val)
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
                    selectedRows.forEach((val: any) => {
                        sum = sum + (val.productSellingPrice * val.selectNum)
                    })
                    sum = parseFloat(sum.toFixed(2))
                    return (
                        <Table.Summary>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={6}>总计：￥{sum}</Table.Summary.Cell>
                                <Table.Summary.Cell index={1} colSpan={4}><Button type="primary" danger onClick={() => { console.log(selectedRows) }}> 结算 </Button></Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>)
                }}
            />
        </>
    )
}

export default ShoppingCartPage;