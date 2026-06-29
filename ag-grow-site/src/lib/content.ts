/**
 * All site copy, sourced verbatim (and lightly tightened) from ag-grow.com.
 * Centralized so sections stay declarative.
 */

export const BUSINESS = {
  name: 'Ag Grow Plus Lawncare',
  tagline: 'Complete Lawn Care for Newton & Central Iowa',
  since: 1998,
  phone: '(641) 791-5296',
  phoneHref: 'tel:+16417915296',
  email: 'Office@Ag-Grow.com',
  emailHref: 'mailto:Office@Ag-Grow.com',
  mailing: 'PO Box 203, Newton, IA',
  hours: 'Mon–Fri: 6:00 AM – 4:00 PM · Sat–Sun: Closed',
  location: 'Newton, Iowa',
} as const

/** Short, source-backed proof points for the trust marquee. No invented claims. */
export const TRUST_POINTS = [
  'Serving Central Iowa since 1998',
  '18+ communities served',
  'Free quotes within 48 hours',
  'Salt included on every snow service',
  'Residential & commercial',
  'Locally owned & operated',
  'Priority scheduling for program customers',
] as const

/** "Our story" — drawn from the ag-grow.com About page. No invented claims. */
export const ABOUT = {
  heading: 'Locally owned and operated since 1998.',
  body: [
    'Ag Grow Plus Lawncare was established in 1998 as a lawn-care service for Jasper County homeowners. Over nearly three decades it has grown into a full-service company serving Central Iowa.',
    'What started as fertilization and weed control now includes mowing, leaf removal, and snow removal — built on the same founding principle: quality work and lasting customer relationships.',
  ],
  pillars: [
    { value: '1998', label: 'Founded in Jasper County' },
    { value: '25+ yrs', label: 'Caring for Central Iowa lawns' },
    { value: 'Local', label: 'Crews who know the region’s turf' },
    { value: 'Res. + Comm.', label: 'Residential & commercial clients' },
  ],
} as const

export const STATS = [
  { value: '1998', label: 'Serving Central Iowa since' },
  { value: '18+', label: 'Communities served' },
  { value: '6', label: 'Scheduled applications per season' },
  { value: '48hr', label: 'Typical quote turnaround' },
] as const

export type ProgramFeature = { text: string; included: boolean }

export const PROGRAMS = [
  {
    id: 'base',
    name: 'Base Program',
    subtitle: 'Essential Seasonal Care',
    description:
      'Fundamental lawn maintenance through proper fertilization, weed control, and crabgrass prevention.',
    badge: null as string | null,
    features: [
      { text: 'Spring, Summer & Fall fertilization', included: true },
      { text: '2-step pre-emergent crabgrass control', included: true },
      { text: 'Seasonal weed control', included: true },
      { text: 'Late-fall winterizer application', included: true },
      { text: 'Core aeration available as an add-on', included: true },
      { text: 'Preventative fungicide & grub control', included: false },
    ] as ProgramFeature[],
  },
  {
    id: 'turf',
    name: 'Base + Turf Protection',
    subtitle: 'Complete Lawn Defense',
    description:
      'Our most comprehensive program. Everything in Base, plus fungal-disease prevention, grub control, and structural soil improvements.',
    badge: 'Most Complete',
    features: [
      { text: 'Everything in the Base Program', included: true },
      { text: 'Preventative (fungal) disease control', included: true },
      { text: '2 fungicide applications per season', included: true },
      { text: 'Grub control', included: true },
      { text: 'Core aeration included', included: true },
      { text: '5% discount on all applications', included: true },
    ] as ProgramFeature[],
  },
] as const

export const TIMELINE = [
  {
    season: 'Spring',
    months: 'March – May',
    color: 'moss',
    steps: [
      'Fertilizer with pre-emergent crabgrass barrier',
      'Spring weed control with reinforced pre-emergent',
      'Optional core aeration to relieve compaction',
    ],
  },
  {
    season: 'Summer',
    months: 'June – August',
    color: 'wheat',
    steps: [
      'Spot weed control as needed',
      'Slow-release (or enhanced) fertilizer',
      'Preventative fungicide & grub control (Turf Protection)',
    ],
  },
  {
    season: 'Fall',
    months: 'September – November',
    color: 'sky',
    steps: [
      'Fall weed control',
      'Late-fall winterizer to feed the roots',
      'Core aeration — most effective in fall',
    ],
  },
] as const

export const WHY_TIMING = [
  {
    title: 'Timing matters more than products',
    body: 'The same product applied at the wrong moment does a fraction of the work. We schedule each step to the lawn’s biology, not the calendar alone.',
  },
  {
    title: 'Crabgrass prevention stops germination',
    body: 'A pre-emergent barrier inhibits cell division in germinating seeds — crabgrass dies before it ever breaks the surface. Miss the window and you’re fighting it all summer.',
  },
  {
    title: 'Disease control is preventative, not reactive',
    body: 'Fungicide protects healthy turf before disease takes hold. Once a lawn browns out, you’re repairing damage instead of preventing it.',
  },
  {
    title: 'Skipping one step weakens the next',
    body: 'Each application builds on the last. Missing one means later steps can’t deliver their full results — the program works as a sequence.',
  },
] as const

