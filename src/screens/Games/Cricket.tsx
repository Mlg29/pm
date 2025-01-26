import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { SportBaseUrl } from '../../https'
import { io } from 'socket.io-client'
import moment from 'moment'
import {
  getCricketFixtures,
  CricketStatusState
} from '../../redux/slices/CricketSlice'
import Loader from '../../components/Loader'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import CricketGameCard from '../../components/GameCard/CricketGameCard'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function Cricket() {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const url = `${SportBaseUrl}/Cricket`
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const loading = useAppSelector(CricketStatusState) as any
  const [today, setToday] = useState<any>([])
  const [Schedule, setSchedule] = useState<any>([])

  let createdDate = moment(new Date()).utc().format()
  let ScheduleDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadLive = {
      eventType: 'live'
    }
    const payloadSchedule = {
      eventType: 'schedule'
    }

    dispatch(getCricketFixtures(payloadLive)).then((dd) => {
      setToday(dd?.payload)
    })
    dispatch(getCricketFixtures(payloadSchedule)).then((dd) => {
      setSchedule(dd?.payload)
    })

    return
  }, [])

  const [selectedStatus, setSelectedStatus] = useState('Live')

  const status = [
    {
      id: 1,
      name: 'Live'
    },
    {
      id: 2,
      name: 'Schedule'
    }
  ]

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Cricket</p>
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

      <LoadingState isLoading={loading}>
        {selectedStatus === 'Live' ? (
          <>
            {today?.map((item, i) => (
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
                  {item?.name}
                </p>
                <div>
                  {item?.match?.map((aa, i) => {
                    return (
                      <div key={i}>
                        <CricketGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}

        {selectedStatus === 'Schedule' ? (
          <>
            {Schedule?.fixtures?.category?.map((item, i) => (
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
                  {item?.name}
                </p>
                <div>
                  <CricketGameCard id={i} data={item} />
                </div>
              </div>
            ))}
          </>
        ) : null}
        {upcoming?.match?.length < 1 && today?.match?.length < 1 ? (
          <EmptyState header='No Game Available for Cricket' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Cricket
