import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import key from "../../assets/images/key.svg"
import lock from "../../assets/images/lock.svg"
import scan from "../../assets/images/finger-scan.svg"
import { FONTS } from "../../utils/fonts"
import arrowright from "../../assets/images/arrow-right.svg"
import Form from 'react-bootstrap/Form';
import Button from "../../components/Button"





const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        padding: "1rem 0px"
    }
}

function Preference() {
    const navigate = useNavigate()

    const dataList = [
        {
            id: 1,
            name: "Bet Events",

        },
        {
            id: 2,
            name: "Bet Challenge",
        },
        {
            id: 3,
            name: "Follow opponent’s game",
        },
        {
            id: 4,
            name: "Maintenance",
        },
        {
            id: 5,
            name: "Announcement",
        }
    ]


    return (
        <div className='top-container'>
            <Header
                text="Notification"

            />

            <div style={{ display: "flex", flexDirection: 'column', flex: 5 }}>
                {
                    dataList?.map((data: any) => {
                        return <div key={data?.id} style={{ ...styles.row }}>
                            <img src={data?.image} onClick={data?.handleRoute} />
                            <div onClick={data?.handleRoute} style={{ margin: "0px 10px", width: "100%" }}>
                                <h3 style={{ ...FONTS.body6, margin: "0px" }}>{data?.name}</h3>
                            </div>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                style={{ transform: 'scale(1.7)' }}
                            />

                        </div>
                    })
                }
            </div>

            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
                <div style={{ width: "100%" }}>
                    <Button
                        text="Save"
                        propStyle={{ width: "100%" }}
                        handlePress={() => navigate('/secret-question')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Preference
