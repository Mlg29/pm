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
import { getEasportFixtures, getEasportFixturesMatch } from '../../redux/slices/Easport'
import EsportGameCard from '../../components/GameCard/EsportGameCard'
import { MdCancel } from "react-icons/md";


function Easport({ leagueName }) {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const [live, setLive] = useState<any>([])

  const dispatch = useAppDispatch() as any
  const [selectedStatus, setSelectedStatus] = useState('Live')



  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  const url = `${SportSportBaseUrl}`;




  useEffect(() => {



    dispatch(getEasportFixtures()).then((dd) => {
      console.log({ dd })
      const filterData = dd?.payload?.match?.filter(m => m?.id === leagueName)
      setLive(filterData)
    })
  }, [])


  const liveLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status?.toLowerCase() === "live" || bb?.status === "Started")
  const scheduleLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Not Started" || bb?.status === "Postponed")
  const finishedLeagues = (Array.isArray(live) ? live : [live]).filter(league => league && typeof league === "object")?.filter(bb => bb?.status === "Finished" || bb?.status === "FT" || bb?.status === "Walkover")



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
            marginBottom: '10px'
          }}
        >
          {status?.map((aa, i) => {
            return (
              <div key={i} style={{ position: 'relative' }}>

                <p
                  onClick={() => setSelectedStatus(aa?.name)}
                  style={{
                    width: 80,
                    padding: "5px 3px",
                    cursor: 'pointer',
                    backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'white',
                    color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                    marginRight: 4,
                    textAlign: 'center',
                    fontSize: 12,
                    border: "1px solid #2D0D02",
                    borderRadius: 3
                  }}
                >
                  {aa?.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      {selectedStatus === 'Live' ? (
        <>
          {liveLeagues?.map((aa, i) => {
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
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {liveLeagues?.length < 1 ? (
            <EmptyState header='No Game Available for Easport' height='30vh' />
          ) : null}
        </>
      ) : null}

      {selectedStatus === 'Scheduled' ? (
        <>
          {scheduleLeagues?.map((aa, i) => {
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
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {scheduleLeagues?.length < 1 ? (
            <EmptyState header='No Game Available for Easport' height='30vh' />
          ) : null}
        </>
      ) : null}

      {selectedStatus === 'Finished' ? (
        <>
          {finishedLeagues?.map((aa, i) => {
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
                  {aa?.type} - {aa?.league}
                </p>
                <EsportGameCard id={i} data={aa} />
              </div>
            )
          })}
          {
            finishedLeagues?.length < 1 ? (
              <EmptyState header='No Game Available for Easport' height='30vh' />
            ) : null}
        </>
      ) : null}


    </div>
  )
}

export default Easport
