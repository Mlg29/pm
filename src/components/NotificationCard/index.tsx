import moment from "moment";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { styles } from "./style";
import { useNavigate } from "react-router-dom";

function NotificationCard(props: any) {
  const navigate = useNavigate();
  const { header, message, date, showBtn, data, handleRead } = props;



  const handleRoute = (data) => {
    handleRead(data?.id)
    navigate(`/bet-adjust?${data?.content?.adjustmentId}`)
  }


  const handleRouteChallenge = (data) => {
    handleRead(data?.id)
    navigate(`/bet-invite-detail?${data?.content?.betId}`)
  }

  return (
    <div style={{ ...styles.container }}>
      <div
        style={{ cursor: "pointer" }}

        onClick={() => data?.status === "READ" ? () => { } : handleRead(data?.id)}
      >
        <p style={{ ...FONTS.body7 }}>
          {moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p style={{ ...FONTS.h6, margin: "5px 0px", color: data?.status === "READ" ? "gray" : "black" }}>{data?.title}</p>
        <p style={{ ...FONTS.h7, color: data?.status === "READ" ? "gray" : "black" }}>{data?.message}</p>
      </div>
      {
        data?.type === "BET_ADJUSTED_BR" ?
          <div style={{ cursor: "pointer", marginTop: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.orange, textDecoration: 'underline' }} onClick={() => handleRoute(data)}>View Detail</p>
          </div>
          : null
      }
      {
        data?.type === "BET_INVITATION" ?
          <div style={{ cursor: "pointer", marginTop: 10 }}>
            <p style={{ ...FONTS.body7, color: COLORS.orange, textDecoration: 'underline' }} onClick={() => handleRouteChallenge(data)}>View Detail</p>
          </div>
          : null
      }
    </div>
  );
}

export default NotificationCard;
