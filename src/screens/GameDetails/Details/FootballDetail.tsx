import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import EmptyState from '../../../components/EmptyState'
import { FONTS } from '../../../utils/fonts'
import GameDetailCardHeader from '../../../components/GameDetailCardHeader'
import Button from '../../../components/Button'
import { COLORS } from '../../../utils/colors'
import { PiSoccerBallBold } from 'react-icons/pi'
import { TbRectangleVerticalFilled } from 'react-icons/tb'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import CardList from '../../../components/CardList'
import Formation from '../../../components/Formation'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  footballFixtureStatusState,
  getLogo,
  getMatchStat,
  getStat
} from '../../../redux/slices/FootballSlice'
import { LoadingState } from '../../../components/LoadingState'

function FootballDetail({
  selected,
  gameInfo,
  styles,
  isMobile,
  handleRoute,
  active,
  setActive,
  eventArray
}) {
  const [matchStat, setMatchStat] = useState(null)
  const loading = useAppSelector(footballFixtureStatusState) as any
  const dispatch = useAppDispatch() as any
  useEffect(() => {
    const matchStatPayload = {
      leagueId: gameInfo?.leagueId,
      matchId: gameInfo?.static_id
    }
    dispatch(getMatchStat(matchStatPayload)).then((dd) => {
      setMatchStat(dd?.payload)
    })
  }, [dispatch])

  return (
    <>
      <div
        style={{
          ...styles.btt,
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <GameDetailCardHeader
          data={gameInfo}
          homeLogo={gameInfo?.localTeam?.teamLogo}
          awayLogo={gameInfo?.visitorTeam?.teamLogo}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2rem'
          }}
        >
          {isMobile ? (
            <div style={{ ...styles.mob }}>
              <div style={{ width: '100%' }}>
                <Button
                  text={`Bet ${gameInfo?.localTeam?.name} Win`}
                  propStyle={{
                    width: '100%',
                    backgroundColor:
                      selected === gameInfo?.localTeam?.name
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.localTeam?.name
                        ? COLORS.cream
                        : COLORS.primary
                  }}
                  handlePress={() =>
                    handleRoute(gameInfo?.localTeam?.name, 'W1')
                  }
                />
              </div>
              <div style={{ width: '100%', margin: '10px 0px' }}>
                <Button
                  text='Draw'
                  propStyle={{
                    width: '100%',
                    backgroundColor:
                      selected === 'draw' ? COLORS.primary : COLORS.cream,
                    color: selected === 'draw' ? COLORS.cream : COLORS.primary
                  }}
                  //  handlePress={() => navigate('/home')}
                  handlePress={() => handleRoute('draw', 'DRAW')}
                />
              </div>
              <div style={{ width: '100%', margin: '0px 0px 10px 0px' }}>
                <Button
                  text={`Bet ${gameInfo?.visitorTeam?.name} Win`}
                  propStyle={{
                    width: '100%',
                    backgroundColor:
                      selected === gameInfo?.visitorTeam?.name
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.visitorTeam?.name
                        ? COLORS.cream
                        : COLORS.primary
                  }}
                  // handlePress={() => navigate('/home')}
                  handlePress={() =>
                    handleRoute(gameInfo?.visitorTeam?.name, 'W2')
                  }
                />
              </div>
            </div>
          ) : (
            <div style={{ ...styles.desk }}>
              <div style={{ width: '100%' }}>
                <Button
                  text={`Bet ${gameInfo?.localTeam?.name} Win`}
                  propStyle={{
                    width: '90%',
                    backgroundColor:
                      selected === gameInfo?.localTeam?.name
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.localTeam?.name
                        ? COLORS.cream
                        : COLORS.primary,
                    fontSize: 12
                  }}
                  handlePress={() =>
                    handleRoute(gameInfo?.localTeam?.name, 'W1')
                  }
                />
              </div>
              <div style={{ width: '100%', margin: '10px 0px' }}>
                <Button
                  text='Draw'
                  propStyle={{
                    width: '90%',
                    backgroundColor:
                      selected === 'draw' ? COLORS.primary : COLORS.cream,
                    color: selected === 'draw' ? COLORS.cream : COLORS.primary,
                    fontSize: 12
                  }}
                  //  handlePress={() => navigate('/home')}
                  handlePress={() => handleRoute('draw', 'DRAW')}
                />
              </div>
              <div style={{ width: '100%', margin: '10px 0px' }}>
                <Button
                  text={`Bet ${gameInfo?.visitorTeam?.name} Win`}
                  propStyle={{
                    width: '90%',
                    backgroundColor:
                      selected === gameInfo?.visitorTeam?.name
                        ? COLORS.primary
                        : COLORS.cream,
                    color:
                      selected === gameInfo?.visitorTeam?.name
                        ? COLORS.cream
                        : COLORS.primary,
                    fontSize: 12
                  }}
                  // handlePress={() => navigate('/home')}
                  handlePress={() =>
                    handleRoute(gameInfo?.visitorTeam?.name, 'W2')
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ ...styles.tabs, flexWrap: 'wrap' }}>
          <div
            style={{
              ...styles.tb,
              backgroundColor:
                active === 'match-info' ? COLORS.white : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setActive('match-info')}
          >
            <p style={{ ...FONTS.body6 }}>MATCH INFO</p>
          </div>
          <div
            style={{
              ...styles.tb,
              backgroundColor: active === 'stat' ? COLORS.white : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setActive('stat')}
          >
            <p style={{ ...FONTS.body6 }}>STATS</p>
          </div>
          <div
            style={{
              ...styles.tb,
              backgroundColor:
                active === 'lineup' ? COLORS.white : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setActive('lineup')}
          >
            <p style={{ ...FONTS.body6 }}>LINEUPS</p>
          </div>
          <div
            style={{
              ...styles.tb,
              backgroundColor: active === 'info' ? COLORS.white : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setActive('info')}
          >
            <p style={{ ...FONTS.body6 }}>INFO</p>
          </div>
        </div>

        <LoadingState isLoading={loading}>
          <div>
            {active === 'match-info' && eventArray?.length > 0 ? (
              <div>
                {eventArray &&
                  eventArray?.map((dd, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 10,
                          padding: 5
                        }}
                      >
                        <div style={{ width: '48%' }}>
                          {dd?.team === 'localteam' ? (
                            <div style={{ display: 'flex' }}>
                              {dd?.type === 'subst' ? (
                                <div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <p
                                      style={{
                                        ...FONTS.body7,
                                        marginRight: 5
                                      }}
                                    >
                                      {dd?.player}
                                    </p>
                                    <FaArrowRightArrowLeft
                                      size={10}
                                      color={COLORS.orange}
                                      style={{ marginRight: 10 }}
                                    />
                                    {dd?.assist ? (
                                      <p
                                        style={{
                                          ...FONTS.body7,
                                          fontSize: 8,
                                          marginRight: 5
                                        }}
                                      >
                                        ({dd?.player})
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p
                                    style={{
                                      ...FONTS.body7,
                                      marginRight: 5
                                    }}
                                  >
                                    {dd?.player}
                                  </p>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {dd?.assist ? (
                                      <p
                                        style={{
                                          ...FONTS.body7,
                                          fontSize: 8,
                                          marginRight: 5
                                        }}
                                      >
                                        ({dd?.assist})
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              )}

                              <p style={{ ...FONTS.body7, marginRight: 5 }}>
                                {dd?.minute}'
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <div>
                          {dd?.type === 'goal' ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <PiSoccerBallBold color={COLORS.green} />
                            </div>
                          ) : dd?.type === 'yellowcard' ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <TbRectangleVerticalFilled color='#FFC15E' />
                            </div>
                          ) : dd?.type === 'redcard' ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <TbRectangleVerticalFilled color='red' />
                            </div>
                          ) : null}
                        </div>

                        <div
                          style={{
                            width: '48%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                          }}
                        >
                          {dd?.team === 'visitorteam' ? (
                            <div style={{ display: 'flex' }}>
                              <p style={{ ...FONTS.body7, marginRight: 5 }}>
                                {dd?.minute}'
                              </p>
                              {dd?.type === 'subst' ? (
                                <div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <p
                                      style={{
                                        ...FONTS.body7,
                                        marginRight: 5
                                      }}
                                    >
                                      {dd?.player}
                                    </p>
                                    <FaArrowRightArrowLeft
                                      size={10}
                                      color={COLORS.orange}
                                      style={{ marginRight: 10 }}
                                    />
                                    {dd?.assist ? (
                                      <p
                                        style={{
                                          ...FONTS.body7,
                                          fontSize: 8,
                                          marginRight: 5
                                        }}
                                      >
                                        ({dd?.assist})
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p
                                    style={{
                                      ...FONTS.body7,
                                      marginRight: 5
                                    }}
                                  >
                                    {dd?.player}
                                  </p>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                  >
                                    {dd?.assist ? (
                                      <p
                                        style={{
                                          ...FONTS.body7,
                                          fontSize: 8,
                                          marginRight: 5
                                        }}
                                      >
                                        ({dd?.assist})
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : active === 'match-info' && eventArray?.length <= 0 ? (
              <div style={{ paddingTop: 50 }}>
                <EmptyState height='100%' header='No Stat Available' />
              </div>
            ) : null}
            {matchStat !== null && active !== 'match-info' ? (
              <div>
                {active === 'stat' && (
                  <div>
                    <CardList
                      header='Ball Possession'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.possestiontime?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.possestiontime?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Off sides'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.offsides?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.offsides?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Shots'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.shots?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.shots?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Passes'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.passes?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.passes?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Fouls'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.fouls?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.fouls?.['@total'] || 0
                      }
                    />
                    <CardList
                      header={<TbRectangleVerticalFilled color='#FFC15E' />}
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.yellowcards?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.yellowcards?.['@total'] || 0
                      }
                    />
                    <CardList
                      header={<TbRectangleVerticalFilled color='red' />}
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.redcards?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.redcards?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Corners'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.corners?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.corners?.['@total'] || 0
                      }
                    />
                    <CardList
                      header='Saves'
                      homeText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.localteam?.saves?.['@total'] || 0
                      }
                      awayText={
                        matchStat?.commentaries?.tournament?.match?.stats
                          ?.visitorteam?.saves?.['@total'] || 0
                      }
                    />
                  </div>
                )}

                {active === 'lineup' && (
                  <div style={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Formation
                      gameInfo={{
                        ...gameInfo,
                        ...matchStat?.commentaries?.tournament?.match
                      }}
                      homeTeamInfo={
                        matchStat?.commentaries?.tournament?.match?.teams
                          ?.localteam
                      }
                      awayTeamInfo={
                        matchStat?.commentaries?.tournament?.match?.teams
                          ?.visitorteam
                      }
                    />
                  </div>
                )}

                {active === 'info' && (
                  <div>
                    <div style={{ marginTop: '1rem' }}>
                      <h1 style={{ ...FONTS.h6, textAlign: 'center' }}>
                        Attendance
                      </h1>
                      <p style={{ ...FONTS.body6, textAlign: 'center' }}>
                        {
                          matchStat?.commentaries?.tournament?.match?.matchinfo
                            ?.attendance?.['@name']
                        }
                      </p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <h1 style={{ ...FONTS.h6, textAlign: 'center' }}>
                        Referee
                      </h1>
                      <p style={{ ...FONTS.body6, textAlign: 'center' }}>
                        {
                          matchStat?.commentaries?.tournament?.match?.matchinfo
                            ?.referee?.['@name']
                        }
                      </p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <h1 style={{ ...FONTS.h6, textAlign: 'center' }}>
                        Stadium
                      </h1>
                      <p style={{ ...FONTS.body6, textAlign: 'center' }}>
                        {
                          matchStat?.commentaries?.tournament?.match?.matchinfo
                            ?.stadium?.['@name']
                        }
                      </p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <h1 style={{ ...FONTS.h6, textAlign: 'center' }}>Time</h1>
                      <p style={{ ...FONTS.body6, textAlign: 'center' }}>
                        {
                          matchStat?.commentaries?.tournament?.match?.matchinfo
                            ?.time?.['@name']
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : active === 'match-info' ? null : (
              <div style={{ paddingTop: 50 }}>
                <EmptyState height='100%' header='No Stat Available' />
              </div>
            )}
          </div>
        </LoadingState>
      </div>

      <ToastContainer />
    </>
  )
}

export default FootballDetail
