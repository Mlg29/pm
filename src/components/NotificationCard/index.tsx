import moment from "moment";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { styles } from "./style";
import { useNavigate } from "react-router-dom";

function NotificationCard(props: any) {
  const navigate = useNavigate();
  const { header, message, date, showBtn, data, handleRead } = props;
  return (
    <div style={{ ...styles.container }}>
      <div
        style={{ cursor: "pointer" }}
       // onClick={() => navigate("/challenge-detail")}
        onClick={() => data?.status === "READ" ? () => {} : handleRead(data?.id)}
      >
        <p style={{ ...FONTS.body7 }}>
          {moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p style={{ ...FONTS.h6, margin: "5px 0px", color: data?.status === "READ" ? "gray" : "black" }}>{data?.title}</p>
        <p style={{ ...FONTS.h7, color: data?.status === "READ" ? "gray" : "black" }}>{data?.message}</p>
      </div>

      {/* {
        showBtn ?   <div style={{...styles.row}}>
        <div style={{...styles.btn, backgroundColor: COLORS.primary, borderRadius: 10, padding: "10px 0px", cursor: "pointer"}} onClick={() => navigate("/options")}>
            <p style={{...FONTS.body6, color: COLORS.white, textAlign: 'center'}}>Accept</p>
        </div>
        <div style={{...styles.btn, backgroundColor: COLORS.cream, borderRadius: 10, padding: "10px 0px", cursor: "pointer"}} onClick={() => navigate("/adjust-bet")}>
            <p style={{...FONTS.body6, color: COLORS.primary, textAlign: 'center'}}>Adjust Stake</p>
        </div>
      </div>
      : null
    } */}
    </div>
  );
}

export default NotificationCard;
