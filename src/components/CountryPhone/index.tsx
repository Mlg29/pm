import React, { useState, useEffect } from "react";

import SelectWithImage from "./SelectWithImage";
import TextInputWithCode from "./TextInputWithCode";

const CountryPhone = ({
  countryList,
  country,
  setCountry,
  countryListCode,
  countryNumber,
  setCountryNumber,
  isCountryRequired,
  isPhoneRequired,
  isCountryPresent
}) => {
  return (
    <div>
      <SelectWithImage
        countryList={countryList}
        value={country}
        setValue={setCountry}
        isCountryRequired
        disabled={isCountryPresent}
      />

      {country ? (
        <TextInputWithCode
          countryListCode={countryListCode}
          value={countryNumber}
          setValue={setCountryNumber}
          isPhoneRequired
        />
      ) : null}
    </div>
  );
};

export default CountryPhone;
