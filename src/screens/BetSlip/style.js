import { COLORS } from "../../utils/colors";



export const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabs: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.semiGray,
        borderRadius: "5px",
        margin: "1rem 0px",
    },
    tb: {
        width: "31%",
        display: "flex",
        justifyContent: "center",
        padding: 10,
        margin: "5px",
        borderRadius: "5px"
    },
    rowBtw: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: "0.5px solid gray"
    },
    row: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0px"
    }
}