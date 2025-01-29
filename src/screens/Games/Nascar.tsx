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

function Nascar() {
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
      setLive(dd?.payload?.scores?.tournament);
    });

    dispatch(getNascaMatchFixtures(payloadUpcoming)).then((dd) => {
      setUpcoming(dd?.payload?.scores?.tournament);
    });
    dispatch(getNascaMatchFixtures(payloadFinished)).then((dd) => {
      setFinished(dd?.payload?.scores?.tournament);
    });
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
        <p style={{ fontSize: 14, fontWeight: '500' }}>Nascar</p>
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
            {live.race?.map((item, i) => {
              const payload = {
                name: live?.name,
                ...item
              }
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
                  {live?.name}
                </p>
                <div key={i}>
                  <NascarCard id={i} data={payload} />
                </div>
              </div>

            })}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {upcoming?.map((item, i) => {
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
                <div key={i}>
                  <NascarCard id={i} data={item} />
                </div>
              </div>

            })}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finished?.map((item, i) => {
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
                <div key={i}>
                  <NascarCard id={i} data={item} />
                </div>
              </div>

            })}

          </>
        )
          : null}
        {live?.length < 1 && finished?.length < 1 && upcoming?.length < 1 ? (
          <EmptyState header='No Game Available for Formula1' height='30vh' />
        ) : null}
      </LoadingState>
    </div>
  )
}

export default Nascar
