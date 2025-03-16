import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import {
  getFormulaFixtures,
  formulaFixtureStatusState,
  getFormulaMatchFixtures
} from '../../redux/slices/Formula'
import { LoadingState } from '../../components/LoadingState'
import Formula1Card from '../../components/GameCard/Formula1Card'
import { MdCancel } from "react-icons/md";


function Formula1({ calendarDate, setCalendarDate }) {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [schedule, setSchedule] = useState<any>([])
  const loading = useAppSelector(formulaFixtureStatusState) as any
  const dispatch = useAppDispatch() as any

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

    socket.on("formulaOneUpdates", (message) => {
      const mes = message;
      setLive(mes?.scores?.tournament)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const payloadUpcoming = {
      range: calendarDate?.index
    }
    const payloadLive = {
      range: 'live'
    }


    if (calendarDate) {
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getFormulaMatchFixtures(payloadUpcoming)).then((dd) => {
        setUpcoming(dd?.payload?.scores?.tournament || [])
      })
    }
    dispatch(getFormulaFixtures(payloadLive)).then((dd) => {
      console.log("live>>>", dd)
      setLive(dd?.payload?.scores?.tournament || dd?.payload?.tournament || [])
    })

  }, [calendarDate])


  useEffect(() => {
    const payloadFinished = {
      range: 'upcoming'
    }

    dispatch(getFormulaMatchFixtures(payloadFinished)).then((dd) => {
      console.log(">>>", dd)
      setSchedule(dd?.payload?.scores?.tournament || dd?.payload?.scores?.categories || [])
    })
  }, [])


  const liveLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.race?.status > 0 || bb?.race?.status === "HT")
  const scheduleLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.race?.status === "Not Started")
  const finishedLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.race?.status === "Finished" || bb?.status === "FT")

  console.log({ live })
  const [selectedStatus, setSelectedStatus] = useState('Live')

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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Formula1</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '10px'
          }}
        >
          {status?.map((aa, i) => {
            return (
              <div key={i} style={{ position: 'relative' }}>
                {calendarDate && aa?.name === calendarDate?.formattedDate && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -25,
                      right: 0,
                      cursor: 'pointer',
                      fontSize: 12,
                      color: 'red'
                    }}
                    onClick={() => {
                      setCalendarDate(null)
                      setSelectedStatus("Live")
                    }}
                  >
                    <MdCancel size={25} />
                  </span>
                )}
                <p
                  onClick={() => setSelectedStatus(aa?.name)}
                  style={{
                    width: 80,
                    padding: 3,
                    cursor: 'pointer',
                    backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'gray',
                    color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                    marginRight: 4,
                    textAlign: 'center',
                    fontSize: 12
                  }}
                >
                  {aa?.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <LoadingState isLoading={loading}>
        {selectedStatus === 'Live' ? (
          <>
            {liveLeagues?.map((item, i) => {
              return <div key={i}>
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
                  {item?.name}
                </p>
                <div key={i}>
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}

            {liveLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {schedule?.map((item, i) => {
              return <div key={i}>
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
                  {item?.name}
                </p>
                <div key={i}>
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}
            {schedule?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedLeagues?.map((item, i) => {
              return <div key={i}>
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
                  {item?.name}
                </p>
                <div key={i}>
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}

            {finishedLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        )
          : null}



        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {upcoming?.map((item, i) => {
              return <div key={i}>
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
                  {item?.name}
                </p>
                <div key={i}>
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}

            {upcoming?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Formula1
