import BottomTabs from '../../components/Tabs'
import notification from '../../assets/images/notification.svg'
import { RxAvatar } from 'react-icons/rx'
import { FONTS } from '../../utils/fonts'
import SearchComponent from '../../components/SearchComponent'
import slider from '../../assets/images/slider.svg'
import slider2 from '../../assets/images/slider2.svg'
import slider3 from '../../assets/images/slider3.svg'
import more from '../../assets/images/more.svg'
import { IoMdFootball } from 'react-icons/io'
import { MdSportsCricket } from 'react-icons/md'
import { FaBasketballBall } from 'react-icons/fa'
import { IoIosTennisball } from 'react-icons/io'
import { MdSportsRugby } from 'react-icons/md'
import { COLORS } from '../../utils/colors'
import GameCard from '../../components/GameCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import heading from '../../assets/images/heading.svg'
import { SportSportBaseUrl } from '../../https'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserData } from '../../redux/slices/AuthSlice'
import {
  footballEventState,
  footballFixtureState,
  getFootballEvents,
  getFootballFixtures
} from '../../redux/slices/FootballSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

import io from 'socket.io-client'
import moment from 'moment'
import Loader from '../../components/Loader'

import { useMediaQuery } from 'react-responsive'
import { getTennisFixtures } from '../../redux/slices/TennisSlice'
import TennisGameCard from '../../components/GameCard/TennisGameCard'
import HorseGameCard from '../../components/GameCard/HorseGameCard'
import { getHorseFixtures } from '../../redux/slices/horseSlice'
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
import VolleyballCard from '../../components/GameDetailCardHeader/VolleyballCard'
import { getVolleyballFixtures } from '../../redux/slices/VolleyballSlice'
import { getHandballFixtures } from '../../redux/slices/HandballSlice'
import { getAflFixtures } from '../../redux/slices/AflSlice'
import HandballCard from '../../components/GameDetailCardHeader/HandballCard'
import AflCard from '../../components/GameDetailCardHeader/AflCard'
import FutsalCard from '../../components/GameDetailCardHeader/FutsalCard'
import VolleyballGameCard from '../../components/GameCard/VolleyballGameCard'
import HandballGameCard from '../../components/GameCard/HandballGameCard'
import AflGameCard from '../../components/GameCard/AflGameCard'
import FutsalGameCard from '../../components/GameCard/FutsalGameCard'
import { getFutsalFixtures } from '../../redux/slices/Futsal'
import { getCricketFixtures } from '../../redux/slices/CricketSlice'
import CricketGameCard from '../../components/GameCard/CricketGameCard'

