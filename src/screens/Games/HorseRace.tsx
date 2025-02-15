import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import moment from 'moment'
import {
  getHorseFixtures,
  horseFixtureStatusState
} from '../../redux/slices/horseSlice'
import { COLORS } from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import HorseGameCard from '../../components/GameCard/HorseGameCard'
import EmptyState from '../../components/EmptyState'
import { LoadingState } from '../../components/LoadingState'

function HorseRace() {
  const dispatch = useAppDispatch() as any
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(horseFixtureStatusState) as any
  const [Live, setLive] = useState<any>([])
  const [Schedule, setSchedule] = useState<any>([])

  let createdDate = moment(new Date()).utc().format()
  let ScheduleDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadFinished = {
      range: 'finished'
    }
    dispatch(getHorseFixtures(null)).then((dd) => {

      setLive(dd?.payload?.tournaments || [])
    })
    dispatch(getHorseFixtures(payloadUpcoming)).then((dd) => {
      setSchedule(dd?.payload?.tournaments || [])
    })
    dispatch(getHorseFixtures(payloadFinished)).then((dd) => {

      setFinished(dd?.payload?.scores?.tournaments || [])
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
      name: 'Schedule'
    },
    {
      id: 3,
      name: 'Finished'
    }
  ]



  return (
    <div>
      <div>
        <p style={{ fontSize: 14, fontWeight: '500' }}>Horse Race</p>
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
      {selectedStatus === 'Live' ? (
        <>
          {Live?.length > 0 && (
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
        </>
      ) : null}

      <LoadingState isLoading={loading}>
        {selectedStatus === 'Live' ? (
          <>
            {Array.isArray(Live) && Live?.map((item, i) => (
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
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {Live?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Schedule' ? (
          <>
            {Schedule?.map((item, i) => (
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
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {Schedule?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
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
                  {item?.races?.map((aa, i) => {
                    const payload = {
                      league: item?.name,
                      leagueId: item?.tournamentId,
                      date: item?.date,
                      country: item?.file_group,
                      ...aa
                    }
                    return (
                      <div key={i}>
                        <HorseGameCard id={i} data={payload} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {finished?.length < 1 ? (
              <EmptyState header='No Game Available for Horse Race' height='30vh' />
            ) : null}
          </>
        ) : null}


      </LoadingState>
    </div>
  )
}

export default HorseRace