export type Service = {
  id: string
  name: string
  kicker: string
  blurb: string
  image: string
  points: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'lawn-care',
    name: 'Lawn Care Programs',
    kicker: 'Fertilization & weed control',
    blurb:
      'Six scheduled applications across spring, summer, and fall — fertilization, crabgrass prevention, weed and disease control, all timed to the turf.',
    image: '/images/lawn-care.jpg',
    points: ['Pre-emergent crabgrass control', 'Seasonal weed control', 'Winterizer & aeration'],
  },
  {
    id: 'mowing',
    name: 'Weekly Mowing',
    kicker: 'Mow, trim & edge',
    blurb:
      'Scheduled weekly or bi-weekly mowing for residential and commercial properties — grass cut to a healthy 3.5", with trimming, edging, and clippings managed on-site.',
    image: '/images/mowing.jpg',
    points: ['Weekly or bi-weekly', 'Trimming & edging included', 'Weather-based scheduling'],
  },
  {
    id: 'leaf-removal',
    name: 'Leaf Removal',
    kicker: 'Fall cleanup',
    blurb:
      'A complete one-time fall cleanup once the leaves are down — turf, beds, and hard surfaces cleared and hauled away so your winterizer can reach the soil.',
    image: '/images/leaf-removal.jpg',
    points: ['Turf, beds & pathways', 'Hauled away after cleanup', 'Late Oct – November'],
  },
  {
    id: 'snow-removal',
    name: 'Snow Removal',
    kicker: 'Residential & commercial',
    blurb:
      'Driveways, walkways, and parking lots cleared with salt included. Choose per-event or seasonal contract pricing, and set your own trigger depth.',
    image: '/images/snow-removal.jpg',
    points: ['Salt included', 'Per-event or seasonal', 'Custom trigger depth'],
  },
]

export const SNOW_TIERS = [
  { range: '1–3"', label: 'Light Snow', detail: 'Standard clearing with salt' },
  { range: '4–7"', label: 'Moderate Snow', detail: 'Complete clearing, extra passes' },
  { range: '8–11"', label: 'Heavy Snow', detail: 'Multiple passes & stacking' },
  { range: '12"+', label: 'Extreme Snow', detail: 'Extended, equipment-intensive service' },
] as const

export const SERVICE_AREA = [
  'Newton',
  'Altoona',
  'Baxter',
  'Colfax',
  'Grinnell',
  'Kellogg',
  'Killduff',
  'Lynnville',
  'Milo',
  'Mingo',
  'Mitchellville',
  'Monroe',
  'Otley',
  'Pella',
  'Prairie City',
  'Reasnor',
  'Sully',
  'Valeria',
] as const

export const SERVICE_TYPES = [
  'Lawn Care — Base Program',
  'Lawn Care — Turf Protection Program',
  'Mowing',
  'Leaf Removal',
  'Snow Removal',
  'Not Sure / Multiple Services',
] as const

/** FAQs — every answer is drawn from the ag-grow.com scrape. No invented claims. */
export const FAQS = [
  {
    q: 'How much do your lawn care programs cost?',
    a: 'Every quote is based on your lawn’s actual square footage, measured on-site — so you only pay for your property. Request a free quote and we’ll get back to you, typically within 48 hours.',
  },
  {
    q: 'What’s the difference between the Base and Turf Protection programs?',
    a: 'The Base Program covers seasonal fertilization, weed control, 2-step pre-emergent crabgrass control, and a late-fall winterizer. Base + Turf Protection adds preventative fungicide (2 applications), grub control, core aeration, and a 5% discount on all applications.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Newton and 18 surrounding Central Iowa communities, including Grinnell, Pella, Baxter, Colfax, Monroe, and Prairie City. Lawn-care programs are available across the whole area; mowing, leaf, and snow coverage vary by town, so call to confirm.',
  },
  {
    q: 'How often will you mow, and how short?',
    a: 'Weekly or bi-weekly, with the grass cut to a healthy 3.5". Trimming, edging, and clippings are managed on every visit, and scheduling is weather-based.',
  },
  {
    q: 'How does snow removal pricing work?',
    a: 'Per-event or seasonal contract, with salt included. Pricing is tiered by accumulation (1–3", 4–7", 8–11", 12"+), and you set your own trigger depth (1", 2–3", or 4"+). Current lawn-care program customers receive priority scheduling.',
  },
  {
    q: 'Why does treatment timing matter so much?',
    a: 'Each application builds on the last. Pre-emergent has to go down before crabgrass germinates, and fungicide is preventative rather than reactive — so skipping or mistiming a single step undercuts the results of the whole program.',
  },
] as const

export const PROCESS = [
  {
    step: '01',
    title: 'Request a quote',
    body: 'Tell us your address and what you need. It takes two minutes — no commitment.',
  },
  {
    step: '02',
    title: 'We assess your property',
    body: 'We measure actual lawn square footage and evaluate size, access, and conditions on-site.',
  },
  {
    step: '03',
    title: 'Get a custom quote',
    body: 'A clear, itemized quote based on your real property — typically within 48 hours.',
  },
  {
    step: '04',
    title: 'We manage the season',
    body: 'You approve once. We handle the timing, chemistry, and scheduling all season long.',
  },
] as const
