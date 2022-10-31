import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import './css/index.css';
import { List } from 'antd';
import { queryProductByProductMsgApi } from "../../api";
import InfoCard from "../public/InfoCard/index"

function SearchPage() {
    const history = useHistory();
    const location = useLocation();
    const { state }: { state: any } = { ...location };
    const myLoclSearch = localStorage.getItem("myLoclSearch") || state.value;

    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        queryProductByProductMsg();
    }, [state])

    const queryProductByProductMsg = async () => {
        await queryProductByProductMsgApi("/product/queryProductByProductMsg", { params: { productMsg: myLoclSearch } })
            .then((myData) => {
                setSearchData(myData.data)
                console.log(myData.data)
            })
    }
    return (
        <>
            <List
                pagination={{ pageSize: 15 }}
                itemLayout="horizontal"
                dataSource={searchData}
                renderItem={(item: any, index: number) => (
                    <InfoCard key={index} item={item} isflex={false} />
                )}
            />
        </>
    )
}

export default SearchPage;