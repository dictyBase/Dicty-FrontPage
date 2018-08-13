import widgetTECHNIQUES from "images/frontWidgets/widgetTECHNIQUES.png"
import widgetSTATS from "images/frontWidgets/widgetSTATS.png"
import widgetGBROWSER from "images/frontWidgets/widgetGBROWSER.png"
import widgetLEARNDICTY from "images/frontWidgets/widgetLEARNDICTY.png"
import widgetJOBS from "images/frontWidgets/widgetJOBS.png"
import widgetDICTYEXPRESS from "images/frontWidgets/widgetDICTYEXPRESS.png"

export default [
  {
    link: "/research/techniques",
    image: widgetTECHNIQUES,
    alt: "techniques",
    isRouter: true,
  },
  {
    link: "/tools/jbrowse",
    image: widgetGBROWSER,
    alt: "genome browser",
    isRouter: true,
  },
  {
    link: "/explore/learn",
    image: widgetLEARNDICTY,
    alt: "learn dicty",
    isRouter: true,
  },
  {
    link: "https://testdb.dictybase.org/dictyaccess",
    image: widgetSTATS,
    alt: "dicty STATS (dictyAccess)",
    isRouter: false,
  },
  {
    link: "/community/jobs",
    image: widgetJOBS,
    alt: "jobs @ dicty",
    isRouter: true,
  },
  {
    link: "https://dictyexpress.research.bcm.edu/landing/",
    image: widgetDICTYEXPRESS,
    alt: "dicty express",
    isRouter: false,
  },
]