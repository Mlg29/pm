import { useEffect, useState } from 'react'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { useNavigate } from 'react-router-dom'
import GameCard from '../../components/GameCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getFootballFixtures,
  footballFixtureStatusState
} from '../../redux/slices/FootballSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function Football({ leagueName }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() as any
  const [live, setLive] = useState<any>([])
  const loading = useAppSelector(footballFixtureStatusState) as any
  const [upcoming, setUpcoming] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const [finished, setFinished] = useState<any>([])


  console.log({ leagueName })

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }

    const payloadTomorrow = {
      range: 'd1'
    }
    const payloadFinished = {
      range: 'finished'
    }

    dispatch(getFootballFixtures(null)).then((dd) => {

      const filterData = dd?.payload?.category?.filter(m => leagueName?.some(word => m?.league?.toLowerCase().includes(word)))
      setLive(filterData || [])
    })

  }, [dispatch])


  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    matches: league.matches.filter(match => match.status > 0 || match.status === "HT")
  }))
    .filter(league => league.matches.length > 0);

  const isTimeFormat = (str) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(str);

  const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    matches: league.matches.filter(match => isTimeFormat(match?.status))
  }))
    .filter(league => league.matches.length > 0);


  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    matches: league.matches.filter(match => match.status === "FT")
  }))
    .filter(league => league.matches.length > 0);


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
            {liveMatches?.map((item, i) => {

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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.map((item, i) => {

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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => {

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
                    {item?.league}
                  </p>
                  <div>
                    {item?.matches?.map((aa, i) => {
                      const payload = {
                        league: item?.league,
                        leagueId: item?.leagueId,
                        country: item?.country,
                        ...aa
                      }
                      return (
                        <div key={i}>
                          <GameCard id={i} data={payload} sportStatus={selectedStatus} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Football' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default Football
