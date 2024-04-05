import { COLORS } from "../../utils/colors"
import { FONTS } from "../../utils/fonts"
import { FlexDirection } from "../../utils/type"
import loss from "../../assets/images/loss.svg"
import draw from "../../assets/images/draw.svg"
import win from "../../assets/images/win.svg"

const styles = {
    box: {
        display: "flex",
        flexDirection: "column" as FlexDirection,
        marginTop: "1rem",
        backgroundColor: COLORS.lightGray,
        padding: "8px 16px",
        borderRadius: "10px"
    },
    row: {
        display: "flex",
        alignItems: 'center',
        padding: "10px 0px 0px 0px"
    }
}
function AllTime(props: any) {
    const {homeTeam, awayTeam, homeImage, awayImage, homeLastFive, awayLastFive} = props


  return (
    <div style={{...styles.box}}>
        <div style={{...styles.row}}>
            <img src={homeImage} />
            <p style={{...FONTS.body6, width: "70%", marginLeft: "5px"}}>{homeTeam}</p>
            {
                homeLastFive?.map(dd => {
                    return <div style={{margin: "0px 3px"}}>
                        {
                             dd === "W" ? <img src={win} /> : dd === "draw" ? <img src={draw} /> : <img src={loss} />
                        }
                    </div>
                })
            }
        </div>
        <div style={{...styles.row}}>
            <img src={awayImage} />
            <p style={{...FONTS.body6, width: "70%", marginLeft: "5px"}}>{awayTeam}</p>
            {
                awayLastFive?.map(dd => {
                    return <div style={{margin: "0px 3px"}}>
                    {
                         dd === "W" ? <img src={win} /> : dd === "draw" ? <img src={draw} /> : <img src={loss} />
                    }
                </div>
                })
            }
        </div>
    
    </div>
  )
}

export default AllTime
