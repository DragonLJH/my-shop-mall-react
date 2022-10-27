import { FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Carousel, Row, Col, List, Typography } from 'antd';
import { queryAllRotationApi, queryAllTypeApi } from "../../../api";
import "./css/index.css"
const { Text, Link } = Typography;

const Rotation: FC = () => {

    const history = useHistory();
    const [rotationData, setRotationData] = useState([])

    const [typeDate, setTypeDate] = useState([])

    useEffect(() => {
        queryAllRotation();
        queryAllType();
    }, [])

    const queryAllRotation = async () => {
        await queryAllRotationApi("/rotation/queryAllRotation", {})
            .then((res) => {
                setRotationData(res.data);
            })
    }

    const queryAllType = async () => {
        await queryAllTypeApi("/type/queryAllType", {}).then((val) => {
            console.log(val)
            setTypeDate(val.data)
        })
    }

    const toProductDetailsPage = (value: string) => {
        localStorage.removeItem("ProductDetailsProductId");
        localStorage.setItem("ProductDetailsProductId", value);
        history.replace({ pathname: "/productDetailsPage", state: { value } })
    }

    const toTypePage = (e: any) => {
        let value = e.target.innerText
        localStorage.removeItem("typeTitle");
        localStorage.setItem("typeTitle", value);
        history.replace({ pathname: "/typePage", state: { value } })
    }

    return (
        <div className="rotation">
            {/* <List
                bordered
                dataSource={typeDate}
                renderItem={(item: any) => (
                    <List.Item>
                        <Link onClick={toTypePage}>
                            {item.typeTitle}
                        </Link>
                    </List.Item>
                )}
            /> */}
            <div className="rotation-left">
                <div className="rotation-left-title">
                    分类
                </div>
                <div className="rotation-left-msg">
                    {typeDate.map((item: any, index: number) => {
                        return (<div className="rotation-left-msg-item" key={index}>
                            <Link onClick={toTypePage}>
                                {item.typeTitle}
                            </Link>
                        </div>)
                    })}
                </div>
            </div>

            <div className="rotation-main">
                <Carousel autoplay>
                    {rotationData.map((val: any, key: number) => {
                        return (
                            <div className="carousel-div" key={key} onClick={() => { return toProductDetailsPage(val.productId) }}>
                                <img className="carousel-div-img" src={val.rotationImg} />
                            </div>
                        )
                    })}
                </Carousel>
            </div>
            <div className="rotation-right">
                <div className="rotation-right-title">
                </div>
                <div className="rotation-right-msg">
                </div>
            </div>

        </div>
    )
}

export default Rotation;