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
import { getNascaFixtures, getNascaMatchFixtures, nascaFixtureStatusState } from '../../redux/slices/NascaSlice'
import { LoadingState } from '../../components/LoadingState'
import NascarCard from '../../components/GameCard/NascarCard'

function Nascar({ leagueName }) {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(nascaFixtureStatusState) as any
  const dispatch = useAppDispatch() as any


  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadLive = {
      range: 'live'
    }
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getNascaFixtures(payloadLive)).then((dd) => {

      const tp = dd?.payload?.category?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase()))?.map(rr => {
        return {
          ...rr,
          race: Array.isArray(rr?.race) ? rr?.race : [rr?.race]
        }
      })
      setLive(tp || []);
    });


  }, [])

  const liveMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    races: league?.races.filter(match => match.status === "Set 1" || match.status === "Set 2" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.races.length > 0);

  const upcomingMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    races: league?.races.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.races.length > 0);


  const finishedMatches = Array.isArray(live) && live?.map(league => ({
    ...league,
    races: league?.races.filter(match => match.status === "Cancelled" || match.status === "Finished")
  }))
    .filter(league => league?.races.length > 0);



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
            marginBottom: 10
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
            {liveMatches?.map((item, i) => {
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
                <div>
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <NascarCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>

            })}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((item, i) => {

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
                <div>
                  {item?.race?.map((aa, index) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={index}>
                        <NascarCard id={index} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>

            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => {
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
                <div>
                  {item?.race?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.id,
                      country: item?.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <NascarCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>

            })}
            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Nascar' height='30vh' />
            ) : null}
          </>
        )
          : null}




      </LoadingState>
    </div>
  )
}

export default Nascar
