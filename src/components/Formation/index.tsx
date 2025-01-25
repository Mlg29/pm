import React, { useEffect, useState } from 'react'

import SoccerLineUp from 'react-soccer-lineup'
import { FlexDirection } from '../../utils/type'
import Team from 'react-soccer-lineup'
import milan from '../../assets/images/millan.svg'
import roma from '../../assets/images/roma.svg'
import { FONTS } from '../../utils/fonts'
import { formatImageSrc } from '../../utils/helper'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftHalf: {
    marginRight: 20
  },
  rightHalf: {
    marginLeft: 20
  },
  rotate: {
    //rotate: "90deg",
    // marginTop: "6rem",
    //  marginBottom: "6rem",
    // marginTop: "2rem",
  },
  info: {
    display: 'flex',
    flexDirection: 'row' as FlexDirection,
    justifyContent: 'space-between',
    // alignItems: "center",
    padding: 10
  }
}

const Formation = ({ gameInfo, homeTeamInfo, awayTeamInfo }) => {

  const [teamLogo, setTeamLogo] = useState({
    local: gameInfo?.localTeam?.teamLogo,
    away: gameInfo?.visitorTeam?.teamLogo
  })

  const transformPlayers = (players, color) => {
    return players?.reduce(
      (team, player) => {
        const position = player['@pos']
        const playerData = {
          number: player['@number'],
          color: color,
          numberColor: '10'
        }

        if (position === 'G') {
          team.squad.gk = playerData
        } else if (position === 'D') {
          team.squad.df.push(playerData)
        } else if (position === 'M') {
          if (player['@formation_pos'] <= 7) {
            team.squad.cdm.push(playerData)
          } else {
            team.squad.cam.push(playerData)
          }
        } else if (position === 'F') {
          team.squad.fw.push(playerData)
        }

        return team
      },
      {
        squad: {
          gk: {},
          df: [],
          cdm: [],
          cam: [],
          fw: [],
          style: {
            color: 'red',
            numberColor: 'blue'
          }
        }
      }
    )
  }

  const homeTeam = transformPlayers(homeTeamInfo?.player, '#FDDC02')
  const awayTeam = transformPlayers(awayTeamInfo?.player, '#4285F4')

  // useEffect(() => {
  //   const awayLogo = formatImageSrc(gameInfo?.localTeam?.teamLogo)
  //   const localLogo = formatImageSrc(gameInfo?.visitorTeam?.teamLogo)
  //   setTeamLogo(() => {
  //     return {
  //       away: awayLogo,
  //       local: localLogo
  //     }
  //   })
  // }, [gameInfo])

  console.log(teamLogo)
  return (
    <div style={{ ...styles.rotate }}>
      <div style={{ ...styles.info }}>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <img src={teamLogo?.local} style={{ width: 30, height: 30 }} />
            <p style={{ ...FONTS.body6, marginLeft: 4 }}>
              {gameInfo?.localTeam?.name}
            </p>
          </div>
          {/* <h3 style={{ ...FONTS.body7, marginLeft: 10, marginTop: 5 }}>
            M. Arteta
          </h3> */}
        </div>
        <p style={{ ...FONTS.body6 }}>{homeTeamInfo?.['@formation']}</p>
      </div>
      <SoccerLineUp
        size={'responsive'}
        color={'#588f58'}
        pattern={'lines'}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <div style={{ ...styles.info }}>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <img src={teamLogo?.away} style={{ width: 30, height: 30 }} />
            <p style={{ ...FONTS.body6, marginLeft: 4 }}>
              {gameInfo?.visitorTeam?.name}
            </p>
          </div>
          {/* <h3 style={{ ...FONTS.body7, marginLeft: 10, marginTop: 5 }}>
            M. Arteta
          </h3> */}
        </div>
        <p style={{ ...FONTS.body6 }}>{awayTeamInfo?.['@formation']}</p>
      </div>

      <div style={{ backgroundColor: 'white' }}>
        <p style={{ ...FONTS.body5, textAlign: 'center', marginTop: 5 }}>
          SUBSTITUTES
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '49%' }}>
            {gameInfo?.substitutes?.localteam?.player?.map((dd) => {
              return (
                <div style={{ padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ ...FONTS.body7, marginRight: 5 }}>
                      {dd['@number']}
                    </p>
                    <p style={{ ...FONTS.body7, marginRight: 5 }}>
                      {dd['@name']}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            style={{
              width: '49%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            {gameInfo?.substitutes?.visitorteam?.player?.map((dd) => {
              return (
                <div style={{ padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ ...FONTS.body7, marginRight: 5 }}>
                      {dd?.['@number']}
                    </p>
                    <p style={{ ...FONTS.body7, marginRight: 5 }}>
                      {dd?.['@name']}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formation
