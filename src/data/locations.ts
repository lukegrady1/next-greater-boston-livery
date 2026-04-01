export type Location = {
  slug: string
  name: string
  county: string
  state: string
  region: string
  distanceToLogan: number
  driveTimeToLogan: string
  distanceToMHT?: number
  driveTimeToMHT?: string
  distanceToPVD?: number
  driveTimeToPVD?: string
  localLandmarks: string[]
  localContext: string
  nearbySlugsSameRegion: string[]
  recommendedVehicles: string[]
  popularUseCase: string
}

export const RESERVED_SLUGS = [
  'fleet', 'services', 'contact', 'team', 'reviews',
  'locations', 'robots.txt', 'sitemap.xml', '_not-found',
]

export type ServiceType = {
  slug: string
  label: string
  titleTemplate: (cityName: string) => string
  descriptionTemplate: (loc: Location) => string
  heroImage: string
  inclusions: string[]
  faqGenerator: (loc: Location) => { question: string; answer: string }[]
}

export const SERVICE_TYPES: ServiceType[] = [
  {
    slug: 'airport-transfer',
    label: 'Airport Transfer',
    titleTemplate: (city) => `${city} to Logan Airport Car Service | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Premium chauffeured transportation from ${loc.name} to Logan Airport. ${loc.driveTimeToLogan} drive, 24/7 availability, real-time flight tracking. No surge pricing. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80',
    inclusions: [
      'Real-time flight tracking — we know before you do if your gate changes',
      'Complimentary 60-minute wait from wheels-down at Logan',
      'Meet & greet inside the terminal with a name sign',
      'Luggage assistance',
      'Fixed rates — no surge pricing, ever',
      '24/7/365 availability including holidays',
    ],
    faqGenerator: (loc) => [
      {
        question: `How far is ${loc.name} from Logan Airport?`,
        answer: `${loc.name} is approximately ${loc.distanceToLogan} miles from Logan International Airport, with a typical drive time of ${loc.driveTimeToLogan} depending on traffic. GBL monitors conditions and adjusts pickup times accordingly.`,
      },
      {
        question: 'What happens if my flight is delayed?',
        answer: 'We track every flight in real time. Your chauffeur adjusts automatically — there is never a penalty charge for delays.',
      },
      {
        question: 'Is there a fee for early morning or late night pickups?',
        answer: 'No. Greater Boston Livery is available 24/7/365 at the same professional standard, including holidays, early mornings, and late-night arrivals.',
      },
      {
        question: `Do you serve other airports from ${loc.name}?`,
        answer: `Yes. In addition to Logan, we serve Manchester-Boston Regional (MHT)${loc.distanceToMHT ? ` (~${loc.driveTimeToMHT} from ${loc.name})` : ''} and T.F. Green (PVD)${loc.distanceToPVD ? ` (~${loc.driveTimeToPVD})` : ''}. Let us know your preference when booking.`,
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'limo-service',
    label: 'Limo Service',
    titleTemplate: (city) => `Limo Service ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Premium limousine service in ${loc.name}, ${loc.state}. Luxury sedans, SUVs, stretch limos, and party buses. Available 24/7 for any occasion. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0b76?w=1400&q=80',
    inclusions: [
      'Luxury sedans, SUVs, stretch limousines, and party buses',
      'Professional, suited chauffeurs',
      'Red carpet service available on request',
      'Complimentary bottled water and amenities',
      'Flexible hourly and point-to-point rates',
      '24/7/365 availability',
    ],
    faqGenerator: (loc) => [
      {
        question: `What types of limos are available in ${loc.name}?`,
        answer: `Greater Boston Livery offers luxury sedans (Chrysler 300, Volvo S90), executive SUVs (Jeep Wagoneer L, GMC Yukon), a 10-passenger stretch limousine, and party buses. All are available for pickup in ${loc.name} and throughout ${loc.county}.`,
      },
      {
        question: 'Can I book a limo for just a few hours?',
        answer: 'Yes. We offer both hourly charters and point-to-point service. Hourly bookings are ideal for nights out, wine tours, and events where your schedule may flex.',
      },
      {
        question: `How far in advance should I book a limo in ${loc.name}?`,
        answer: 'We recommend booking 48 hours in advance for standard trips. For proms, weddings, and large group events, book 4-6 weeks ahead to ensure your preferred vehicle is available.',
      },
      {
        question: 'Is alcohol allowed in the vehicles?',
        answer: 'Several vehicles in our fleet are alcohol-friendly, including the stretch limousine and party buses. Let us know your needs when booking and we\'ll recommend the right vehicle.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'corporate-car-service',
    label: 'Corporate Car Service',
    titleTemplate: (city) => `Corporate Car Service ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Executive chauffeured transportation in ${loc.name}, ${loc.state}. Corporate accounts, monthly invoicing, on-demand fleet. Serving ${loc.popularUseCase}. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    inclusions: [
      'Dedicated corporate accounts with monthly invoicing',
      'Priority scheduling and on-demand availability',
      'Professional, suited chauffeurs trained in executive protocol',
      'WiFi-equipped vehicles available',
      'Discreet, confidential service',
      'Multi-stop itineraries and roadshow coordination',
    ],
    faqGenerator: (loc) => [
      {
        question: `Does Greater Boston Livery offer corporate accounts in ${loc.name}?`,
        answer: `Yes. We provide dedicated corporate accounts for businesses in ${loc.name} and throughout ${loc.county}. Accounts include monthly invoicing, priority scheduling, and a dedicated fleet.`,
      },
      {
        question: 'Can I set up recurring rides for my team?',
        answer: 'Absolutely. Many of our corporate clients schedule recurring airport runs, office commutes, and client pickups. We handle all the logistics so your team can focus on work.',
      },
      {
        question: 'Do your vehicles have WiFi?',
        answer: 'Several vehicles in our fleet include complimentary WiFi, including the Mercedes-Benz Sprinter Van and the 36 Passenger Mini Coach. WiFi availability is listed on each vehicle on our Fleet page.',
      },
      {
        question: 'What is your cancellation policy for corporate rides?',
        answer: 'We understand business plans change. Corporate accounts enjoy flexible cancellation terms — contact your account representative for details.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'wedding-transportation',
    label: 'Wedding Transportation',
    titleTemplate: (city) => `Wedding Transportation ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Wedding car service in ${loc.name}, ${loc.state}. Luxury sedans, SUVs, stretch limos, and party buses for your entire wedding party. Impeccable coordination. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
    inclusions: [
      'Full wedding party coordination — multiple vehicles, multiple stops',
      'Luxury stretch limousine, party bus, and sedan options',
      'Impeccably dressed, professional chauffeurs',
      'Red carpet service and "Just Married" signage available',
      'Complimentary champagne toast setup',
      'Rehearsal dinner and morning-after transportation',
    ],
    faqGenerator: (loc) => [
      {
        question: `What wedding vehicles are available in ${loc.name}?`,
        answer: `For weddings in ${loc.name}, our most popular choices are the 10 Passenger White Stretch Limousine for the bridal party, the 26 Passenger Party Bus for larger groups, and luxury sedans for VIP guests and family. All vehicles are meticulously detailed for your big day.`,
      },
      {
        question: 'Can you coordinate transportation for the entire wedding party?',
        answer: 'Yes — that\'s our specialty. We coordinate multiple vehicles, multiple pickup locations, and precise timing for ceremonies, receptions, and after-parties. Your wedding coordinator will have a single point of contact at GBL.',
      },
      {
        question: 'How far in advance should I book wedding transportation?',
        answer: 'We recommend booking 4-6 weeks in advance to ensure your preferred vehicles are available. Peak wedding season (May-October) books quickly, so earlier is better.',
      },
      {
        question: 'Do you provide transportation for rehearsal dinners?',
        answer: 'Absolutely. Many couples book us for the rehearsal dinner, wedding day, and morning-after brunch transportation. We offer package rates for multi-event bookings.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661 to discuss your wedding transportation needs.',
      },
    ],
  },
]

export const VALID_SERVICE_SLUGS = SERVICE_TYPES.map((s) => s.slug)

export function getServiceType(slug: string): ServiceType | undefined {
  return SERVICE_TYPES.find((s) => s.slug === slug)
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

export const locations: Location[] = [
  {
    slug: 'newton',
    name: 'Newton',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 14,
    driveTimeToLogan: '~25 min',
    distanceToMHT: 58,
    driveTimeToMHT: '~55 min',
    localLandmarks: ['Newton Centre', 'Chestnut Hill', 'Boston College', 'Heartbreak Hill'],
    localContext: "Newton is one of Greater Boston's most affluent suburbs, home to corporate executives, medical professionals, and BC faculty who regularly travel through Logan. Its proximity to the Mass Pike makes it one of GBL's most-requested pickup locations.",
    nearbySlugsSameRegion: ['brookline', 'waltham', 'needham', 'wellesley'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'corporate executives and medical professionals commuting to Logan',
  },
  {
    slug: 'brookline',
    name: 'Brookline',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 7,
    driveTimeToLogan: '~15 min',
    localLandmarks: ['Coolidge Corner', 'Brookline Village', 'Longwood Medical Area', 'The Country Club'],
    localContext: "Brookline sits just minutes from Logan and borders Boston directly, making it one of the fastest airport runs in the GBL service area. The Longwood Medical Area draws frequent corporate and medical travelers who rely on punctual, professional transportation.",
    nearbySlugsSameRegion: ['newton', 'cambridge', 'quincy'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Volvo S90'],
    popularUseCase: 'medical professionals and Longwood campus travelers',
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 5,
    driveTimeToLogan: '~15 min',
    localLandmarks: ['Harvard University', 'MIT', 'Kendall Square', 'Harvard Square'],
    localContext: "Cambridge is home to Harvard, MIT, and one of the most active biotech corridors in the world. Kendall Square executives and university guests require discreet, premium transportation for both domestic and international flights out of Logan.",
    nearbySlugsSameRegion: ['brookline', 'newton', 'waltham'],
    recommendedVehicles: ['Volvo S90', 'Chrysler 300', 'Black SUV'],
    popularUseCase: 'biotech executives, university guests, and conference travelers',
  },
  {
    slug: 'waltham',
    name: 'Waltham',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 16,
    driveTimeToLogan: '~28 min',
    localLandmarks: ['Brandeis University', 'Waltham Watch Factory', 'Route 128 Tech Corridor', 'Gore Place'],
    localContext: "Waltham sits at the heart of the Route 128 technology corridor, hosting headquarters for dozens of major corporations. Corporate travel demand is high year-round, with executives frequently traveling through Logan for business across the country.",
    nearbySlugsSameRegion: ['newton', 'lexington', 'cambridge'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'Route 128 tech corridor corporate travel',
  },
  {
    slug: 'wellesley',
    name: 'Wellesley',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 18,
    driveTimeToLogan: '~30 min',
    localLandmarks: ['Wellesley College', 'Babson College', 'Lake Waban', 'Wellesley Hills'],
    localContext: "Wellesley is one of Greater Boston's premier residential communities, with a strong demand for luxury airport transfers, wedding transportation, and special occasion rides. Wellesley College and Babson College also generate consistent group transportation needs.",
    nearbySlugsSameRegion: ['needham', 'newton', 'waltham'],
    recommendedVehicles: ['Chrysler 300', 'Jeep Wagoneer L', '10 Passenger White Stretch Limousine'],
    popularUseCase: 'luxury airport transfers and wedding transportation',
  },
  {
    slug: 'needham',
    name: 'Needham',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 16,
    driveTimeToLogan: '~28 min',
    localLandmarks: ['Needham Town Center', 'Charles River', 'Cutler Park', 'Highland Avenue'],
    localContext: "Needham is a sought-after suburb combining quiet residential neighborhoods with easy highway access. Residents frequently commute through Logan for work and leisure, and GBL provides the seamless door-to-door service they expect.",
    nearbySlugsSameRegion: ['wellesley', 'newton', 'brookline'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Black Sedan'],
    popularUseCase: 'frequent business travelers and airport transfers',
  },
  {
    slug: 'lexington',
    name: 'Lexington',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 18,
    driveTimeToLogan: '~32 min',
    localLandmarks: ['Lexington Battle Green', 'Minute Man National Historical Park', 'Hartwell Avenue Tech Campus'],
    localContext: "Lexington blends its historic identity with a thriving tech presence along Hartwell Avenue. The town's affluent professional community generates steady demand for premium airport transfers and corporate ground transportation.",
    nearbySlugsSameRegion: ['waltham', 'cambridge', 'newton'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'Hartwell Avenue tech professionals and business travelers',
  },
  {
    slug: 'quincy',
    name: 'Quincy',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 8,
    driveTimeToLogan: '~18 min',
    localLandmarks: ['Adams National Historical Park', 'Quincy Center', 'Wollaston Beach', 'South Shore Plaza'],
    localContext: "As the birthplace of two U.S. presidents, Quincy combines rich heritage with a modern urban core just minutes from Logan. Its proximity to the airport and direct highway access make it one of GBL's fastest and most reliable pickup locations on the South Shore.",
    nearbySlugsSameRegion: ['brookline', 'needham', 'wellesley'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Black SUV'],
    popularUseCase: 'airport transfers for South Shore commuters and business travelers',
  },
  {
    slug: 'hingham',
    name: 'Hingham',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 22,
    driveTimeToLogan: '~35 min',
    distanceToPVD: 52,
    driveTimeToPVD: '~50 min',
    localLandmarks: ['Hingham Harbor', "World's End", 'South Shore Country Club', 'Derby Street Shops'],
    localContext: "Hingham is one of the South Shore's most prestigious communities, with waterfront estates, a vibrant harbor, and a high concentration of Boston commuters. GBL is the transportation partner of choice for Hingham's professional and social set.",
    nearbySlugsSameRegion: ['marshfield', 'plymouth', 'duxbury'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'executive airport transfers and special occasion transportation',
  },
  {
    slug: 'plymouth',
    name: 'Plymouth',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 42,
    driveTimeToLogan: '~45 min',
    distanceToPVD: 44,
    driveTimeToPVD: '~45 min',
    localLandmarks: ['Plymouth Rock', 'Plimoth Patuxent', 'Plymouth Harbor', 'Pilgrim Memorial State Park'],
    localContext: "Plymouth is a major destination for both tourists and year-round residents who travel regularly through Logan and T.F. Green. The town's mix of history, waterfront dining, and residential neighborhoods makes it a key anchor in GBL's South Shore coverage.",
    nearbySlugsSameRegion: ['duxbury', 'marshfield', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'airport transfers and wedding transportation',
  },
  {
    slug: 'duxbury',
    name: 'Duxbury',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 38,
    driveTimeToLogan: '~42 min',
    distanceToPVD: 48,
    driveTimeToPVD: '~47 min',
    localLandmarks: ['Duxbury Beach', 'Powder Point Bridge', 'Duxbury Bay', 'King Caesar House'],
    localContext: "Duxbury's pristine barrier beach and upscale residential character attract a discerning clientele who expect the same premium standard in ground transportation as in every other aspect of their lives. GBL's white-glove service is a natural fit.",
    nearbySlugsSameRegion: ['marshfield', 'plymouth', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'luxury airport transfers and wedding parties',
  },
  {
    slug: 'marshfield',
    name: 'Marshfield',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 35,
    driveTimeToLogan: '~40 min',
    localLandmarks: ['Marshfield Hills', 'Green Harbor', 'Marshfield Fairgrounds', 'Rexhame Beach'],
    localContext: "Marshfield offers a quieter South Shore lifestyle with easy access to Route 139 and Route 3. Residents traveling through Logan or Providence appreciate GBL's early morning and late-night availability — no rideshare surprises at 4 AM.",
    nearbySlugsSameRegion: ['duxbury', 'plymouth', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'GMC Yukon'],
    popularUseCase: 'early morning airport departures and holiday travel',
  },
  {
    slug: 'salem',
    name: 'Salem',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 20,
    driveTimeToLogan: '~32 min',
    localLandmarks: ['Salem Witch Museum', 'Peabody Essex Museum', 'Derby Wharf', 'Salem Common'],
    localContext: "Salem is one of New England's most iconic cities, attracting visitors year-round and home to a growing professional population. Its historic charm and proximity to Logan make GBL the obvious choice for travelers who want a polished, stress-free start or end to their journey.",
    nearbySlugsSameRegion: ['newburyport', 'gloucester'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Volvo S90'],
    popularUseCase: 'airport transfers and special occasion transportation',
  },
  {
    slug: 'newburyport',
    name: 'Newburyport',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 40,
    driveTimeToLogan: '~48 min',
    distanceToMHT: 50,
    driveTimeToMHT: '~52 min',
    localLandmarks: ['Newburyport Waterfront', 'Plum Island', 'Market Square', 'Parker River National Wildlife Refuge'],
    localContext: "Newburyport's restored Federal architecture and boutique waterfront have made it one of the North Shore's most desirable addresses. Its distance from Logan makes professional chauffeured service a smarter choice than driving — no parking fees, no stress navigating airport construction.",
    nearbySlugsSameRegion: ['salem', 'gloucester'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'business travelers and couples booking wedding transportation',
  },
  {
    slug: 'gloucester',
    name: 'Gloucester',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 36,
    driveTimeToLogan: '~45 min',
    localLandmarks: ['Gloucester Harbor', 'Good Harbor Beach', 'Rocky Neck Art Colony', "Fisherman's Memorial"],
    localContext: "America's oldest fishing port, Gloucester has evolved into a destination for artists, tourists, and professionals who call Cape Ann home. GBL handles the logistics while clients enjoy the scenic drive in — or sleep through it.",
    nearbySlugsSameRegion: ['salem', 'newburyport'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'Ford Expedition MAX XLT'],
    popularUseCase: 'airport transfers and corporate group travel',
  },
  {
    slug: 'worcester',
    name: 'Worcester',
    county: 'Worcester County',
    state: 'MA',
    region: 'Central Massachusetts',
    distanceToLogan: 48,
    driveTimeToLogan: '~52 min',
    distanceToMHT: 42,
    driveTimeToMHT: '~45 min',
    distanceToPVD: 46,
    driveTimeToPVD: '~48 min',
    localLandmarks: ['Holy Cross', 'WPI', 'Assumption University', 'Polar Park'],
    localContext: "Worcester is the second-largest city in New England, with major universities, a growing medical sector, and UMass Memorial Medical Center. Corporate and academic travelers departing from Worcester benefit from GBL's fixed-rate service with no surge pricing — especially critical for early-morning departures.",
    nearbySlugsSameRegion: ['shrewsbury'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'medical professionals, university staff, and corporate travelers',
  },
  {
    slug: 'shrewsbury',
    name: 'Shrewsbury',
    county: 'Worcester County',
    state: 'MA',
    region: 'Central Massachusetts',
    distanceToLogan: 44,
    driveTimeToLogan: '~48 min',
    distanceToMHT: 38,
    driveTimeToMHT: '~42 min',
    localLandmarks: ['Lake Quinsigamond', 'Shrewsbury Town Center', 'UMass Memorial Shrewsbury Campus'],
    localContext: "Shrewsbury's position on the eastern edge of Worcester County gives it easy Mass Pike access, making it one of the most efficient pickup locations for Logan runs from central Massachusetts. The town's professional community expects premium, punctual service.",
    nearbySlugsSameRegion: ['worcester'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Black SUV'],
    popularUseCase: 'business travelers and families flying out of Logan',
  },
  {
    slug: 'barnstable',
    name: 'Barnstable',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 72,
    driveTimeToLogan: '~80 min',
    distanceToPVD: 60,
    driveTimeToPVD: '~65 min',
    localLandmarks: ['Hyannis Port', 'Cape Cod Canal', 'Barnstable Harbor', 'John F. Kennedy Hyannis Museum'],
    localContext: "Barnstable is the largest town on Cape Cod and home to Hyannis — the Cape's de facto downtown. With no direct rail link to Logan, chauffeured transportation is the premium alternative to a two-hour bus ride, and GBL is the name Cape Cod travelers trust.",
    nearbySlugsSameRegion: ['sandwich', 'falmouth'],
    recommendedVehicles: ['GMC Yukon', 'Ford Expedition MAX XLT', 'Mercedes-Benz Sprinter Van'],
    popularUseCase: 'Cape Cod residents and visitors transferring to Logan or TF Green',
  },
  {
    slug: 'sandwich',
    name: 'Sandwich',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 60,
    driveTimeToLogan: '~65 min',
    distanceToPVD: 52,
    driveTimeToPVD: '~55 min',
    localLandmarks: ['Heritage Museums & Gardens', 'Shawme-Crowell State Forest', 'Sandwich Boardwalk', 'Cape Cod Canal'],
    localContext: "Sandwich is the oldest town on Cape Cod, situated at the canal end of the peninsula. Its gateway position makes it the first and last stop for many Cape Cod travelers, and GBL provides reliable connections to Logan and T.F. Green whatever the season.",
    nearbySlugsSameRegion: ['barnstable', 'falmouth'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'gateway airport transfers for upper Cape residents',
  },
  {
    slug: 'falmouth',
    name: 'Falmouth',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 74,
    driveTimeToLogan: '~82 min',
    distanceToPVD: 62,
    driveTimeToPVD: '~68 min',
    localLandmarks: ['Woods Hole', 'Falmouth Heights Beach', 'Shining Sea Bikeway', 'Island Queen Ferry Terminal'],
    localContext: "Falmouth and the Woods Hole scientific community generate consistent demand for professional transportation. Researchers and Marine Biological Laboratory staff frequently travel internationally, making a reliable Logan transfer essential.",
    nearbySlugsSameRegion: ['sandwich', 'barnstable'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'Ford Expedition MAX XLT'],
    popularUseCase: 'Woods Hole researchers, MBL staff, and seasonal residents',
  },
]
