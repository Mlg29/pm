import { COLORS } from "../../utils/colors";


export const styles =  {
    container: {
      
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
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
        width: 110,
        height: 5,
        borderRadius: 10
    },
    inactive: {
        backgroundColor: COLORS.semiGray,
        width: 110,
        height: 5,
        borderRadius: 10
    },
    bg: {
        backgroundColor: COLORS.semiGray,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: "contain",
        width: "100%"
    },
    bottom: {
        paddingTop: '5rem',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center"
    }
}