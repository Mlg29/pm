import React, { useEffect, useState } from "react";
import DesktopBackButton from "../../components/BackButton/DesktopBackButton";
import { COLORS } from "../../utils/colors";
import { FlexDirection } from "../../utils/type";
import { FONTS } from "../../utils/fonts";
import DatePickerComponent from "../../components/DatePickerComponent";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAppDispatch } from "../../redux/hooks";
import { getFootballFixtures } from "../../redux/slices/FootballSlice";
import { getTennisFixtures } from "../../redux/slices/TennisSlice";
import Loader from "../../components/Loader";
import GameCard from "../../components/GameCard";
import TennisGameCard from "../../components/GameCard/TennisGameCard";
import InfiniteScroll from "react-infinite-scroll-component";
import HorseGameCard from "../../components/GameCard/HorseGameCard";
import { getHorseFixtures } from "../../redux/slices/horseSlice";
import EmptyState from "../../components/EmptyState";
import { getBoxingFixtures } from "../../redux/slices/BoxingSlice";
import { getMmaFixtures } from "../../redux/slices/MmaSlice";
import { getBasketballFixtures } from "../../redux/slices/BasketballSlice";
import BasketballGameCard from "../../components/GameCard/BasketballGameCard";
import BoxingGameCard from "../../components/GameCard/BoxingGameCard";
import MmaGameCard from "../../components/GameCard/MmaGameCard";

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row" as FlexDirection,
    width: "100%",
  },
  contain: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    backgroundColor: "white",
    width: "48%",
  },
  contain2: {
    width: "90%",
    border: "none",
    background: "none",
    outline: "none",
    padding: "5px 5px",
    color: COLORS.primary,
  },
  select: {
    padding: "18px 5px",
    borderRadius: 10,
    // margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
    backgroundColor: "white",
    outline: "none",
    color: COLORS.primary,
    height: "60px",
  },
};

const itemList = [
  {
    id: 1,
    name: "Soccer",
  },
  {
    id: 2,
    name: "Basketball",
  },
  {
    id: 3,
    name: "Tennis",
  },
  {
    id: 4,
    name: "Cricket",
  },
  {
    id: 5,
    name: "Baseball",
  },
  {
    id: 6,
    name: "Volleyball",
  },
  {
    id: 7,
    name: "Golf",
  },
  {
    id: 8,
    name: "Horse Racing",
  },
  {
    id: 9,
    name: "Hockey",
  },
  {
    id: 10,
    name: "More",
  },
  {
    id: 11,
    name: "Formula 1",
  },
  {
    id: 12,
    name: "American Football (Rugby)",
  },
  {
    id: 13,
    name: "Handball",
  },
  {
    id: 14,
    name: "Ice Hockey",
  },
  {
    id: 15,
    name: "NASCAR",
  },
  {
    id: 16,
    name: "Futsol",
  },
  {
    id: 17,
    name: "Boxing",
  },
  {
    id: 18,
    name: "MMA/UFC",
  },
  {
    id: 19,
    name: "Darts",
  },
  {
    id: 20,
    name: "Snooker",
  },
  {
    id: 21,
    name: "Easport",
  },
  {
    id: 22,
    name: "Table Tennis",
  },
  {
    id: 23,
    name: "Aussie Rules",
  },
];

function League() {
  const [game, setGame] = useState("");
  const [dateRange, setDateRange] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const leagueName = location.state.data;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<any>([]);
  const dispatch = useAppDispatch() as any;
  const [loader, setLoader] = useState(false);

  const fetchData = async (page) => {
    setData([]);
    const payload = {
      searchTerm: leagueName,
      date: moment(dateRange).format("YYYY-MM-DD"),
      page: page,
      pageSize: pageSize,
    };

    setLoading(true);
    setLoader(true);
    dispatch(getFootballFixtures(payload)).then((dd) => {
      // setData((prev) => [...prev, ...dd?.payload?.data]);
      setData(dd?.payload?.data);
      setPage(dd?.payload?.page);
      setPageSize(dd?.payload?.pageSize);
      setTotal(dd?.payload?.total);
      if (data?.length === dd?.payload?.total) {
        setHasMore(false);
      }
      setLoading(false);
      setLoader(false);
    });
  };

  useEffect(() => {
    fetchData(page);
  }, [page, dateRange, game]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="top-container">
      {/* <DesktopBackButton /> */}

      <h3 style={{ ...FONTS.h6 }}>{leagueName}</h3>

      <div style={styles.row}>
        <div style={{ width: "100%", marginTop: 20 }}>
          <DatePickerComponent
            label="Date"
            placeholder="Date"
            propStyle={{ width: "100%" }}
            value={dateRange}
            onChangeDate={(date) => setDateRange(date)}
          />
        </div>
      </div>

      {loader ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //  flex: 1,
            // height: "50vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          <div>
            <InfiniteScroll
              dataLength={data?.length || []}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={loading && <h4>Loading...</h4>}
            //   endMessage={<p>No more data to load</p>}
            >
              {data?.map((aa: any, i: any) => {
                return (
                  <div key={i}>
                    <GameCard id={i} data={aa} />
                  </div>
                );
              })}
            </InfiniteScroll>

            {!data || data?.length < 1 ? (
              <EmptyState header="No data available" height="50vh" />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default League;