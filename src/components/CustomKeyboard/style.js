import { COLORS } from "../../utils/colors";


export const styles = {
    container: {
        width: "100%",
        padding: "17px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
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
        background: `${COLORS.semiGray}`
    },
    box2: {
        width: 80,
        height: 80,
        display: 'flex',
       justifyContent: "center",
       alignItems: 'center',
       borderRadius: "50%",
    }
}