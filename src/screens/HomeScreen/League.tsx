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
  const searchWords = location.state?.name
  const sportEvents = location.state?.sport

  const leagueName = searchWords?.toLowerCase().split(" ");

  return (
    <div className='top-container'>


      <h3 style={{ ...FONTS.h6 }}>{searchWords}</h3>

      <div>
        {sportEvents && sportEvents === "Soccer" && <Football leagueName={leagueName} />}
        {sportEvents === "Basketball" && <Basketball leagueName={leagueName} />}

        {sportEvents === "Tennis" && <Tennis leagueName={leagueName} />}

        {sportEvents === "Horse" && <HorseRace leagueName={leagueName} />}
        {sportEvents === "Cricket" && <Cricket leagueName={leagueName} />}
        {sportEvents === "Boxing" && <Boxing leagueName={leagueName} />}
        {sportEvents === "Baseball" && <Baseball leagueName={leagueName} />}
        {sportEvents === "Volleyball" && <Volleyball leagueName={leagueName} />}
        {sportEvents === "Golf" && <Golf leagueName={leagueName} />}
        {sportEvents === "Hockey" && <Hockey leagueName={leagueName} />}
        {sportEvents === "Formula 1" && <Formula1 leagueName={leagueName} />}
        {sportEvents === "AFL" && <Rugby leagueName={leagueName} />}
        {sportEvents === "Handball" && <Handball leagueName={leagueName} />}
        {sportEvents === "Ice Hockey" && <IceHockey leagueName={leagueName} />}
        {sportEvents === "NASCAR" && <Nascar leagueName={leagueName} />}
        {sportEvents === "Futsal" && <Futsol leagueName={leagueName} />}
        {sportEvents === "MMA/UFC" && <Mma leagueName={leagueName} />}
        {sportEvents === "Darts" && <Darts leagueName={leagueName} />}
        {sportEvents === "Snooker" && <Snooker leagueName={leagueName} />}
        {sportEvents === "Esports" && <Easport leagueName={leagueName} />}
        {sportEvents === "Table Tennis" && <TableTennis leagueName={leagueName} />}
        {sportEvents === "Aussie Rules" && <AussieRules leagueName={leagueName} />}
      </div>
    </div>
  )
}

export default League
