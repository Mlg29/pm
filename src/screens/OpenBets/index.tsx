import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { FONTS } from "../../utils/fonts";
import milan from "../../assets/images/millan.svg";
import roma from "../../assets/images/roma.svg";
import futsol from "../../assets/images/futsol.svg";
import { COLORS } from "../../utils/colors";
import { FlexDirection, OverflowX } from "../../utils/type";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { getOpenBet } from "../../redux/slices/BetSlice";
import EmptyState from "../../components/EmptyState";
import { getUserData } from "../../redux/slices/AuthSlice";
import { formatCurrency } from "../../utils/helper";
import Loader from "../../components/Loader";
import { useMediaQuery } from "react-responsive";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { FaTableTennis } from "react-icons/fa";
import { FaHorseHead } from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";
import { SiUfc } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { GiSportMedal } from "react-icons/gi";
import { SiDart } from "react-icons/si";
import { FaVolleyball } from "react-icons/fa6";
import { TbPlayHandball } from "react-icons/tb";
import { MdSportsRugby } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";
import { getFxRate } from "../../redux/slices/MiscSlice";
import FilterModal from "../../components/Modals/FilterModal";

const styles = {
  contain: {
    padding: 15,
    border: `1px solid ${COLORS.semiGray}`,
    borderRadius: 10,
    margin: "10px 0px 20px 0px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
    borderBottom: `1px solid ${COLORS.semiGray}`,
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
  },
  horseRow: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto" as OverflowX,
    whiteSpace: "nowrap",
  },
};

