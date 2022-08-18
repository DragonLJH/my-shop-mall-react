import { useEffect, useState } from 'react';
import './css/index.css'
import axios from 'axios';
import EmergeCart from "../public/emergeCart/index"
import Rotation from "../public/rotation/index"

function HomePage() {
    const [emergeData, setEmergeData] = useState([])

    const queryAllEmerge = async () => {
        await axios.get("http://localhost:8787/emerge/queryAllEmerge").then((res) => {
            console.log(res)
            setEmergeData(res.data)
        })
    }
    useEffect(() => {
        queryAllEmerge();
    }, [])

    return (
        <>
            <div><Rotation /></div>
            <div>
                {emergeData.map((item, key) => {
                    return <div key={key}><EmergeCart val={item} /></div>
                })}
            </div>
        </>
    )
}

export default HomePage;