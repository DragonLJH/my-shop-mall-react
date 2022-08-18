import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Divider, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Search } = Input;

function MySearch() {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = { ...location };
    const onSearch = (value, event) => {
        console.log(value, event)
        // Hash history cannot PUSH the same path; a new entry will not be added to the history stack
        // 哈希历史不能推送相同的路径；新条目将不会添加到历史堆栈中
        // history.push({ pathname: "/searchPage", state: { value } });
        localStorage.setItem("myLoclSearch", value)
        history.replace({ pathname: "/searchPage", state: { value } });
    }
    return (
        <>
            {pathname === "/loginPage" ? "" :
                <Row gutter={40} style={{ backgroundColor: "#fff" }} align="bottom">
                    <Col flex="300px" ><Divider style={{ cursor: "pointer" }}> <span onClick={() => { history.replace({ pathname: "/" }); }}> DragonLogo</span> </Divider></Col>
                    <Col flex="auto">
                        <Search placeholder="input search text" enterButton="Search" size="large" onSearch={onSearch} />
                    </Col>
                    <Col flex="300px" ><Divider style={{ cursor: "pointer" }}> <ShoppingCartOutlined /><span onClick={() => { history.replace({ pathname: "/shoppingCartPage" }); }}> 购物车</span> </Divider></Col>
                </Row>
            }
        </>
    )
}

export default MySearch;