function OpenBet() {
  const navigate = useNavigate();
  const location = useLocation();
  const userSelection = location?.state?.userSelection;
  const game = location?.state?.game;
  const gameType = location?.state?.gameType;
  const dispatch = useAppDispatch();
  const [openBets, setOpenBets] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [exRate, setExRate] = useState(null)
  const [exchangeRates, setExchangeRates] = useState({});

  const handleFxRate = async (amount, currency, index) => {
    const rateData = {
      sourceCurrency: "USD",
      destinationCurrency: "NGN",
      amount: amount,
    };




    await dispatch(getFxRate(rateData)).then((pp) => {
      var expectedAmount = null;

      if (currency !== "USD") {
        expectedAmount = amount / pp?.payload?.data?.rate
      }
      else {
        expectedAmount = amount * pp?.payload?.data?.rate
      }
      setExchangeRates((prevRates) => ({
        ...prevRates,
        [index]: expectedAmount,
      }));
    });
  };


  // console.log({ exchangeRates })

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleTypeCheck = (val: any) => {
    if (selected === val) {
      setSelected("");
    } else {
      setSelected(val);
    }
  };


  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
    } else {
    }
  };





  useEffect(() => {
    fetchUserInfo();

  }, []);

  useEffect(() => {
    const payload = {
      page: 1,
      pageSize: 20,
      id: userSelection?.sportEventId,
      outcome: userSelection?.userType,
    };
    setLoader(true);
    dispatch(getOpenBet(payload)).then((pp) => {
      setOpenBets(pp?.payload?.data);
      setLoader(false);
    });
  }, [userSelection?.sportEventId]);

  const handleCreate = () => {
    return navigate("/create-bet", {
      state: { game: game, gameType: gameType },
    });
  };

  const handleAccept = async (data) => {
    const rateData = {
      sourceCurrency: "USD",
      destinationCurrency: "NGN",
      amount: data?.betAmount
    }
    const newAmount = await dispatch(getFxRate(rateData)).then(pp => {

      return pp?.payload?.data
    })



    // const rate = newAmount?.rate * parseInt(data?.betAmount)
    var rate2 = null;

    if (userData?.defaultCurrency === "USD") {
      rate2 = parseInt(data?.betAmount) / newAmount?.rate
    }
    else {
      rate2 = parseInt(data?.betAmount) * newAmount?.rate
    }

    // console.log({ newAmount }, rate2)
    const rateByCurrency = data?.betCurrency === userData?.defaultCurrency ? data?.betAmount : rate2


    if ((data?.betCurrency !== userData?.defaultCurrency) && !rate2) {
      alert("Please wait.. Calculating exchange rate...")
      return
    }

    const payload = {
      invitedUser: null,
      amount: parseFloat(rateByCurrency),
      isAcceptBet: true,
      betId: data?.id,
      prediction: userSelection?.userType,
    };


    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    return navigate("/options", { state: { gameType: gameType } });
  };

  const handleAdjust = async (data, exAmt) => {

    if ((data?.betCurrency !== userData?.defaultCurrency) && !exAmt) {
      alert("Please wait.. Calculating exchange rate...")
      return
    }

    const amt = data?.betCurrency === userData?.defaultCurrency ? data?.betAmount : exAmt

    const payload = {
      invitedUser: null,
      initialData: data,
      amount: parseFloat(amt),
      opponentUsername: data?.user?.userName,
      isAdjustBet: true,
      betId: data?.id,
    };

    localStorage.setItem("inviteeInfo", JSON.stringify(payload));
    navigate("/adjust-bet", { state: { gameType: gameType } });
  };

  const filterData = openBets?.filter(
    (a, i) =>
      a?.sportEventId === userSelection?.sportEventId &&
      a?.prediction !== userSelection?.userType
  );



  const sameCurrency = filterData?.filter(bb => bb?.betCurrency === userData?.defaultCurrency)
  const multiCurrency = filterData?.filter(bb => bb?.betCurrency !== userData?.defaultCurrency)

  const typeCheck = selected === "all" ? filterData : selected === "same" ? sameCurrency : selected === "multi" ? multiCurrency : filterData

  useEffect(() => {
    typeCheck?.forEach((item, index) => {
      if (item?.betAmount && item?.betCurrency) {
        handleFxRate(item.betAmount, item.betCurrency, index);
      }
    });
  }, [typeCheck]);

  // console.log({ typeCheck })

  if (loader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "50vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  const getPrediction = (prediction: string) => {
    const result = game?.runners
      .filter((item, i) => prediction === `W${i + 1}`)
      .map((horse, i) => {
        return `${horse?.name} WIN`;
      });

    return result;
  };

  const handleFilter = () => {
    handleShow()
  }

  // console.log({ typeCheck })

  return (
    <div>
      {!isMobile && <DesktopBackButton />}
      <div className="top-container" style={{ backgroundColor: "white" }}>
        <Header text="Open Bet" handleFilter={() => handleFilter()} />

        <p style={{ ...FONTS.body6 }}>
          Please select from the available open bets created by other users that
          matches your option.
        </p>

        {typeCheck?.length > 0 && (
          <div>
            {typeCheck?.map((data, i) => {

              return (
                <>
                  {data?.sportEvent?.sport === "FOOTBALL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <img
                            src={game?.localTeam?.teamLogo}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <img
                            src={game?.visitorTeam?.teamLogo}
                            alt=""
                            style={{ width: "20px" }}
                          />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.visitorTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : "DRAW"}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : "DRAW"}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "TENNIS" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.tournamentName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.player[0]?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.player[1]?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.player[0]?.name
                              ? `${game?.player[0]?.name} WIN`
                              : data?.prediction === game?.player[1]?.name
                                ? `${game?.player[1]?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.player[0]?.name
                              ? `${game?.player[0]?.name} WIN`
                              : userSelection?.userType === game?.player[1]?.name
                                ? `${game?.player[1]?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.sportEvent?.sport === "TABLE_TENNIS" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.tournamentName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.player[0]?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.player[1]?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.player[0]?.name
                              ? `${game?.player[0]?.name} WIN`
                              : data?.prediction === game?.player[1]?.name
                                ? `${game?.player[1]?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.player[0]?.name
                              ? `${game?.player[0]?.name} WIN`
                              : userSelection?.userType === game?.player[1]?.name
                                ? `${game?.player[1]?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.sportEvent?.sport === "BASKETBALL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.leagueName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <FaTableTennis size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "BOXING" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.name}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <GiBoxingGlove size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <GiBoxingGlove size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "ESPORT" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <IoGameController size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <IoGameController size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.sportEvent?.sport === "DART" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        Dart
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <SiDart size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <SiDart size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "MMA" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.name}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <SiUfc size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <SiUfc size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "HORSE_RACING" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div />
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div />
                      </div>
                      <div
                        style={{ ...styles.horseRow, scrollbarWidth: "none" }}
                      >
                        {game?.runners?.map((gm) => {
                          return (
                            <div
                              style={{ margin: "10px 10px", paddingBottom: 10 }}
                            >
                              <p
                                style={{
                                  ...FONTS.body7,
                                  backgroundColor: COLORS.cream,
                                  padding: 10,
                                  borderRadius: 5,
                                }}
                              >
                                {gm?.name}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {getPrediction(data?.prediction)}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {getPrediction(userSelection?.userType)}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "SNOOKER" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.name}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <GiSportMedal size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <GiSportMedal size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "VOLLYBALL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <FaVolleyball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <FaVolleyball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "ICE_HOCKEY" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <FaVolleyball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <FaVolleyball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "HANDBALL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <TbPlayHandball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <TbPlayHandball size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "AFL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <MdSportsRugby size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <MdSportsRugby size={30} color={COLORS.primary} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.sportEvent?.sport === "FUTSAL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.league}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <img src={futsol} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <img src={futsol} />
                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.awayTeam?.name
                                ? `${game?.awayTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.sportEvent?.sport === "CRICKET" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.leagueName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data?.sportEvent?.sport === "BASEBALL" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.leagueName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}


                  {data?.sportEvent?.sport === "NASCAR" && (
                    <div key={i} style={{ ...styles.contain }}>
                      <p style={{ ...FONTS.body7, margin: "0px 0px 1rem 0px" }}>
                        {game?.leagueName}
                      </p>

                      <div style={{ ...styles.row }}>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.localTeam?.name}
                          </h3>
                        </div>
                        <div style={{ ...styles.center }}>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              color: COLORS.red,
                            }}
                          >
                            {data?.status}
                          </p>
                          <h3 style={{ ...FONTS.h7, marginTop: "5px" }}>
                            {data?.betCurrency === "NGN" ? "₦" : "$"}
                            {formatCurrency(data?.betAmount)}
                          </h3>
                          {
                            userData?.defaultCurrency === data?.betCurrency ? null :
                              <p>
                                {
                                  (isNaN(exchangeRates[i])) ? null : <p style={{ ...FONTS.h7, marginTop: "-5px" }}>
                                    <span>({userData?.defaultCurrency === "NGN" ? "₦" : "$"}{exchangeRates[i] !== undefined ? exchangeRates[i]?.toFixed(2) : "Loading..."}) </span>
                                  </p>
                                }
                              </p>
                          }

                        </div>
                        <div style={{ ...styles.center }}>
                          <BiSolidCricketBall size={30} color={COLORS.primary} />

                          <h3 style={{ ...FONTS.h7, marginTop: "10px" }}>
                            {game?.awayTeam?.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ ...styles.row, paddingBottom: "1rem" }}>
                        <div>
                          <p style={{ ...FONTS.body7, marginTop: "10px" }}>
                            @{data?.user?.userName}
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {data?.prediction === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : data?.prediction === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              ...FONTS.body7,
                              marginTop: "10px",
                              textAlign: "right",
                            }}
                          >
                            You
                          </p>
                          <p style={{ ...FONTS.body7 }}>
                            {userSelection?.userType === game?.localTeam?.name
                              ? `${game?.localTeam?.name} WIN`
                              : userSelection?.userType === game?.visitorTeam?.name
                                ? `${game?.visitorTeam?.name} WIN`
                                : ""}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.row,
                          paddingBottom: "0rem",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: COLORS.primary,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAccept(data)}
                        >
                          <p
                            style={{
                              ...FONTS.body7,
                              color: COLORS.white,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Accept Bet
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: COLORS.cream,
                            width: "48%",
                            padding: 10,
                            borderRadius: 10,
                          }}
                          onClick={() => handleAdjust(data, exchangeRates[i])}
                        >
                          <p
                            style={{
                              ...FONTS.h7,
                              color: COLORS.primary,
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            Adjust Bet
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}
        {!typeCheck ||
          (typeCheck?.length < 1 && (
            <div>
              <EmptyState
                header="No Open bets available for your selection"
                height="30vh"
              />
            </div>
          ))}

        <div>
          <div
            style={{
              backgroundColor: COLORS.primary,
              width: "100%",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
            onClick={() => handleCreate()}
          >
            <p
              style={{
                ...FONTS.body5,
                color: COLORS.white,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Create New Bet
            </p>
          </div>
        </div>

      </div>

      <FilterModal
        show={show}
        selected={selected}
        handleTypeCheck={(val) => handleTypeCheck(val)}
        handleClose={handleClose}
      />
    </div>
  );
}

export default OpenBet;
