import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import {
  getBaseballFixtures,
  BaseballFixtureeStatusState
} from '../../redux/slices/BaseballSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'
import BaseballGameCard from '../../components/GameCard/BaseballGameCard'

function Baseball({ leagueName }) {
  const dispatch = useAppDispatch() as any
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(BaseballFixtureeStatusState) as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'd1'
    }
    const payloadFinished = {
      range: 'd-1'
    }
    dispatch(getBaseballFixtures(null)).then((dd) => {
      setLive(dd?.payload?.categories?.filter(m => m?.["@name"]?.toLowerCase().includes(leagueName?.toLowerCase())) || [])
    })

  }, [dispatch])



  const liveMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Set 1" || match.status === "Set 2" || match.status === "Set 3" || match.status === "Set 4" || match.status === "Set 5" || match.status === "Set 6" || match.status === "Set 7")
  }))
    .filter(league => league?.match.length > 0);

  const upcomingMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Not Started")
  }))
    .filter(league => league?.match.length > 0);


  const finishedMatches = live?.map(league => ({
    ...league,
    match: league?.match.filter(match => match.status === "Cancelled" || match.status === "Finished")
  }))
    .filter(league => league?.match.length > 0);


  const [selectedStatus, setSelectedStatus] = useState('Finished')

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
            {liveMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
                  }}
                >
                  {item?.['@name']}
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {liveMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcomingMatches?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p
                  style={{
                    ...FONTS.body6,
                    color: COLORS.gray,
                    margin: '15px 0px'
                  }}
                ></p>
              </div>
            )}

            {upcomingMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {upcomingMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedMatches?.map((item, i) => (
              <div key={i}>
                <p
                  style={{
                    ...FONTS.body7,
                    backgroundColor: COLORS.lightRed,
                    padding: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    color: COLORS.black,
                    marginRight: 5
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
                        <BaseballGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finishedMatches?.length < 1 ? (
              <EmptyState header='No Game Available for Baseball' height='30vh' />
            ) : null}
          </>
        ) : null}



      </LoadingState>
    </div>
  )
}

export default Baseball
