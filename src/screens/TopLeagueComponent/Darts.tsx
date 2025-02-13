import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import { getDartFixtures } from '../../redux/slices/DartSlice'
import DartGameCard from '../../components/GameCard/DartGameCard'

function Darts({ leagueName }) {
  const navigate = useNavigate()

  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()

  useEffect(() => {
    const payloadUpcoming = {
      status: 'Not Started'
    }
    const payloadFinished = {
      status: 'Finished'
    }

    dispatch(getDartFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })

    dispatch(getDartFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
    })
  }, [])

  const groupedByData = (collectedData) => {
    return collectedData?.reduce((acc, current) => {
      const league = 'Dart'

      if (!acc[league]) {
        acc[league] = []
      }

      acc[league].push(current)

      return acc
    }, {})
  }

  const upcomingOutput = groupedByData(upcoming?.data)

  const finishedOutput = groupedByData(finished?.data)

  const [selectedStatus, setSelectedStatus] = useState('Scheduled')

  const status = [
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Dart</p>
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
      {selectedStatus === 'Scheduled' ? (
        <>
          {upcomingOutput &&
            Object.keys(upcomingOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {upcomingOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <DartGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      ) : null}

      {selectedStatus === 'Finished' ? (
        <>
          {finishedOutput &&
            Object.keys(finishedOutput)?.map((leagueName) => (
              <div key={leagueName}>
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
                  {leagueName}
                </p>
                <div>
                  {finishedOutput[leagueName].map((aa, i) => {
                    return (
                      <div key={i}>
                        <DartGameCard id={i} data={aa} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      ) : null}

      {upcoming?.data?.length < 1 && finished?.data?.length < 1 ? (
        <EmptyState header='No Game Available for Darts' height='30vh' />
      ) : null}
    </div>
  )
}

export default Darts
