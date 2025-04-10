import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { SportSportBaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import EmptyState from '../../components/EmptyState'
import {
  getFormulaFixtures,
  formulaFixtureStatusState,
  getFormulaMatchFixtures
} from '../../redux/slices/Formula'
import { LoadingState } from '../../components/LoadingState'
import Formula1Card from '../../components/GameCard/Formula1Card'

function Formula1({ leagueName }) {
  const navigate = useNavigate()
  const [live, setLive] = useState<any>([])
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const loading = useAppSelector(formulaFixtureStatusState) as any
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    const payloadUpcoming = {
      range: 'upcoming'
    }
    const payloadLive = {
      range: 'live'
    }
    const payloadFinished = {
      range: 'finished'
    }

    // dispatch(getFormulaMatchFixtures(payloadUpcoming)).then((dd) => {
    //   const filterData = dd?.payload?.scores?.tournament?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase()))
    //   setUpcoming(filterData || [])
    // })
    dispatch(getFormulaFixtures(payloadLive)).then((dd) => {
      const filterData = dd?.payload?.scores?.categories?.filter(m => m?.id === leagueName)
      setLive(filterData || [])
    })
    // dispatch(getFormulaMatchFixtures(payloadFinished)).then((dd) => {
    //   const filterData = dd?.payload?.scores?.tournaments?.filter(m => m?.name?.toLowerCase().includes(leagueName?.toLowerCase()))
    //   setFinished(filterData || [])
    // })
  }, [])

  const liveLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status > 0 || bb?.status === "HT")
  const scheduleLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Not Started")
  const finishedLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Finished" || bb?.status === "FT")


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
            {liveLeagues?.map((item, i) => {
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
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}

            {liveLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        ) : null}
        {selectedStatus === 'Scheduled' ? (
          <>
            {scheduleLeagues?.map((item, i) => {
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
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}
            {scheduleLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        ) : null}

        {selectedStatus === 'Finished' ? (
          <>
            {finishedLeagues?.map((item, i) => {
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
                  <Formula1Card id={i} data={item} />
                </div>
              </div>

            })}

            {finishedLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Formula1' height='30vh' />
            ) : null}
          </>
        )
          : null}



      </LoadingState>
    </div>
  )
}

export default Formula1
