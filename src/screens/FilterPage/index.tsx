import React, { useEffect, useState } from 'react'
import DesktopBackButton from '../../components/BackButton/DesktopBackButton'
import { COLORS } from '../../utils/colors'
import { FlexDirection } from '../../utils/type'
import { FONTS } from '../../utils/fonts'
import DatePickerComponent from '../../components/DatePickerComponent'
import { useLocation, useNavigate } from 'react-router-dom'

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
import { getSnookerFixtures } from '../../redux/slices/SnookerSlice'
import SnookerGameCard from '../../components/GameCard/SnookerGameCard'
import { getVolleyballFixtures } from '../../redux/slices/VolleyballSlice'
import VolleyballGameCard from '../../components/GameCard/VolleyballGameCard'
import { getHandballFixtures } from '../../redux/slices/HandballSlice'
import { getAflFixtures } from '../../redux/slices/AflSlice'
import HandballGameCard from '../../components/GameCard/HandballGameCard'
import AflGameCard from '../../components/GameCard/AflGameCard'
import FutsalGameCard from '../../components/GameCard/FutsalGameCard'
import { getFutsalFixtures } from '../../redux/slices/Futsal'
import { getCricketFixtures } from '../../redux/slices/CricketSlice'
import CricketGameCard from '../../components/GameCard/CricketGameCard'

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

function FilterPage() {
  const location = useLocation()
  const getName = location?.state?.gameName
  const getDate = location?.state?.customDate
  const [game, setGame] = useState('')
  const [dateRange, setDateRange] = useState()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(100)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const [loader, setLoader] = useState(false)

  const fetchData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
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
      date: getDate,
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
      date: getDate,
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
      date: getDate,
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
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    // dispatch(getEasportFixtures(payload)).then((dd) => {
    //   setData(dd?.payload?.data || [])
    //   setPage(dd?.payload?.page)
    //   setPageSize(dd?.payload?.pageSize)
    //   setTotal(dd?.payload?.total)
    //   if (data?.length === dd?.payload?.total) {
    //     setHasMore(false)
    //   }
    //   setLoading(false)
    //   setLoader(false)
    // })
  }

  const fetchDartData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
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
      date: getDate,
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

  const fetchVolleyballData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getVolleyballFixtures(payload)).then((dd) => {
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

  const fetchHandballData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getHandballFixtures(payload)).then((dd) => {
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

  const fetchAflData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getAflFixtures(null)).then((dd) => {
      setData(dd?.payload?.scores || [])
      // setPage(dd?.payload?.page);
      // setPageSize(dd?.payload?.pageSize);
      // setTotal(dd?.payload?.total);
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
      setLoader(false)
    })
  }

  const fetchFutsalData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    dispatch(getFutsalFixtures(payload)).then((dd) => {
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

  const fetchCricketData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
      page: page,
      pageSize: pageSize
    }

    setLoading(true)
    setLoader(true)
    // dispatch(getCricketFixtures(payload)).then((dd) => {
    //   setData(dd?.payload?.data || [])
    //   setPage(dd?.payload?.page)
    //   setPageSize(dd?.payload?.pageSize)
    //   setTotal(dd?.payload?.total)
    //   if (data?.length === dd?.payload?.total) {
    //     setHasMore(false)
    //   }
    //   setLoading(false)
    //   setLoader(false)
    // })
  }

  const fetchMmaData = async (page) => {
    setData([])
    const payload = {
      date: getDate,
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
      date: getDate,
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
      if (game === 'Volleyball') {
        fetchVolleyballData(page)
        return
      }
      if (game === 'Handball') {
        fetchHandballData(page)
        return
      }
      if (game === 'AFL') {
        fetchAflData(page)
        return
      }
      if (game === 'Futsal') {
        fetchFutsalData(page)
        return
      }
      if (game === 'Cricket') {
        fetchCricketData(page)
        return
      }
    }, [game])

  const handleSelectChange = (e) => {
    const value = e.target.value
    setGame(value)
  }

  const fetchMoreData = () => {
    //setPage((prevPage) => prevPage + 1);
  }

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league =
        current?.leagueName ||
        current?.tournamentName ||
        current?.name ||
        current?.league ||
        game

      if (!acc[league]) {
        acc[league] = []
      }

      const isDuplicate = acc[league].some((item) => {
        if (item?.localTeamName || item?.visitorTeamName) {
          return (
            item?.localTeamName === current?.localTeamName &&
            item?.visitorTeamName === current?.visitorTeamName
          )
        }

        if (item?.localteam?.name || item?.awayteam?.name) {
          return (
            item?.localteam?.name === current?.localteam?.name &&
            item?.awayteam?.name === current?.awayteam?.name
          )
        }

        if (item?.player[0]['@name'] || item?.player[1]['@name']) {
          return (
            item?.player[0]['@name'] === current?.player[0]['@name'] &&
            item?.player[1]['@name'] === current?.player[1]['@name']
          )
        }
      })

      if (!isDuplicate) {
        acc[league].push(current)
      }

      return acc
    }, {})
  }

  const outPutData = groupedByData(data)

  return (
    <div className='top-container'>
      <DesktopBackButton />
    </div>
  )
}

export default FilterPage
