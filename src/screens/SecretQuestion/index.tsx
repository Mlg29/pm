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
import Dropdown from "../../components/Dropdown";
import { FlexDirection } from "../../utils/type";



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


function SecretQuestion() {
    const [step, setStep] = useState(4)
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("")


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
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
                    <div style={{ ...styles.active }}></div>
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
                <div style={{ marginTop: 10 }} onClick={() => navigate(-1)}>
                    <MdArrowBackIos size={20} style={{ padding: "16px", background: COLORS.semiGray, borderRadius: 100 }} />
                </div>
                {stepLevel()}

                <div>
                    <h3 style={{ ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', margin: "10px 0px" }}>Secret Question</h3>
                    <p style={{ ...FONTS.body5, textAlign: 'center', fontWeight: '400' }}>Enter a question you would remember.</p>
                </div>

                <div style={{ marginTop: 20 }}>

                    <Dropdown
                        label="Secret Question"
                        required
                        data={[
                            {
                                id: 1,
                                value: "What is your favourite pet?"
                            },
                            {
                                id: 2,
                                value: "Who is your favourite cousin?"
                            },
                            {
                                id: 3,
                                value: "Who is your favourite cousin?"
                            },
                            {
                                id: 4,
                                value: "Who is your favourite cousin?"
                            },
                            {
                                id: 5,
                                value: "Others"
                            }
                        ]}
                        placeholder="Select Secret Question"

                    />

                    <TextInput
                        label="Secret Question Answer"
                        placeholder="Enter Answer here"
                        required
                        value={answer}
                        handleChange={(val: string) => {
                            setAnswer(val)
                        }}
                    />

                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                <div style={{ ...styles.bottom }}>
                    <div style={{ width: "100%" }}>
                        <Button
                            text="Continue"
                            propStyle={{ width: "100%" }}
                            handlePress={() => navigate('/auth-success')}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SecretQuestion
