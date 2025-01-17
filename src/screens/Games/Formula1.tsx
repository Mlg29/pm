import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { BaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import {
  getFormulaFixtures,
  formulaFixtureStatusState
} from '../../redux/slices/Formula'
import { LoadingState } from '../../components/LoadingState'

function Formula1() {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(formulaFixtureStatusState) as any
  const maxMatchesToDisplay = 5
  const url = `${BaseUrl}/boxing`
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'd1'
    }
    const payloadLive = {
      range: 'live'
    }
    const payloadFinished = {
      range: 'd-1'
    }

    dispatch(getFormulaFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload)
    })
    dispatch(getFormulaFixtures(payloadLive)).then((dd) => {
      console.log('<>><>>', dd)
      setLive(dd?.payload)
    })
    dispatch(getFormulaFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload)
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Formula1</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
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
            {live?.length > 0 && (
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

            {live?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
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
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
                          ...aa
                        }
                        return <div key={i}></div>
                      })}
                    </div>
                  </div>
                )
            )}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming.length > 0 && (
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

            {upcoming?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
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
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
                          ...aa
                        }
                        return <div key={i}></div>
                      })}
                    </div>
                  </div>
                )
            )}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finished.length > 0 && (
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

            {finished?.map(
              (item, i) =>
                i < maxMatchesToDisplay && (
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
                      {item?.match?.map((aa, i) => {
                        const payload = {
                          league: item?.name,
                          country: item?.file_group,
                          ...aa
                        }
                        return <div key={i}></div>
                      })}
                    </div>
                  </div>
                )
            )}
          </>
        ) : null}
        {live?.length < 1 && finished?.length < 1 && upcoming?.length < 1 ? (
          <EmptyState header='No Game Available for Formula1' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Formula1
