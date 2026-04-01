export const airports = {
  logan: {
    code: 'BOS',
    name: 'Logan International Airport',
    fullName: 'Boston Logan International Airport',
    city: 'East Boston, MA',
    terminalNote: 'Chauffeur meets you inside the terminal with a name sign.',
    waitPolicy: 'Complimentary 60-minute wait from wheels-down.',
    parkingAvoidance: 'Avoid the $40–$60/day Logan garage fees — GBL drops you at the door.',
  },
  manchester: {
    code: 'MHT',
    name: 'Manchester-Boston Regional Airport',
    fullName: 'Manchester-Boston Regional Airport',
    city: 'Manchester, NH',
    terminalNote: 'MHT is significantly less congested than Logan — faster curbside pickup.',
    waitPolicy: 'Complimentary 45-minute wait from wheels-down.',
    parkingAvoidance: 'Manchester offers lower fares on select routes — GBL gets you there comfortably.',
  },
  providence: {
    code: 'PVD',
    name: 'T.F. Green Airport',
    fullName: 'Rhode Island T.F. Green International Airport',
    city: 'Warwick, RI',
    terminalNote: 'T.F. Green is a streamlined, no-hassle alternative to Logan for South Shore and Cape Cod travelers.',
    waitPolicy: 'Complimentary 45-minute wait from wheels-down.',
    parkingAvoidance: 'Avoid Providence\'s limited and expensive airport parking — arrive relaxed.',
  },
} as const

export type AirportKey = keyof typeof airports