function GameEventData(props: any) {
  const navigate = useNavigate()
  const location = useLocation()
  const events = location.state.events
  const eventType = location.state.type
  const gameType = location.state.gameType
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const dispatch = useAppDispatch() as any
  const getToken = localStorage.getItem('token')
  const [userData, setUserData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const footballEvents = useAppSelector(footballEventState) as any
  // const footballFixtures = useAppSelector(footballFixtureState) as any
  const [live, setLive] = useState<any>([])
  const [liveTennis, setLiveTennis] = useState<any>([])
  const [data, setData] = useState<any>([])
  const sliderArr = [slider, slider2, slider3]
  const [loader, setLoader] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  const fetchData = async (page) => {
    const payloadUpcoming = {
      status: 'UPCOMING',
      page: page,
      pageSize: pageSize
    }
    const payloadToday = {
      startTime: moment(new Date()).format('YYYY-MM-DD'),
      page: page,
      pageSize: pageSize
    }
    const payloadTomorrow = {
      startTime: tomorrowDate.format('YYYY-MM-DD'),
      page: page,
      pageSize: pageSize
    }
    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'today'
          ? payloadToday
          : eventType === 'tomorrow'
            ? payloadTomorrow
            : ''
    setLoading(true)
    dispatch(getFootballFixtures(actualPayload)).then((dd) => {
      setData((prev) => [...prev, ...dd?.payload?.data])
      setPage(dd?.payload?.page)
      setPageSize(dd?.payload?.pageSize)
      setTotal(dd?.payload?.total)
      if (data?.length === dd?.payload?.total) {
        setHasMore(false)
      }
      setLoading(false)
    })
  }
  const fetchTennisData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }
    const payloadLive = {
      status: 'Live',
      page: page,
      pageSize: pageSize
    }
    const payloadToday = {
      startTime: moment(new Date()).format('YYYY-MM-DD'),
      page: page,
      pageSize: pageSize
    }
    const payloadTomorrow = {
      startTime: tomorrowDate.format('YYYY-MM-DD'),
      page: page,
      pageSize: pageSize
    }
    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'live'
          ? payloadLive
          : eventType === 'today'
            ? payloadToday
            : eventType === 'tomorrow'
              ? payloadTomorrow
              : ''
    setLoading(true)
    dispatch(getTennisFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }
  const fetchHorseData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    dispatch(getHorseFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchBoxingData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }
    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    // dispatch(getBoxingFixtures()).then((dd) => {
    //   if (dd?.payload) {
    //     setData((prev) => [...prev, ...dd?.payload?.data])
    //     setPage(dd?.payload?.page)
    //     setPageSize(dd?.payload?.pageSize)
    //     setTotal(dd?.payload?.total)
    //     if (data?.length === dd?.payload?.total) {
    //       setHasMore(false)
    //     }
    //   }

    //   setLoading(false)
    // })
  }

  const fetchEsportData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }
    const payloadLive = {
      status: 'Started',
      page: page,
      pageSize: pageSize
    }
    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'live'
          ? payloadLive
          : eventType === 'finished'
            ? payloadFinished
            : ''

    setLoading(true)
    // dispatch(getEasportFixtures(actualPayload)).then((dd) => {
    //   if (dd?.payload) {
    //     setData((prev) => [...prev, ...dd?.payload?.data])
    //     setPage(dd?.payload?.page)
    //     setPageSize(dd?.payload?.pageSize)
    //     setTotal(dd?.payload?.total)
    //     if (data?.length === dd?.payload?.total) {
    //       setHasMore(false)
    //     }
    //   }

    //   setLoading(false)
    // })
  }

  const fetchDartData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    dispatch(getDartFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchCricketData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    // dispatch(getCricketFixtures(actualPayload)).then((dd) => {
    //   if (dd?.payload) {
    //     setData((prev) => [...prev, ...dd?.payload?.data])
    //     setPage(dd?.payload?.page)
    //     setPageSize(dd?.payload?.pageSize)
    //     setTotal(dd?.payload?.total)
    //     if (data?.length === dd?.payload?.total) {
    //       setHasMore(false)
    //     }
    //   }

    //   setLoading(false)
    // })
  }

  const fetchSnookerData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    dispatch(getSnookerFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchVolleyballData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    dispatch(getVolleyballFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchMmaData = async (page) => {
    const payloadUpcoming = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    // dispatch(getMmaFixtures()).then((dd) => {
    //   if (dd?.payload) {
    //     setData((prev) => [...prev, ...dd?.payload?.category])
    //     // setPage(dd?.payload?.page);
    //     // setPageSize(dd?.payload?.pageSize);
    //     // setTotal(dd?.payload?.total);
    //     if (data?.length === dd?.payload?.category?.match?.length) {
    //       setHasMore(false)
    //     }
    //   }

    //   setLoading(false)
    // })
  }

  const fetchHandballData = async (page) => {
    setData([])
    const payload = {
      status: 'Not Started'
      // page: page,
      // pageSize: pageSize,
    }
    const payloadFinished = {
      status: 'Finished'
      // page: page,
      // pageSize: pageSize,
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payload
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    setLoader(true)
    dispatch(getHandballFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchAflData = async (page) => {
    setData([])
    const payload = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }
    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payload
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    setLoader(true)
    dispatch(getAflFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchFutsalData = async (page) => {
    setData([])
    const payload = {
      status: 'Not Started',
      page: page,
      pageSize: pageSize
    }
    const payloadFinished = {
      status: 'FT'
      // page: page,
      // pageSize: pageSize,
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payload
        : eventType === 'FT'
          ? payloadFinished
          : ''

    console.log('i am herr')

    setLoading(true)
    setLoader(true)
    dispatch(getFutsalFixtures(actualPayload)).then((dd) => {
      console.log('i am herr', dd?.payload)
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  const fetchBasketballData = async (page) => {
    const payloadUpcoming = {
      status: 'UPCOMING',
      page: page,
      pageSize: pageSize
    }

    const payloadFinished = {
      status: 'Finished',
      page: page,
      pageSize: pageSize
    }

    const actualPayload =
      eventType === 'upcoming'
        ? payloadUpcoming
        : eventType === 'finished'
          ? payloadFinished
          : ''

    setLoading(true)
    dispatch(getBasketballFixtures(actualPayload)).then((dd) => {
      if (dd?.payload) {
        setData((prev) => [...prev, ...dd?.payload?.data])
        setPage(dd?.payload?.page)
        setPageSize(dd?.payload?.pageSize)
        setTotal(dd?.payload?.total)
        if (data?.length === dd?.payload?.total) {
          setHasMore(false)
        }
      }

      setLoading(false)
    })
  }

  useEffect(() => {
    if (gameType === 'Soccer') {
      fetchData(page)
      return
    }
    if (gameType === 'Tennis') {
      fetchTennisData(page)
      return
    }
    if (gameType === 'Horse') {
      fetchHorseData(page)
      return
    }
    if (gameType === 'Mma/Ufc') {
      fetchMmaData(page)
      return
    }
    if (gameType === 'Basketball') {
      fetchBasketballData(page)
      return
    }
    if (gameType === 'Boxing') {
      fetchBoxingData(page)
      return
    }
    if (gameType === 'Esports') {
      fetchEsportData(page)
      return
    }
    if (gameType === 'Dart') {
      fetchDartData(page)
      return
    }
    if (gameType === 'Snooker') {
      fetchSnookerData(page)
      return
    }
    if (gameType === 'Volleyball') {
      fetchVolleyballData(page)
      return
    }
    if (gameType === 'Handball') {
      fetchHandballData(page)
      return
    }
    if (gameType === 'AFL') {
      fetchAflData(page)
      return
    }
    if (gameType === 'Futsal') {
      fetchFutsalData(page)
      return
    }
    if (gameType === 'Cricket') {
      fetchCricketData(page)
      return
    }
  }, [page])

  useEffect(() => {
    if (eventType === 'live' && gameType === 'Soccer') {
      setLive(events)
    }
    if (eventType === 'live' && gameType === 'Basketball') {
      setLive(events)
    }
    if (eventType === 'live' && gameType === 'Tennis') {
      setLive(events)
    }
    if (eventType === 'live' && gameType === 'Esports') {
      setLive(events)
    }
    const url =
      gameType === 'Soccer'
        ? `${SportSportBaseUrl}/football`
        : gameType === 'Basketball'
          ? `${SportSportBaseUrl}/basketball`
          : gameType === 'Tennis'
            ? `${SportSportBaseUrl}/tennis`
            : gameType === 'Esports'
              ? `${SportSportBaseUrl}/esport`
              : ''
    const socketEvents =
      gameType === 'Soccer'
        ? 'footballEventUpdate'
        : gameType === 'Basketball'
          ? 'basketballEventUpdate'
          : gameType === 'Tennis'
            ? 'tennisEventUpdate'
            : gameType === 'Esports'
              ? 'esportEventUpdate'
              : ''

    const socket = io(url) as any

    socket.on('connect', () => {
      console.log(`Connected to WebSocket server ${gameType}`)
    })

    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err)
    })

    // Handle incoming messages
    socket.on(socketEvents, (message) => {
      setLive((prevMessages) => {
        const updatedMessages = prevMessages?.filter(
          (msg) => msg.id !== message.id
        )
        return [...updatedMessages, message]
      })
    })

    // Cleanup on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  const handleLogOut = () => {
    var getDeviceId = localStorage.getItem("deviceId")
    localStorage.clear()
    setTimeout(() => {
      localStorage.setItem("deviceId", getDeviceId)
      navigate("/home")
    }, 1000)
  }

  const fetchUserInfo = async () => {
    setLoader(true)
    const response = await dispatch(getUserData())
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload)
      setLoader(false)
    } else {
      setLoader(false)
      handleLogOut()
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league =
        current?.leagueName ||
        current?.tournamentName ||
        current?.name ||
        current?.league ||
        gameType

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

  const outPut = groupedByData(live)

  const outPutData = groupedByData(data)

  if (loader) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          height: '100vh'
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <div className='top-container'>


      {/* {getToken && <BottomTabs />} */}
    </div>
  )
}

export default GameEventData
