import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import TextInput from "../../components/TextInput"
import DatePickerComponent from "../../components/DatePickerComponent"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"



function BankWithdraw() {
    const navigate = useNavigate()
    return (
        <div className="top-container" style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
            <Header
                text="Withdraw"
            />
            <div style={{ display: "flex", flexDirection: "column", flex: 5, }}>

                <Dropdown
                    label="Bank Name"
                    required
                    placeholder="Select Bank Name"
                    data={[]}

                />

                <TextInput
                    label="Account Number"
                    placeholder="Enter your account number"
                    required
                />

                <TextInput
                    label="Amount"
                    placeholder="₦0.00"
                    required
                />

            </div>

            <div style={{ display: "flex", flex: 1, }}>
                <div style={{ width: "100%" }}>
                    <Button
                        text="Proceed"
                        propStyle={{ width: "100%" }}
                        handlePress={() => navigate('/home')}
                    />
                </div>
            </div>
        </div>
    )
}

export default BankWithdraw
