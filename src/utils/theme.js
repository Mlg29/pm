/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */


import { useWindowHeight } from "../components/useDimension"



const scrollY = useWindowHeight();
const customWidth = 375;
const customHeight = 812;

// export const wpNew = (value) => {
//     const dimension = (value / customWidth) * 100;
//     return wdp(`${dimension}%`);
//   };
//   export const hpNew = (value) => {
//     const dimension = (value / customHeight) * 100;
//     return hdp(`${dimension}%`);
//   };

export const COLORS = {
   primary: "#2D0D02",
   secondary: "#232323",
   lightSecondary: "#393938",
   black: "black",
   white: "white",
   gray: "#979797",
   semiGray: "#F3F3F3",
   blackGray: "#4B4B4B",
   red: "#D40C0C",
   green: "#4CB543",
   purple: "#A200BC",
   orange: "#FFA133",
   dimRed: "#D94355",
   cream: "#F9F2F1",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 48,
    h1: 40,
    h2: 30,
    h3: 28,
    h4: 23,
    h5: 18,
    h6: 15,
    h7: 12,
    body1: 40,
    body2: 33,
    body3: 28,
    body4: 23,
    body5: 18,
    body6: 15,
    body7: 12,


};
export const FONTS = {
    largeTitle: { lineHeight: 44, fontSize: SIZES.largeTitle, color: COLORS.black },
    h1: {  fontWeight: '600',lineHeight: 40, fontSize: SIZES.h1, color: COLORS.black },
    h2: { fontWeight: '600', lineHeight: 36, fontSize: SIZES.h2,  color: COLORS.black },
    h3: {  fontWeight: '600',lineHeight: 32, fontSize: SIZES.h3, color: COLORS.black },
    h4: { fontWeight: '600',lineHeight: 28, fontSize: SIZES.h4, color: COLORS.black },
    h5: { fontWeight: '600',lineHeight: 24, fontSize: SIZES.h5, color: COLORS.black },
    h6: { fontWeight: '600',lineHeight: 20, fontSize: SIZES.h6, color: COLORS.black },
    h7: { fontWeight: '600',lineHeight: 16, fontSize: SIZES.h7, color: COLORS.black },
    body1: { fontWeight: '400',lineHeight: 40, fontSize: SIZES.body1,  color: COLORS.black },
    body2: { fontWeight: '400',lineHeight: 36, fontSize: SIZES.body2, color: COLORS.black },
    body3: { fontWeight: '400',lineHeight: 32, fontSize: SIZES.body3, color: COLORS.black },
    body4: { fontWeight: '400',lineHeight: 28, fontSize: SIZES.body4, color: COLORS.black },
    body5: { fontWeight: '400',lineHeight: 24, fontSize: SIZES.body5, color: COLORS.black },
    body6: { fontWeight: '400',lineHeight: 20, fontSize: SIZES.body6, color: COLORS.black },
    body7: { fontWeight: '400',lineHeight: 16, fontSize: SIZES.body7, color: COLORS.black },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
