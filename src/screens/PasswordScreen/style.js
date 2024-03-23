import { COLORS } from "../../utils/colors";



export const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "0px 20px",
        flex: 1,
        height: "100%"
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
    bottom: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        margin: "0px 0px 10px 0px"
    }
}