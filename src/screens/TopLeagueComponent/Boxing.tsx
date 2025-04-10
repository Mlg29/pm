import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  boxingFixtureStatusState,
  getBoxingFixtures
} from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import BoxingGameCard from '../../components/GameCard/BoxingGameCard'
import { LoadingState } from '../../components/LoadingState'

function Boxing({ leagueName }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(boxingFixtureStatusState) as any
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getBoxingFixtures(null)).then((dd) => {
      const filterData = dd?.payload?.scores?.category?.filter(m => m?.id === leagueName)
      setLive(filterData || [])
    })

  }, [])


  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Live" || match.status === "In progress" || match.status?.toLowerCase()?.includes("round") || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Final")
  }))
    .filter(league => league?.match.length > 0);

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

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
      id: 3,
      name: 'Finished'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: 10 }}>

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
            {liveMatches?.map(
              (item, i) => (
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
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map(
              (item, i) => (
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
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map(
              (item, i) => (
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
                          <BoxingGameCard id={i} data={payload} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Boxing' height='30vh' />
            ) : null}
          </>
        ) : null}




      </LoadingState>
    </div>
  )
}

export default Boxing
