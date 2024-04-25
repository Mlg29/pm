import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FONTS } from "../../utils/fonts";

import { MdArrowBackIos } from "react-icons/md";
import { COLORS } from "../../utils/colors";
import { GoCircle } from "react-icons/go";
import Button from "../../components/Button";
import OtpComponent from "../../components/OtpComponent";
import CustomeKeyboard from "../../components/CustomKeyboard";
import TextInput from "../../components/TextInput";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FlexDirection } from "../../utils/type";
import BackButton from "../../components/BackButton";
import { useMediaQuery } from "react-responsive";



export const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        padding: "0px 20px",
        flex: 1,
        height: "100%"
    },
    line: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 20px 0px 20px"
    },
    active: {
        backgroundColor: COLORS.primary,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    inactive: {
        backgroundColor: COLORS.semiGray,
        width: 60,
        height: 5,
        borderRadius: 10
    },
    bottom: {
        display: 'flex',
        flexDirection: "column" as FlexDirection,
        justifyContent: 'center',
        alignItems: "center",
        margin: "0px 0px 10px 0px"
    }
}

function TransactionPin() {
    const [step, setStep] = useState(3)
    const [terms, setTerms] = useState(false)
    const navigate = useNavigate();
    const [pin, setPin] = useState("")
    const [confirmPin, setConfirmPin] = useState("")
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const stepLevel = () => {
        if (step === 0) {
            return (
                <div style={{ ...styles.line }}>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                </div>
            )
        }
        else if (step === 1) {
            return (
                <div style={{ ...styles.line }}>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                </div>
            )
        }
        else if (step === 2) {
            return (
                <div style={{ ...styles.line }}>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                </div>
            )
        }
        else if (step === 3) {
            return (
                <div style={{ ...styles.line }}>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.inactive }}></div>
                </div>
            )
        }
        else if (step === 4) {
            return (
                <div style={{ ...styles.line }}>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.inactive }}></div>
                    <div style={{ ...styles.active }}></div>
                </div>
            )
        }
        else {

        }
    }




    return (
        <div style={{ ...styles.container }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 3 }}>
           {
            isMobile && <>
               <div style={{ marginTop: 10 }}>
                <BackButton />
            </div>
            {stepLevel()}
            </>
           }
         

            <div>
                {
                    isMobile &&  <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Create Transaction PIN</h3>
                }
               
                <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Enter a 6-digit PIN for transaction authorization.</p>
            </div>

            <div style={{ marginTop: 20 }}>

                <TextInput
                    label="Pin"
                    placeholder="Enter your pin"
                    required
                    value={pin}
                    type="password"
                    handleChange={(val: string) => {
                        setPin(val)
          
                    }}
                />

 

                <TextInput
                    label="Confirm Pin"
                    placeholder="Enter your pin"
                    required
                    type="password"
                    value={confirmPin}
                    handleChange={(val: string) => {
                        setConfirmPin(val)
                    }}
                />
                </div>
            </div>

            <div style={{ display: "flex",flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <div style={{ ...styles.bottom }}>
                    <div style={{ width: "100%" }}>
                        {
                            isMobile ? <Button
                            text="Continue"
                            propStyle={{ width: "100%" }}
                            handlePress={() => navigate('/secret-question')}
                        />
                        :
                        <Button
                            text="Submit"
                            propStyle={{ width: "100%" }}
                           // handlePress={() => navigate('/secret-question')}
                        />
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TransactionPin
