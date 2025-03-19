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
import { getIceHockeyFixtures } from '../../redux/slices/IceHockeySlice'
import { LoadingState } from '../../components/LoadingState'
import IceHockeyGameCard from '../../components/GameCard/IceHockeyGameCard'
import HeaderBox from '../HeaderBox'

function IceHockey() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [live, setLive] = useState<any>([])
  const [tomorrow, setTomorrow] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const [calendarDate, setCalendarDate] = useState<{ index: string; formattedDate: string } | null>(null);
  const url = `${SportSportBaseUrl}`;


  useEffect(() => {

    const socket = io(url) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("iceHockeyUpdates", (message) => {
      const mes = message;
      setLive(mes?.category)
    });

    return () => {
      socket.disconnect();
    };
  }, []);




  useEffect(() => {

    setLoading(true)
    dispatch(getIceHockeyFixtures(null)).then((dd) => {
      setLive(dd?.payload?.category)
      setLoading(false)
    })


  }, [])


  useEffect(() => {

    const payloadTomorrow = {
      range: calendarDate?.index
    }



    if (calendarDate) {
      setLoading(true)
      setSelectedStatus(calendarDate?.formattedDate)
      dispatch(getIceHockeyFixtures(payloadTomorrow)).then((dd) => {
        setTomorrow(dd?.payload?.category)
        setLoading(false)

      })
    }
  }, [calendarDate])

  const liveMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
    ...league,
    match: league?.match?.filter(match => match?.status?.toLowerCase().includes("period"))
  }))
    .filter(league => league?.match.length > 0);


  const upcomingMatches = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.map(league => ({
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
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "After Penalties" || match.status === "After Overtime" || match.status === "Interrupted" || match.status === "Finished")
  }))
    .filter(league => league?.match.length > 0);

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

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
        <p style={{ fontSize: 14, fontWeight: '500' }}>IceHockey</p>
        <HeaderBox status={status} selectedStatus={selectedStatus} setTomorrow={setTomorrow} calendarDate={calendarDate} setCalendarDate={setCalendarDate} setSelectedStatus={setSelectedStatus} />
      </div>
      <LoadingState isLoading={loading}>
        {selectedStatus === 'Live' ? (
          <>
            {liveMatches?.map((league, index) => (
              <div key={league?.name}>
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
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <IceHockeyGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Ice Hockey' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {Array.isArray(upcomingMatches) && upcomingMatches?.map((league, index) => {
              return <div key={league?.name}>
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
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <IceHockeyGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Ice Hockey' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((league, index) => (
              <div key={league?.name}>
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
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <IceHockeyGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Ice Hockey' height='30vh' />
            ) : null}
          </>
        ) : null}


        {selectedStatus === calendarDate?.formattedDate ? (
          <>
            {tomorrow?.map((league, index) => (
              <div key={league?.name}>
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
                      country: league.country,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <IceHockeyGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {tomorrow?.length < 1 ? (
              <EmptyState header='No Game Available for Ice Hockey' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default IceHockey
