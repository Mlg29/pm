import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import {
  getMmaFixtures,
  mmaFixtureStatusState
} from '../../redux/slices/MmaSlice'
import MmaGameCard from '../../components/GameCard/MmaGameCard'
import { LoadingState } from '../../components/LoadingState'

function Mma({ leagueName }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const loading = useAppSelector(mmaFixtureStatusState) as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getMmaFixtures(null)).then((dd) => {
      const filterData = dd?.payload?.category?.filter(m => leagueName?.some(word => m?.name?.toLowerCase().includes(word)))
      setLive(filterData || [])
    })


  }, [])

  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Live" || match.status === "In Progress" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
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
      <div>
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
            {liveMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}
            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((league, index) => (
              <div key={league?.id}>
                {league?.name && league?.match?.length > 0 && (
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
                    {league?.name}
                  </p>
                )}
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.name,
                      leagueId: league?.id,
                      ...aa
                    }
                    return <div key={i}>
                      <MmaGameCard id={index} data={payload} />
                    </div>
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for MMA/UFC' height='30vh' />
            ) : null}

          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default Mma
