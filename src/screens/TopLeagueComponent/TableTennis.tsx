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
import { MdCancel } from "react-icons/md";
import { LoadingState } from '../../components/LoadingState'
import { getTableTennisFixtures } from '../../redux/slices/TableTennisSlice'
import TableTennisGameCard from '../../components/GameCard/TableTennisGameCard'


function TableTennis({ leagueName }) {
  const navigate = useNavigate()
  const [scheduled, setScheduled] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const [tomorrow, setTomorrow] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [live, setLive] = useState<any>([])






  useEffect(() => {



    setLoading(true)
    dispatch(getTableTennisFixtures(null)).then((dd) => {
      const filterData = dd?.payload?.category?.filter(m => leagueName?.some(word => m?.league?.toLowerCase().includes(word)))
      setLive(filterData || [])
      setLoading(false)
    })

  }, [])




  useEffect(() => {
    const PayloadScheduled = {
      range: 'upcoming'
    }
    dispatch(getTableTennisFixtures(PayloadScheduled)).then((dd) => {
      const filterData = dd?.payload?.category?.filter(m => leagueName?.some(word => m?.league?.toLowerCase().includes(word)))
      setScheduled(filterData || [])
    })
  }, [])


  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match?.filter(match => match?.status?.toLowerCase().includes("set"))
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = (Array.isArray(scheduled) ? scheduled : [scheduled]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => {
      const matchDate = match?.date;
      const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
      return matchDate === today && match.status === "Not Started";
    })
  }))
    .filter(league => league?.match.length > 0);



  const finishedMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Interrupted" || match.status === "Finished")
  }))
    .filter(league => league?.match.length > 0);




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


  const status = oldStatus



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
              <div key={i} style={{ position: 'relative' }}>

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
            {liveMatches?.map((league, index) => (
              <div key={league?.league}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TableTennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Table Tennis' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {Array.isArray(upcomingMatches) && upcomingMatches?.map((league, index) => {
              return <div key={league?.league}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match?.map((aa, i) => {
                    const payload = {
                      league: league?.league,
                      leagueId: league?.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TableTennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Table Tennis' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((league, index) => (
              <div key={league?.league}>
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
                  {league?.league}
                </p>
                <div>
                  {league?.match.map((aa, i) => {
                    const payload = {
                      league: league.league,
                      leagueId: league.id,
                      country: league.city,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TableTennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Table Tennis' height='30vh' />
            ) : null}
          </>
        ) : null}





      </LoadingState>
    </div>
  )
}

export default TableTennis
