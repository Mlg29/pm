import React from 'react'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors';
import noLogo from "../../assets/images/no.jpg"
import { useNavigate } from "react-router-dom"



type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';


export const styles = {
    container: {
        border: `1px solid ${COLORS.semiGray}`,
        borderRadius: 10,
        padding: 10,
        margin: "0px 0px 20px 0px"
    },
    row: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        alignItems: "center",
        justifyContent: "space-between",

    },
    row2: {
        display: "flex",
        flexDirection: "row" as FlexDirection,
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0px 5px 0px"
    },
    box: {
        backgroundColor: COLORS.cream,
        width: "45%",
        padding: 5,
        display: "flex",
        justifyContent: "center",
        fontSize: "8px",
        fontWeight: 600
    }
}





function TennisGameCard({id, data}) {
    const navigate = useNavigate()





  return (
    <div key={id} style={{...styles.container, cursor: "pointer"}} onClick={() => navigate("/game-details", {state: {data: data, gameType: "Tennis"}})}>
        <div style={{...styles.row}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "40%"}}>
                <p style={{...FONTS.body7, fontSize: "8px", margin: "0px 0px 10px 0px"}}>{data?.tournamentName}</p>
              
                {
                !data?.player1Url ? <img src={noLogo} style={{width: '30px'}} /> : <img src={data?.player1Url} style={{width: '20px'}} />
               }
                <p style={{...FONTS.body7,fontSize: "8px", margin: "10px 0px 0px 0px"}}>{data?.player[0]['@name']}</p>
            </div>
            <div>
                {/* <p style={{...FONTS.body7,fontSize: "8px",padding: "2px 5px", backgroundColor: COLORS.red, textAlign: 'center', borderRadius: 10, color: COLORS.white}}>{data?.internalStatus}</p> */}
                <h3 style={{...FONTS.h5,textAlign: "center", margin: "10px 0px 0px 0px"}}>{data?.player[0]['@totalscore']} - {data?.player[1]['@totalscore']}</h3>
                <p style={{...FONTS.body7,fontSize: "8px", textAlign: 'center'}}>{data?.status}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', width: "40%"}}>
                <p style={{...FONTS.body7, fontSize: "8px", margin: "0px 0px 10px 0px"}}>ID: {data?.id}</p>
               {
                !data?.player2Url ? <img src={noLogo} style={{width: '30px'}} /> : <img src={data?.player2Url} style={{width: '20px'}} />
               }
                
                <p style={{...FONTS.body7, fontSize: "8px", margin: "10px 0px 0px 0px"}}>{data?.player[1]['@name']}</p>
            </div>

        </div>

        <div style={{...styles.row2}}>
            <div style={{...styles.box}}>{data?.player[0]['@name']} Win</div>
            {/* <div style={{...styles.box}}>Draw</div> */}
            <div style={{...styles.box}}>{data?.player[1]['@name']} Win</div>
        </div>


    </div>
  )
}

export default TennisGameCard
