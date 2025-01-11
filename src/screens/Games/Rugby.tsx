import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FONTS } from '../../utils/fonts'
import { COLORS } from '../../utils/colors'

import { io } from 'socket.io-client'
import { BaseUrl } from '../../https'
import moment from 'moment'
import { useAppDispatch } from '../../redux/hooks'
import { getBoxingFixtures } from '../../redux/slices/BoxingSlice'
import EmptyState from '../../components/EmptyState'
import { getAflFixtures } from '../../redux/slices/AflSlice'
import AflGameCard from '../../components/GameCard/AflGameCard'

function Rugby() {
  const navigate = useNavigate()
  const [upcoming, setUpcoming] = useState<any>([])
  const [finished, setFinished] = useState<any>([])
  const maxPageSize = 9
  const url = `${BaseUrl}/boxing`
  const dispatch = useAppDispatch() as any

  let createdDate = moment(new Date()).utc().format()
  let tomorrowDate = moment(createdDate).add(1, 'd')

  useEffect(() => {
    // const payloadUpcoming = {
    //   status: "Not Started",
    // };
    // const payloadFinished = {
    //     status: "Full Time",
    //   };

    dispatch(getAflFixtures(null)).then((dd) => {
      setUpcoming(dd?.payload?.scores)
    })

    // dispatch(getAflFixtures(null)).then((dd) => {
    //   setFinished(dd?.payload?.scores)
    // })
  }, [])

  // const groupedByData = (collectedData) => {
  //   return collectedData?.reduce((acc, current) => {
  //     const league = (current?.season + " " + current?.seasonName) || "AFL";

  //     if (!acc[league]) {
  //       acc[league] = [];
  //     }

  //     acc[league].push(current);

  //     return acc;
  //   }, {});
  // };

  // const upcomingOutput = groupedByData(upcoming?.category?.match)
  // const finishedOutput = groupedByData(finished?.data)

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
        <p style={{ fontSize: 14, fontWeight: '500' }}>AFL</p>
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
      {selectedStatus === 'Scheduled' ? (
        <>
          {upcoming?.category?.match?.length > 0 && (
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
              {upcoming?.data?.category?.match.length > 10 && (
                <p
                  style={{
                    ...FONTS.body7,
                    color: COLORS.orange,
                    cursor: 'pointer',
                    margin: '15px 0px'
                  }}
                  onClick={() =>
                    navigate('/events', {
                      state: {
                        events: upcoming,
                        type: 'upcoming',
                        gameType: 'AFL'
                      }
                    })
                  }
                >
                  View more
                </p>
              )}
            </div>
          )}

          {upcoming?.category?.match?.map((league, index) => (
            <div key={index}>
              {league?.name && (
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
              )}
              <AflGameCard id={index} data={league} />
            </div>
          ))}
        </>
      ) : null}

      {selectedStatus === 'Finished' ? (
        <>
          {finished?.category?.match?.length > 0 && (
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
              {finished?.category?.match.length > 10 && (
                <p
                  style={{
                    ...FONTS.body7,
                    color: COLORS.orange,
                    cursor: 'pointer',
                    margin: '15px 0px'
                  }}
                  onClick={() =>
                    navigate('/events', {
                      state: {
                        events: finished,
                        type: 'Full Time',
                        gameType: 'AFL'
                      }
                    })
                  }
                >
                  View more
                </p>
              )}
            </div>
          )}

          {finished?.category?.match?.map((league, index) => (
            <div key={index}>
              {league?.name && (
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
              )}
              <AflGameCard id={index} data={league} />
            </div>
          ))}
        </>
      ) : null}

      {upcoming?.category?.match?.length < 1 &&
      finished?.category?.match?.length < 1 ? (
        <EmptyState
          header='No Game Available for American Football Rugby'
          height='30vh'
        />
      ) : null}
    </div>
  )
}

export default Rugby
