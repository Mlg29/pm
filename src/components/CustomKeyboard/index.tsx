// @ts-ignore
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { 
        PiNumberOneBold, 
        PiNumberTwoBold, 
        PiNumberThreeBold, 
        PiNumberFourBold,
        PiNumberFiveBold,
        PiNumberSixBold,
        PiNumberSevenBold,
        PiNumberEightBold,
        PiNumberNineBold,
        PiNumberZeroBold 
} from "react-icons/pi";
import { TbFaceIdError } from "react-icons/tb";
import { COLORS } from "../../utils/colors.js";

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export const styles = {
    container: {
        width: "100%",
        padding: "17px"
    },
    row: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-around",
        width: "100%",
        margin: "20px 0px 0px 0px"
    },
    box: {
         width: 80,
         height: 80,
         display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: "50%",
        background: `${COLORS.semiGray}`,
        cursor: "pointer"
    },
    box2: {
        width: 80,
        height: 80,
        display: 'flex',
       justifyContent: "center",
       alignItems: 'center',
       borderRadius: "50%",
       cursor: "pointer"
    }
}

function CustomeKeyboard(props: any) {
    const {isFaceId, value, setValue} = props


    const cancel = () => {
        const newStr = value?.slice(0, -1);
        setValue(newStr)

    }


    return (
        <div>
            <div>
                <div style={{...styles.row}}>
                    <div style={{...styles.box}} onClick={() => setValue(value + "1")}>
                        <PiNumberOneBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "2")}>
                        <PiNumberTwoBold  size={30}/>
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "3")}>
                        <PiNumberThreeBold size={30} />
                    </div>
                </div>
                <div style={{...styles.row}}>
                    <div style={{...styles.box}} onClick={() => setValue(value + "4")}>
                        <PiNumberFourBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "5")}>
                        <PiNumberFiveBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "6")}>
                        <PiNumberSixBold size={30} />
                    </div>
                </div>
                <div style={{...styles.row}}>
                    <div style={{...styles.box}} onClick={() => setValue(value + "7")}>
                        <PiNumberSevenBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "8")}>
                        <PiNumberEightBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "9")}>
                        <PiNumberNineBold size={30} />
                    </div>
                </div>
                <div style={{...styles.row}}>
                    <div style={{...styles.box2}}>
                        {
                            isFaceId ? <TbFaceIdError  size={70} color={COLORS.gray} /> : null
                        }
                        {/* <MdOutlineCancel size={30} />  */}
                    </div>
                    <div style={{...styles.box}} onClick={() => setValue(value + "0")}>
                        <PiNumberZeroBold size={30} />
                    </div>
                    <div style={{...styles.box}} onClick={() => cancel()}>
                        <MdCancelPresentation size={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomeKeyboard
