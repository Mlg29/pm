import React, { useEffect, useState } from 'react'
import DesktopBackButton from '../../components/BackButton/DesktopBackButton'
import { COLORS } from '../../utils/colors'
import { FlexDirection } from '../../utils/type'
import { FONTS } from '../../utils/fonts'
import DatePickerComponent from '../../components/DatePickerComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import { getFootballFixtures } from '../../redux/slices/FootballSlice'
import { getTennisFixtures } from '../../redux/slices/TennisSlice'
import Loader from '../../components/Loader'
import GameCard from '../../components/GameCard'
import TennisGameCard from '../../components/GameCard/TennisGameCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import HorseGameCard from '../../components/GameCard/HorseGameCard'
import { getHorseFixtures } from '../../redux/slices/horseSlice'
import EmptyState from '../../components/EmptyState'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import { getMmaFixtures } from '../../redux/slices/MmaSlice'
import { getBasketballFixtures } from '../../redux/slices/BasketballSlice'
import BasketballGameCard from '../../components/GameCard/BasketballGameCard'
import BoxingGameCard from '../../components/GameCard/BoxingGameCard'
import MmaGameCard from '../../components/GameCard/MmaGameCard'
import { getEasportFixtures } from '../../redux/slices/Easport'
import EsportGameCard from '../../components/GameCard/EsportGameCard'
import { getDartFixtures } from '../../redux/slices/DartSlice'
import DartGameCard from '../../components/GameCard/DartGameCard'
import SearchInput from '../../components/SearchComponent'
import { getSnookerFixtures } from '../../redux/slices/SnookerSlice'
import SnookerGameCard from '../../components/GameCard/SnookerGameCard'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row' as FlexDirection,
    width: '100%'
  },
  contain: {
    display: 'flex',
    flexDirection: 'column' as FlexDirection,
    backgroundColor: 'white',
    width: '48%'
  },
  contain2: {
    width: '90%',
    border: 'none',
    background: 'none',
    outline: 'none',
    padding: '5px 5px',
    color: COLORS.primary
  },
  select: {
    padding: '18px 5px',
    borderRadius: 10,
    // margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
    backgroundColor: 'white',
    outline: 'none',
    color: COLORS.primary,
    height: '60px'
  }
}

const itemList = [
  {
    id: 1,
    name: 'Soccer'
  },
  {
    id: 2,
    name: 'Basketball'
  },
  {
    id: 3,
    name: 'Tennis'
  },
  {
    id: 4,
    name: 'Cricket'
  },
  {
    id: 5,
    name: 'Baseball'
  },
  {
    id: 6,
    name: 'Volleyball'
  },
  {
    id: 7,
    name: 'Golf'
  },
  {
    id: 8,
    name: 'Horse'
  },
  {
    id: 9,
    name: 'Hockey'
  },
  {
    id: 10,
    name: 'More'
  },
  {
    id: 11,
    name: 'Formula 1'
  },
  {
    id: 12,
    name: 'AFL'
  },
  {
    id: 13,
    name: 'Handball'
  },
  {
    id: 14,
    name: 'Ice Hockey'
  },
  {
    id: 15,
    name: 'NASCAR'
  },
  {
    id: 16,
    name: 'Futsal'
  },
  {
    id: 17,
    name: 'Boxing'
  },
  {
    id: 18,
    name: 'MMA/UFC'
  },
  {
    id: 19,
    name: 'Darts'
  },
  {
    id: 20,
    name: 'Snooker'
  },
  {
    id: 21,
    name: 'Esports'
  },
  {
    id: 22,
    name: 'Table Tennis'
  },
  {
    id: 23,
    name: 'Aussie Rules'
  }
]

function Search() {
  const location = useLocation()
  const getName = location?.state?.gameName
  const [game, setGame] = useState('')

  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(100)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const [loader, setLoader] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getFootballFixtures(payload)).then((dd) => {
      // setData((prev) => [...prev, ...dd?.payload?.data]);
      setData(dd?.payload?.data)
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }
  const fetchTennisData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getTennisFixtures(payload)).then((dd) => {
      // setData((prev) => [...prev, ...dd?.payload?.data]);
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }
  const fetchHorseData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getHorseFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchBoxingData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getBoxingFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchEsportData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getEasportFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchDartData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getDartFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchSnookerData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getSnookerFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchMmaData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }
    setLoading(true)
    setLoader(true)
    dispatch(getMmaFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchBasketballData = async (page) => {
    setData([])
    const payload = {
      searchTerm: searchTerm,
      page: page,
      pageSize: pageSize
    }
    setLoading(true)
    setLoader(true)
    dispatch(getBasketballFixtures(payload)).then((dd) => {
      setData(dd?.payload?.data || [])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  useEffect(() => {
    setGame(getName)
  }, [getName]),
    useEffect(() => {
      if (game === 'Soccer') {
        fetchData(page)
        return
      }
      if (game === 'Tennis') {
        fetchTennisData(page)
        return
      }
      if (game === 'Horse') {
        fetchHorseData(page)
        return
      }
      if (game === 'MMA/UFC') {
        fetchMmaData(page)
        return
      }
      if (game === 'Basketball') {
        fetchBasketballData(page)
        return
      }
      if (game === 'Boxing') {
        fetchBoxingData(page)
        return
      }
      if (game === 'Esports') {
        fetchEsportData(page)
        return
      }
      if (game === 'Darts') {
        fetchDartData(page)
        return
      }
      if (game === 'Snooker') {
        fetchSnookerData(page)
        return
      }
    }, [page, searchTerm, game])

  const handleSelectChange = (e) => {
    const value = e.target.value
    setGame(value)
  }

  const fetchMoreData = () => {
    //setPage((prevPage) => prevPage + 1);
  }

  return (
    <div className='top-container'>
      <DesktopBackButton />

      <div style={styles.row}>
        <div style={{ ...styles.contain, marginBottom: 10 }}>
          <label htmlFor={`sport`} style={{ ...FONTS.body7 }}>
            Select Sport
          </label>
          <select
            style={{ ...styles.select }}
            id={`sport`}
            name={`sport`}
            onChange={(e) => handleSelectChange(e)}
            value={game}
          >
            <option value=''>Select a sport</option>
            {itemList?.map((q: any) => {
              return (
                <option key={q.id} value={q.name}>
                  {q?.name}
                </option>
              )
            })}
          </select>
        </div>
        <div style={{ width: '48%' }}>
          <SearchInput
            placeholder='Search term for name'
            value={searchTerm}
            handleChange={(e) => setSearchTerm(e)}
          />
        </div>
      </div>

      {loader ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
            //  flex: 1,
            // height: "50vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          <p>{game}</p>

          <div>
            <InfiniteScroll
              dataLength={data?.length || []}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={loading && <h4>Loading...</h4>}
              endMessage={<p>No more data to load</p>}
            >
              {data?.map((aa: any, i: any) => {
                return (
                  <div key={i}>
                    {game === 'Soccer' && <GameCard id={i} data={aa} />}

                    {game === 'Tennis' && <TennisGameCard id={i} data={aa} />}

                    {game === 'Horse' && <HorseGameCard id={i} data={aa} />}
                    {game === 'Basketball' && (
                      <BasketballGameCard id={i} data={aa} />
                    )}
                    {game === 'Boxing' && <BoxingGameCard id={i} data={aa} />}
                    {game === 'MMA/UFC' && <MmaGameCard id={i} data={aa} />}
                    {game === 'Esports' && <EsportGameCard id={i} data={aa} />}
                    {game === 'Darts' && <DartGameCard id={i} data={aa} />}
                    {game === 'Snooker' && <SnookerGameCard id={i} data={aa} />}
                  </div>
                )
              })}
            </InfiniteScroll>

            {!data || data?.length < 1 ? (
              <EmptyState header='No data available' height='50vh' />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
