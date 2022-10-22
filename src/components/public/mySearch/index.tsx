import { FC, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Divider, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import "./css/index.css"
const { Search } = Input;

const MySearch: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = { ...location };
    const onSearch = (value: string, event: any) => {
        console.log(value, event)
        // Hash history cannot PUSH the same path; a new entry will not be added to the history stack
        // 哈希历史不能推送相同的路径；新条目将不会添加到历史堆栈中
        // history.push({ pathname: "/searchPage", state: { value } });
        localStorage.setItem("myLoclSearch", value)
        history.replace({ pathname: "/searchPage", state: { value } });
    }
    const [inputVal, setInputVal] = useState("")
    const onClick = () => {
        localStorage.setItem("myLoclSearch", inputVal)
        history.replace({ pathname: "/searchPage", state: { value: inputVal } });
        setInputVal("")
    }
    const mySearchDivMsg = ["男鞋", "女鞋", "男衬衫", "女卫衣", "包包", "背包"]
    return (
        <>
            {pathname === "/loginPage" ? "" :
                <Row gutter={40} style={{ backgroundColor: "#fff" }} align="middle">
                    <Col flex="300px" >
                        <Divider style={{ cursor: "pointer" }}> <span onClick={() => { history.replace({ pathname: "/" }); }}> DragonLogo</span> </Divider>
                    </Col>
                    <Col flex="auto">
                        {/* <Search placeholder="请输入查询信息" enterButton="Search" size="large" onSearch={onSearch} /> */}
                        <div className="my-search-div">
                            <div className="my-search-div-input">
                                <input type="text" value={inputVal} onInput={(e: any) => { setInputVal(e.target.value) }} />
                                <span className="my-search-div-input-button" onClick={onClick}>搜索</span>
                            </div>
                            <div className="my-search-div-msg">
                                {mySearchDivMsg.map((item, index) => {
                                    return <span key={index} className="item">{item}</span>
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col flex="300px" >
                        <Divider style={{ cursor: "pointer" }}> <ShoppingCartOutlined /><span onClick={() => { history.replace({ pathname: "/shoppingCartPage" }); }}> 购物车</span> </Divider>
                    </Col>
                </Row>
            }
        </>
    )
}

export default MySearch;