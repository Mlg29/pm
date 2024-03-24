import { COLORS } from "../../utils/colors";


export const styles = {
    container: {
        border: `1px solid ${COLORS.semiGray}`,
        borderRadius: 10,
        padding: 10,
        margin: "0px 0px 20px 0px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    row2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0px 5px 0px"
    },
    box: {
        backgroundColor: COLORS.cream,
        width: "30%",
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontSize: 12
    }
}