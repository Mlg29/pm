import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { SportSportBaseUrl } from '../../https'
import { io } from 'socket.io-client'
import moment from 'moment'
import {
  getCricketFixtures,
  CricketStatusState,
  getCricketMatchFixtures
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
  const url = `${SportSportBaseUrl}/Cricket`
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(CricketStatusState) as any

  let createdDate = moment(new Date()).utc().format()
  let ScheduleDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadLive = {
      range: 'live'
    }
    const payloadUpcoming = {
      range: 'upcoming'
    }

    const payloadFinished = {
      range: 'upcoming'
    }


    dispatch(getCricketFixtures(payloadLive)).then((dd) => {
      setLive(dd?.payload?.scores?.categories)
    })
    dispatch(getCricketMatchFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })

    dispatch(getCricketMatchFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
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
      name: 'Scheduled'
    },
    {
      id: 2,
      name: 'Finished'
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
            {live?.map((item, i) => (
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
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <CricketGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.map((item, i) => (
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
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <CricketGameCard id={i} data={payload} />
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
            {finished?.map((item, i) => (
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
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <CricketGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}


        {upcoming?.match?.length < 1 && live?.match?.length < 1 && finished?.match?.length < 1 ? (
          <EmptyState header='No Game Available for Cricket' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Cricket
