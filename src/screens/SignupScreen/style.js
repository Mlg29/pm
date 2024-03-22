import { COLORS } from "../../utils/colors";



export const styles = {
    container: {
        padding: "0px 20px"
    },
    line: {
        display: "flex",
        flexDirection: "row",
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
}