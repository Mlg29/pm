import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { FONTS } from "../../utils/fonts"
import house from "../../assets/images/house.svg"
import { COLORS } from "../../utils/colors"


function BankTransfer() {
    const navigate = useNavigate()


    return (
        <div className="top-container">
            <Header
                text="Bank Transfer"
            />

            <div>
                <p style={{ ...FONTS.body7, textAlign: 'center', fontWeight: '400' }}>Amount</p>
                <h3 style={{ ...FONTS.h4, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>20,000.00</h3>
                <p style={{ ...FONTS.body7, textAlign: 'center', fontWeight: '400' }}>Transfer NGN 20,620 to the account number below.  Copy the details and paste them into your banking app. Kindly note that this account should be used solely for this transaction.</p>
            </div>

            <div style={{margin: "2rem 0px 0px 0px", padding: "1rem", backgroundColor: COLORS.cream, borderRadius: 10}}>
                <div style={{display: 'flex', alignItems: "center"}}>
                    <img src={house} />
                    <h3 style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>Bank Details</h3>
                </div>

                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Account Number</p>
                    <h3 style={{...FONTS.h6}}>0987654321</h3>
                </div>
                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Account Name</p>
                    <h3 style={{...FONTS.h6}}>PlayZeet</h3>
                </div>
                <div style={{display: 'flex', flexDirection: "column",margin: "1rem 0px 0px 0px"}}>
                    <p style={{...FONTS.body7, color: COLORS.gray}}>Bank Name</p>
                    <h3 style={{...FONTS.h6}}>Access Bank</h3>
                </div>

            </div>

            <p style={{...FONTS.body7, textAlign: 'center', margin: "2rem 0px", color: COLORS.gray}}>Expires in 29:59</p>
       
            <div style={{margin: "2rem 0px 0px 0px", padding: "1rem", backgroundColor: COLORS.cream, borderRadius: 10}}>
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <h3 style={{...FONTS.h6, margin: "0px 0px 0px 10px"}}>I’ve sent the money</h3>
                </div>
            </div>
       
        </div>
    )
}

export default BankTransfer
