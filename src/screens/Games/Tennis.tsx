import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import TennisGameCard from '../../components/GameCard/TennisGameCard'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getTennisFixtures,
  tennisFixtureStatusState
} from '../../redux/slices/TennisSlice'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function Tennis() {
  const [live, setLive] = useState<any>([])
  const loading = useAppSelector(tennisFixtureStatusState) as any
  const [Finished, setFinished] = useState<any>([])
  const [scheduled, setScheduled] = useState<any>([])
  const dispatch = useAppDispatch() as any
  let createdDate = moment(new Date()).utc().format()

  useEffect(() => {
    const PayloadFinished = {
      range: 'home_p2p'
    }
    const PayloadScheduled = {
      range: 'd1'
    }
    dispatch(getTennisFixtures(PayloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })
    dispatch(getTennisFixtures(PayloadScheduled)).then((dd) => {
      setScheduled(dd?.payload)
    })
    dispatch(getTennisFixtures(null)).then((dd) => {
      setLive(dd?.payload?.scores)
    })
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
      id: 3,
      name: 'Finished'
    }
  ]

  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Tennis</p>
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
            {live?.category?.map((league, index) => (
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
                  {league?.name}
                </p>
                <div>
                  {live?.category[index]?.match?.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
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
            {scheduled?.category?.map((league, index) => {
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
                  {league?.name}
                </p>
                <div>
                  {scheduled?.category[index]?.match.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            })}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {Finished?.category?.map((league, index) => (
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
                  {league?.name}
                </p>
                <div>
                  {Finished?.category[index]?.match.map((aa, i) => {
                    const payload = {
                      league: league.name,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <TennisGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        ) : null}

        {live?.category?.length < 1 && Finished?.category?.length < 1 ? (
          <EmptyState header='No Game Available for Tennis' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Tennis
