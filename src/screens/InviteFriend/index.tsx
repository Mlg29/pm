
import React, { useState } from "react"
import Header from "../../components/Header"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import TextInput from "../../components/TextInput"

const InviteFriend = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <div className="top-container">
            <Header 
                text={"Invite Friend"}
            />

            <div style={{display: 'flex', flexDirection: "column", flex: 4}}>
            <TextInput
                    label="Username or Email Address"
                    placeholder="Enter your friend username or email"
                    required
                    value={email}
                    type="email"
                    handleChange={(val: string) => {
                        setEmail(val)
          
                    }}
                />
                  <TextInput
                    label="Amount"
                    placeholder="Enter Amount"
                    required
                    value={amount}
                    handleChange={(val: string) => {
                        setAmount(val)
          
                    }}
                />
            </div>

            <div style={{display: 'flex', flexDirection: "column", flex: 1}}>
            <Button
              text="Place Bet"
              propStyle={{ width: "100%" }}
              handlePress={() => navigate('/options')}
            />
            </div>
        </div>
    )
}

export default InviteFriend