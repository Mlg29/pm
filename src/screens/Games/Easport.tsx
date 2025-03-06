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

function Easport({ calendarDate }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const url = `${SportSportBaseUrl}/esport`
  const dispatch = useAppDispatch() as any
  const [selectedStatus, setSelectedStatus] = useState('Live')



  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

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


  const liveLeagues = Array.isArray(live) && live?.filter(bb => bb?.status > 0 || bb?.status === "HT")
  const scheduleLeagues = Array.isArray(live) && live?.filter(bb => bb?.status === "Not Started")
  const finishedLeagues = Array.isArray(live) && live?.filter(bb => bb?.status === "Finished" || bb?.status === "FT" || bb?.status === "Postponed")



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
              <p
                key={i}
                onClick={() => setSelectedStatus(aa?.name)}
                style={{
                  width: 80,
                  padding: 3,
                  cursor: 'pointer',
                  backgroundColor:
                    selectedStatus === aa?.name ? '#2D0D02' : 'gray',
                  color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                  marginRight: 4,
                  textAlign: 'center',
                  fontSize: 12
                }}
              >
                {aa?.name}
              </p>
            )
          })}
        </div>
      </div>
      {selectedStatus === 'Live' ? (
        <>
          {liveLeagues?.map((aa, i) => {
            return (
              <div key={i}>
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
