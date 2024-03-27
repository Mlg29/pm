import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { FONTS } from "../../utils/fonts"
import house from "../../assets/images/house.svg"
import card from "../../assets/images/card.svg"
import paypal from "../../assets/images/paypal.svg"
import arrowright from "../../assets/images/arrow-right.svg"


const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        padding: "1rem 0px"
    }
}

function PaymentOptions() {
    const navigate = useNavigate()

    const dataList = [
        {
            id: 1,
            name: "Bank Transfer",
            text: "Make a transfer directly from your wallet.",
            image: house,
            handleRoute: () => navigate("/bank-transfer")
        },
        {
            id: 2,
            name: "Credit/Debit Card",
            text: "Add funds instantly using your bank card.",
            image: card,
            handleRoute: () => navigate("/wallet-pin")
        },
        {
            id: 3,
            name: "Paypal",
            text: "Add funds instantly using your bank card.",
            image: paypal,
            handleRoute: () => navigate("/fund-wallet")
        }
    ]
    return (
        <div className="top-container">
            <Header
                text="Payment Options"
            />
            <p style={{ ...FONTS.body6, margin: "2rem 0px" }}>Select your preferred method to top up your wallet.</p>

            <div>
                {
                    dataList?.map((data: any) => {
                        return <div key={data?.id} style={{ ...styles.row }} onClick={data?.handleRoute}>
                            <img src={data?.image} />
                            <div style={{ margin: "0px 10px", width: "100%" }}>
                                <h3 style={{ ...FONTS.h6, margin: "0px" }}>{data?.name}</h3>
                                <p style={{ ...FONTS.body7, margin: "5px 0px" }}>{data?.text}</p>
                            </div>
                            <img src={arrowright} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default PaymentOptions
