//import * as logos from './logos'
import { logos } from './logos'

const WHITE = { h: 0, s: 0, l: 100 }
const BLACK = { h: 0, s: 0, l: 0 }

export const teamData = [
  {
    id: 1,
    name: 'New Jersey Devils',
    logo: logos.NJD,
    logoFaded: logos.NJD_Faded,
    colors: [
      { h: 353, s: 85, l: 44 }, //Red #c8102e
      BLACK,
      WHITE,
    ],
  },
  {
    id: 2,
    name: 'New York Islanders',
    logo: logos.NYI,
    logoFaded: logos.NYI_Faded,
    colors: [
      { h: 208, s: 100, l: 30 }, //Blue #00539b
      { h: 24, s: 90, l: 57 }, //Orange #f47d30
    ],
  },
  {
    id: 3,
    name: 'New York Rangers',
    logo: logos.NYR,
    logoFaded: logos.NYR_Faded,
    colors: [
      { h: 220, s: 100, l: 33 }, //Blue #0038a8
      { h: 353, s: 85, l: 44 }, //Red #ce1126
      WHITE,
    ],
  },
  {
    id: 4,
    name: 'Philadelphia Flyers',
    logo: logos.PHI,
    logoFaded: logos.PHI_Faded,
    colors: [
      { h: 17, s: 98, l: 49 }, //Orange #f74902
      BLACK,
      WHITE,
    ],
  },
  {
    id: 5,
    name: 'Pittsburgh Penguins',
    logo: logos.PIT,
    logoFaded: logos.PIT_Faded,
    colors: [
      BLACK,
      { h: 49, s: 38, l: 69 }, //Gold #cfc493
      { h: 42, s: 97, l: 53 }, //Yellow #fcb514
      WHITE,
    ],
  },
  {
    id: 6,
    name: 'Boston Bruins',
    logo: logos.BOS,
    logoFaded: logos.BOS_Faded,
    colors: [
      { h: 41, s: 100, l: 55 }, //Gold #ffb81c
      BLACK,
    ],
  },
  {
    id: 7,
    name: 'Buffalo Sabres',
    logo: logos.BUF,
    logoFaded: logos.BUF_Faded,
    colors: [
      { h: 213, s: 100, l: 16 }, //Blue #002654
      { h: 42, s: 97, l: 53 }, //Yellow #fcb514
    ],
  },
  {
    id: 8,
    name: 'Montreal Canadiens',
    logo: logos.MTL,
    logoFaded: logos.MTL_Faded,
    colors: [
      { h: 354, s: 71, l: 40 }, //Red #af1e2d
      { h: 234, s: 61, l: 25 }, //Blue #192168
    ],
  },
  {
    id: 9,
    name: 'Ottawa Senators',
    logo: logos.OTT,
    logoFaded: logos.OTT_Faded,
    colors: [
      { h: 353, s: 72, l: 45 }, //Red #c52032
      { h: 40, s: 63, l: 47 }, //Gold #c2912c
      BLACK,
    ],
  },
  {
    id: 10,
    name: 'Toronto Maple Leafs',
    logo: logos.TOR,
    logoFaded: logos.TOR_Faded,
    colors: [
      { h: 219, s: 100, l: 18 }, //Blue #00205b
      WHITE,
    ],
  },
  {
    id: 12,
    name: 'Carolina Hurricanes',
    logo: logos.CAR,
    logoFaded: logos.CAR_Faded,
    colors: [
      { h: 0, s: 100, l: 40 }, //Red #c00
      BLACK,
    ],
  },
  {
    id: 13,
    name: 'Florida Panthers',
    logo: logos.FLA,
    logoFaded: logos.FLA_Faded,
    colors: [
      { h: 215, s: 89, l: 14 }, //Blue #041e42
      { h: 350, s: 85, l: 42 }, //Red #c8102e
      { h: 38, s: 40, l: 54 }, //Tan #b9975b
    ],
  },
  {
    id: 14,
    name: 'Tampa Bay Lightning',
    logo: logos.TBL,
    logoFaded: logos.TBL_Faded,
    colors: [
      { h: 217, s: 100, l: 20 }, //Blue #002868
      WHITE,
    ],
  },
  {
    id: 15,
    name: 'Washington Capitals',
    logo: logos.WSH,
    logoFaded: logos.WSH_Faded,
    colors: [
      { h: 215, s: 89, l: 14 }, //Blue #041e42
      { h: 350, s: 85, l: 42 }, //Red #c8102e
      WHITE,
    ],
  },
  {
    id: 16,
    name: 'Chicago Blackhawks',
    logo: logos.CHI,
    logoFaded: logos.CHI_Faded,
    colors: [
      { h: 350, s: 91, l: 43 }, //Red #cf0a2c
      BLACK,
    ],
  },
  {
    id: 17,
    name: 'Detroit Red Wings',
    logo: logos.DET,
    logoFaded: logos.DET_Faded,
    colors: [
      { h: 353, s: 85, l: 44 }, //Red #ce1126
      WHITE,
    ],
  },
  {
    id: 18,
    name: 'Nashville Predators',
    logo: logos.NSH,
    logoFaded: logos.NSH_Faded,
    colors: [
      { h: 41, s: 100, l: 55 }, //Gold #ffb81c
      { h: 215, s: 89, l: 14 }, //Blue #041e42
    ],
  },
  {
    id: 19,
    name: 'St. Louis Blues',
    logo: logos.STL,
    logoFaded: logos.STL_Faded,
    colors: [
      { h: 219, s: 100, l: 26 }, //Blue #002f87
      { h: 42, s: 97, l: 53 }, //Yellow #fcb514
    ],
  },
  {
    id: 20,
    name: 'Calgary Flames',
    logo: logos.CGY,
    logoFaded: logos.CGY_Faded,
    colors: [
      { h: 350, s: 85, l: 42 }, //Red #c8102e
      { h: 42, s: 86, l: 61 }, //Gold #f1be48
    ],
  },
  {
    id: 21,
    name: 'Colorado Avalanche',
    logo: logos.COL,
    logoFaded: logos.COL_Faded,
    colors: [
      { h: 341, s: 49, l: 29 }, //Burgundy #6f263d
      { h: 206, s: 61, l: 35 }, //Blue #236192
    ],
  },
  {
    id: 22,
    name: 'Edmonton Oilers',
    logo: logos.EDM,
    logoFaded: logos.EDM_Faded,
    colors: [
      { h: 215, s: 89, l: 14 }, //Blue #041e42
      { h: 18, s: 100, l: 50 }, //Orange #ff4c00
    ],
  },
  {
    id: 23,
    name: 'Vancouver Canucks',
    logo: logos.VAN,
    colors: [
      { h: 219, s: 100, l: 18 }, //Blue #00205b
      { h: 148, s: 100, l: 26 }, //Green #00843d
    ],
  },
  {
    id: 24,
    name: 'Anaheim Ducks',
    logo: logos.ANA,
    logoFaded: logos.ANA_Faded,
    colors: [
      { h: 21, s: 90, l: 59 }, //Orange #f47a38
      { h: 38, s: 40, l: 54 }, //Gold #b9975b
      BLACK,
    ],
  },
  {
    id: 25,
    name: 'Dallas Stars',
    logo: logos.DAL,
    logoFaded: logos.DAL_Faded,
    colors: [
      { h: 161, s: 100, l: 20 }, //Green #006847
      BLACK,
    ],
  },
  {
    id: 26,
    name: 'Los Angeles Kings',
    logo: logos.LAK,
    logoFaded: logos.LAK_Faded,
    colors: [
      BLACK,
      { h: 196, s: 6, l: 66 }, //Silver #a2aaad
    ],
  },
  {
    id: 28,
    name: 'San Jose Sharks',
    logo: logos.SJS,
    logoFaded: logos.SJS_Faded,
    colors: [
      { h: 188, s: 100, l: 22 }, //Teal #006272
      { h: 29, s: 100, l: 46 }, //Orange #ea7200
      BLACK,
    ],
  },
  {
    id: 29,
    name: 'Columbus Blue Jackets',
    logo: logos.CBJ,
    logoFaded: logos.CBJ_Faded,
    colors: [
      { h: 213, s: 100, l: 16 }, //Blue #002654
      { h: 350, s: 85, l: 42 }, //Red #c8102e
    ],
  },
  {
    id: 30,
    name: 'Minnesota Wild',
    logo: logos.MIN,
    logoFaded: logos.MIN_Faded,
    colors: [
      { h: 157, s: 54, l: 18 }, //Green #154734
      { h: 41, s: 46, l: 75 }, //Wheat #ddcba4
      { h: 351, s: 74, l: 37 }, //Red #a6192e
    ],
  },
  {
    id: 52,
    name: 'Winnipeg Jets',
    logo: logos.WPG,
    logoFaded: logos.WPG_Faded,
    colors: [
      { h: 215, s: 89, l: 14 }, //Navy #041e42
      { h: 210, s: 100, l: 30 }, //Blue #004c97
      WHITE,
    ],
  },
  {
    id: 53,
    name: 'Arizona Coyotes',
    logo: logos.ARI,
    logoFaded: logos.ARI_Faded,
    colors: [
      { h: 352, s: 57, l: 35 }, //Red #8c2633
      { h: 44, s: 44, l: 80 }, //Sand #e2d6b5
      BLACK,
    ],
  },
  {
    id: 54,
    name: 'Vegas Golden Knights',
    logo: logos.VGK,
    logoFaded: logos.VGK_Faded,
    colors: [
      { h: 192, s: 13, l: 23 }, //Gray #333f42
      { h: 41, s: 38, l: 53 }, //Gold #b4975a
      BLACK,
    ],
  },
  {
    id: 55,
    name: 'Seattle Kraken',
    logo: logos.SEA,
    logoFaded: logos.SEA_Faded,
    colors: [
      { h: 207, s: 100, l: 8 }, //Dark Blue #001628
      { h: 200, s: 31, l: 30 }, //Blue #355464
      { h: 180, s: 46, l: 73 }, //Ice Blue #99d9d9
    ],
  },
  {
    id: 999,
    name: 'WildCard Separator',
    logo: '',
    colors: [BLACK],
  },
]
