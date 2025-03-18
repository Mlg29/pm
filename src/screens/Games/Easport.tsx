import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import { getEasportFixtures, getEasportFixturesMatch } from '../../redux/slices/Easport'
import EsportGameCard from '../../components/GameCard/EsportGameCard'
import { MdCancel } from "react-icons/md";
import HeaderBox from '../HeaderBox'


function Easport() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const [calendarDate, setCalendarDate] = useState<{ index: string; formattedDate: string } | null>(null);
  const dispatch = useAppDispatch() as any
  const [selectedStatus, setSelectedStatus] = useState('Live')



  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("esportsUpdates", (message) => {
      const mes = message;
      console.log("mess", mes)
      setLive(mes?.match)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log({ live })

  useEffect(() => {
    const payloadUpcoming = {
      range: calendarDate?.index
    }


    const payloadFinished = {
      range: 'finished'
    }

    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getEasportFixturesMatch(payloadUpcoming)).then((dd) => {
        setUpcoming(dd?.payload?.match)
      })
    }
    // dispatch(getEasportFixturesMatch(payloadFinished)).then((dd) => {
    //   setFinished(dd?.payload?.match)
    // })

    dispatch(getEasportFixtures()).then((dd) => {
      console.log({ dd })
      setLive(dd?.payload?.match)
    })
  }, [calendarDate])




  const liveLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status?.toLowerCase() === "live" || bb?.status === "Started")
  const scheduleLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Not Started" || bb?.status === "Postponed")
  const finishedLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Finished" || bb?.status === "FT" || bb?.status === "Walkover")



  const oldStatus = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Scheduled'
    },
    {
      id: 3,
      name: 'Finished'
    }
  ]

  const secondStatus = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Scheduled'
    },
    {
      id: 3,
      name: 'Finished'
    },
    {
      id: 4,
      name: calendarDate?.formattedDate
    }
  ]

  const status = calendarDate ? secondStatus : oldStatus

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Easport</p>
        <HeaderBox status={status} selectedStatus={selectedStatus} calendarDate={calendarDate} setCalendarDate={setCalendarDate} setSelectedStatus={setSelectedStatus} />
      </div>
      {selectedStatus === 'Live' ? (
        <>
          {liveLeagues?.map((aa, i) => {
            return (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {liveLeagues?.length < 1 ? (
            <EmptyState header='No Game Available for Easport' height='30vh' />
          ) : null}
        </>
      ) : null}

      {selectedStatus === 'Scheduled' ? (
        <>
          {scheduleLeagues?.map((aa, i) => {
            return (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {scheduleLeagues?.length < 1 ? (
            <EmptyState header='No Game Available for Easport' height='30vh' />
          ) : null}
        </>
      ) : null}

      {selectedStatus === 'Finished' ? (
        <>
          {finishedLeagues?.map((aa, i) => {
            return (
              <div key={i}>

                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {
            finishedLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Easport' height='30vh' />
            ) : null}
        </>
      ) : null}

      {selectedStatus === calendarDate?.formattedDate ? (
        <>
          {upcoming?.map((aa, i) => {
            return (
              <div key={i}>

                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 10
                  }}
                >
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {
            upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for Easport' height='30vh' />
            ) : null}
        </>
      ) : null}


    </div>
  )
}

export default Easport
