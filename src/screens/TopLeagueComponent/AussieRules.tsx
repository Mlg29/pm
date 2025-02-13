import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import {
  AussieRuleStatusState,
  getAussieRuleFixtures
} from '../../redux/slices/AussieRuleSlice'
import { LoadingState } from '../../components/LoadingState'
import AussieRulesGameCard from '../../components/GameCard/AusseiRules'

function AussieRules({ leagueName }) {
  const [upcoming, setUpcoming] = useState<any>([])
  const [standings, setStandings] = useState<any>([])
  const [live, setLive] = useState<any>([])
  const dispatch = useAppDispatch() as any
  const loading = useAppSelector(AussieRuleStatusState)

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadLive = {
      eventType: 'live'
    }
    const payloadSchedule = {
      eventType: 'schedule'
    }
    const payloadStanding = {
      eventType: 'standings'
    }

    dispatch(getAussieRuleFixtures(payloadLive)).then((dd) => {

      setLive(dd?.payload?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase())))
    })
    dispatch(getAussieRuleFixtures(payloadSchedule)).then((dd) => {

      setUpcoming(dd?.payload?.results?.tournament?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase())))
    })
    // dispatch(getAussieRuleFixtures(payloadStanding)).then((dd) => {
    //   setStandings(dd?.payload?.standings)
    // })
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
            {live?.map((item, i) => {
              const payload = {
                league: item?.name,
                leagueId: item?.id,
                ...item
              }
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
                    {item?.name}
                  </p>
                  <AussieRulesGameCard id={i} data={payload} />

                </div>
              )
            })}
            {live?.length < 1 ? (
              <EmptyState
                header='No Game Available for Aussie Rules'
                height='30vh'
              />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.round?.map((item, i) => {
              const payload = {
                league: item?.name,
                leagueId: item?.id,
                ...item
              }
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
                    {item?.name}
                  </p>
                  <AussieRulesGameCard id={i} data={payload} />

                </div>
              )
            })}

            {upcoming?.length < 1 ? (
              <EmptyState
                header='No Game Available for Aussie Rules'
                height='30vh'
              />
            ) : null}
          </>
        ) : null}

      </LoadingState>
    </div>
  )
}

export default AussieRules
