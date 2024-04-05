import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import key from "../../assets/images/key.svg"
import lock from "../../assets/images/lock.svg"
import scan from "../../assets/images/finger-scan.svg"
import { FONTS } from "../../utils/fonts"
import arrowright from "../../assets/images/arrow-right.svg"
import Form from 'react-bootstrap/Form';
import Button from "../../components/Button"
import verify from "../../assets/images/verify.svg"
import { useState } from "react"
import { COLORS } from "../../utils/colors"




const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        padding: "1rem 10px"
    }
}

function Language() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState("English")


    const dataList = [
        {
            id: 1,
            name: "English",

        },
        {
            id: 2,
            name: "Arabic",
        },
        {
            id: 3,
            name: "French",
        },
        {
            id: 4,
            name: "German",
        },
        {
            id: 5,
            name: "Hindi",
        }
    ]


    return (
        <div className='top-container'>
            <Header
                text="Language Preference"

            />

            <h3 style={{...FONTS.h4}}>Select Language</h3>
            <p style={{...FONTS.body7, marginBottom: '10px'}}>Choose the language that best suits you for an enhanced user experience.</p>

            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
                {
                    dataList?.map((data: any) => {
                        return <div key={data?.id} onClick={() => setSelected(data?.name)} style={{ ...styles.row, backgroundColor: selected === data?.name ? COLORS.cream : COLORS.white, borderRadius: 10 }}>
                            <img src={data?.image} onClick={data?.handleRoute} />
                            <div onClick={data?.handleRoute} style={{ margin: "0px 10px", width: "100%" }}>
                                <h3 style={{ ...FONTS.body6, margin: "0px" }}>{data?.name}</h3>
                            </div>
                            {
                                selected === data?.name ? <img src={verify} /> : null
                            }
                           

                        </div>
                    })
                }
            </div>

         
        </div>
    )
}

export default Language
