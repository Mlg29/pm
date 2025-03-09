import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import { getHandballFixtures } from '../../redux/slices/HandballSlice'
import HandballGameCard from '../../components/GameCard/HandballGameCard'
import { MdCancel } from "react-icons/md";
import { io } from "socket.io-client";

function Handball({ calendarDate, setCalendarDate }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const dispatch = useAppDispatch() as any

  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("handballUpdate", (message) => {
      const mes = message;
      // setLive(mes)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      status: 'Not Started'
    }
    const payloadFinished = {
      status: 'Finished'
    }

    dispatch(getHandballFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })

    dispatch(getHandballFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })
  }, [])

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league = current?.league || 'Handball'

      if (!acc[league]) {
        acc[league] = []
      }

      acc[league].push(current)

      return acc
    }, {})
  }

  const upcomingOutput = groupedByData(upcoming?.data)

  const finishedOutput = groupedByData(finished?.data)

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

  const status = [
    // {
    //   id: 1,
    //   name: 'Live',
    // },
    {
      id: 2,
      name: 'Scheduled'
    },
    {
      id: 3,
      name: 'Finished'
    }
  ]

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Handball</p>
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
      {selectedStatus === 'Scheduled' ? (
        <>
          {upcomingOutput &&
            Object.keys(upcomingOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {upcomingOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <HandballGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      ) : null}

      {selectedStatus === 'Finished' ? (
        <>
          {finishedOutput &&
            Object.keys(finishedOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {finishedOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <HandballGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      ) : null}

      {upcoming?.data?.length < 1 && finished?.data?.length < 1 ? (
        <EmptyState header='No Game Available for Handball' height='30vh' />
      ) : null}
    </div>
  )
}

export default Handball
