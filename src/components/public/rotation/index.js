import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Carousel, Row, Col, List, Typography } from 'antd';
import axios from "axios";
const { Text, Link } = Typography;

function Rotation() {

    const history = useHistory();
    const [rotationData, setRotationData] = useState([])

    const [typeDate, setTypeDate] = useState([])

    useEffect(() => {
        queryAllRotation();
        queryAllType();
    }, [])

    const queryAllRotation = async () => {
        await axios.get("http://localhost:8787/rotation/queryAllRotation")
            .then((res) => {
                setRotationData(res.data);
            })
    }

    const queryAllType = () => {
        axios.get("http://localhost:8787/type/queryAllType").then((val) => {
            setTypeDate(val.data)
        })
    }

    const toProductDetailsPage = (value) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }

    const toTypePage = (e) => {
        let value = e.target.innerText
        localStorage.removeItem("typeTitle");
        localStorage.setItem("typeTitle", value);
        history.replace({ pathname: "/typePage", state: { value } })
    }

    return (
        <>
            <div >
                <Row wrap={false}>
                    <Col flex="300px">
                        <List
                            bordered
                            dataSource={typeDate}
                            renderItem={item => (
                                <List.Item>
                                    <Link onClick={toTypePage}>
                                        {item.typeTitle}
                                    </Link>
                                </List.Item>
                            )}
                        />

                    </Col>
                    <Col flex="auto"><Carousel autoplay>
                        {rotationData.map((val, key) => {
                            return <div style={{ width: "100%" }} key={key} onClick={() => { return toProductDetailsPage(val.productId) }}><img src={val.rotationImg} style={{ width: "100%" }} /></div>
                        })}
                    </Carousel></Col>
                </Row>

            </div>
        </>
    )
}

export default Rotation;