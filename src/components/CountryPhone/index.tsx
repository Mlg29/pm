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
}) => {
  return (
    <div>
      <SelectWithImage
        countryList={countryList}
        value={country}
        setValue={setCountry}
      />

      {country ? (
        <TextInputWithCode
          countryListCode={countryListCode}
          value={countryNumber}
          setValue={setCountryNumber}
        />
      ) : null}
    </div>
  );
};

export default CountryPhone;
