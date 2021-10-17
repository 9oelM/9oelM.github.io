import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"
import { SF, Theme } from "../styles/theme"

const overridingFontFamily =  ["Noto Sans KR", "sans-serif"]

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a": {
      color: `#80DEEA`,
    },
    "a.anchor > svg": {
      visibility: `visible !important`,
      fill: `#80DEEA`
    },
    "p,small,h1,h2,h3,h4,li,ul,td,th": {
      ...SF.darkText
    },
    "td,th": {
      borderColor: Theme.Dark100
    },
    "blockquote": {
      borderLeftColor: Theme.Dark100,
    },
    "h1": {
      fontFamily: `${overridingFontFamily.join(`,`)} !important`
    }
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography({...Wordpress2016,
  googleFonts: [{
    name: "Noto Sans KR",
    styles: ["700"]
  }, {
    name: "Noto Sans KR",
    styles: ["400", "400i", "700", "700i", "900", "900i"]
  }],
  headerFontFamily: overridingFontFamily,
  bodyFontFamily: overridingFontFamily,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
