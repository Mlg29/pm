import React, { forwardRef, useEffect, useState } from 'react'

import { COLORS } from '../../utils/colors'
import { FlexDirection } from '../../utils/type'
import { FONTS } from '../../utils/fonts'

import { useLocation, useNavigate } from 'react-router-dom'

import Football from '../TopLeagueComponent/Football'
import Basketball from '../TopLeagueComponent/Basketball'
import HorseRace from '../TopLeagueComponent/HorseRace'
import Tennis from '../TopLeagueComponent/Tennis'
import Cricket from '../TopLeagueComponent/Cricket'
import Boxing from '../TopLeagueComponent/Boxing'
import Baseball from '../TopLeagueComponent/BaseBall'
import Volleyball from '../TopLeagueComponent/Volleyball'
import Golf from '../TopLeagueComponent/Golf'
import Hockey from '../TopLeagueComponent/Hockey'
import Formula1 from '../TopLeagueComponent/Formula1'
import Rugby from '../TopLeagueComponent/Rugby'
import Handball from '../TopLeagueComponent/Handball'
import IceHockey from '../TopLeagueComponent/IceHockey'
import Nascar from '../TopLeagueComponent/Nascar'
import Futsol from '../TopLeagueComponent/Futsol'
import Mma from '../TopLeagueComponent/Mma'
import Darts from '../TopLeagueComponent/Darts'
import Snooker from '../TopLeagueComponent/Snooker'
import Easport from '../TopLeagueComponent/Easport'
import TableTennis from '../TopLeagueComponent/TableTennis'
import AussieRules from '../TopLeagueComponent/AussieRules'




function League() {
  const location = useLocation()
  const searchWords = location.state?.data
  const sportEvents = location.state?.sport

  const leagueId = searchWords?.id;

  return (
    <div className='top-container'>


      <h3 style={{ ...FONTS.h6 }}>{searchWords?.name}</h3>

      <div>
        {sportEvents && sportEvents === "Soccer" && <Football leagueName={leagueId} />}
        {sportEvents === "Basketball" && <Basketball leagueName={leagueId} />}

        {sportEvents === "Tennis" && <Tennis leagueName={leagueId} />}

        {sportEvents === "Horse" && <HorseRace leagueName={leagueId} />}
        {sportEvents === "Cricket" && <Cricket leagueName={leagueId} />}
        {sportEvents === "Boxing" && <Boxing leagueName={leagueId} />}
        {sportEvents === "Baseball" && <Baseball leagueName={leagueId} />}
        {sportEvents === "Volleyball" && <Volleyball leagueName={leagueId} />}
        {sportEvents === "Golf" && <Golf leagueName={leagueId} />}
        {sportEvents === "Hockey" && <Hockey leagueName={leagueId} />}
        {sportEvents === "Formula 1" && <Formula1 leagueName={leagueId} />}
        {sportEvents === "AFL" && <Rugby leagueName={leagueId} />}
        {sportEvents === "Handball" && <Handball leagueName={leagueId} />}
        {sportEvents === "Ice Hockey" && <IceHockey leagueName={leagueId} />}
        {sportEvents === "NASCAR" && <Nascar leagueName={leagueId} />}
        {sportEvents === "Futsal" && <Futsol leagueName={leagueId} />}
        {sportEvents === "MMA/UFC" && <Mma leagueName={leagueId} />}
        {sportEvents === "Darts" && <Darts leagueName={leagueId} />}
        {sportEvents === "Snooker" && <Snooker leagueName={leagueId} />}
        {sportEvents === "Esports" && <Easport leagueName={leagueId} />}
        {sportEvents === "Table Tennis" && <TableTennis leagueName={leagueId} />}
        {sportEvents === "Aussie Rules" && <AussieRules leagueName={leagueId} />}
      </div>
    </div>
  )
}

export default League
