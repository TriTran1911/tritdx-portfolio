/* Nội dung tách khỏi giao diện: sửa CV sau này chỉ sửa file này.
   Mọi con số ở đây đo từ chính repo trên máy, không phải phỏng đoán. */

export interface Role {
  company: string
  title: string
  place: string
  from: string
  to: string
  note: string
}

export const ROLES: Role[] = [
  {
    company: 'Utop',
    title: 'Mobile Developer',
    place: 'Ho Chi Minh City',
    from: 'Sep 2023',
    to: 'Mar 2026',
    note: 'Shipped Flutter and React Native apps for metro payments, life insurance and retail loyalty. Owned end-to-end App Store and Play submissions, including diagnosing and clearing rejections.',
  },
  {
    company: 'Freelance',
    title: 'React Native Developer',
    place: 'Remote',
    from: 'Jul 2024',
    to: 'Aug 2025',
    note: 'Sole developer on GreenOil, a fuel distributor’s order and invoice system. Scoped, built and delivered it alongside full-time work.',
  },
]

export interface Project {
  name: string
  client: string
  kind: string
  stack: string[]
  summary: string
  did: string[]
  scale?: string
  /** Dự án gồm nhiều app rời nhau — FMV có app người dùng, app thu ngân,
   *  và game theo chiến dịch. Gộp thành một dòng là mô tả sai quy mô. */
  parts?: { name: string; note: string }[]
}

export const WORK: Project[] = [
  {
    name: 'FMV',
    client: 'Utop',
    kind: 'Loyalty platform — three apps',
    stack: ['React Native', 'React 19', 'TypeScript', 'Redux'],
    summary:
      'The largest thing I worked on: a rewards platform where members earn and spend points, and staff run the counter. Not one app but three, sharing one backend and one visual language.',
    parts: [
      {
        name: 'Member app',
        note: 'Points, history, challenges, vouchers, in-app commerce, store locator, QR scan, surveys, news — 1,155 source files',
      },
      {
        name: 'Cashier app',
        note: 'The staff side: orders, inventory, settings. Rebuilt in TypeScript on React Native 0.84',
      },
      {
        name: 'Mid-Autumn campaign',
        note: 'A seasonal lucky-box game shipped inside the app as a WebView — React 19, live prize and redemption APIs',
      },
    ],
    did: [
      'Feature work across the member app’s points and commerce surfaces',
      'Built the cashier app’s order and inventory screens',
      'Shipped the campaign game against a live prize backend, on a campaign deadline',
      'Kept one visual language across three codebases and two React versions',
    ],
    scale: '3 apps · 1,155 + 115 + 24 source files',
  },
  {
    name: 'CapitaOne',
    client: 'Utop / CapitaLand',
    kind: 'Flutter retail loyalty app',
    stack: ['Flutter', 'Dio', 'flavors'],
    summary:
      'Mall loyalty app with separate UAT and production flavours — the codebase I know most intimately, and the one I test my own tools against.',
    did: [
      'Feature work across a mature Flutter codebase',
      'Release flavours for UAT and production',
      'Debug tooling for QA to inspect live traffic',
    ],
    scale: '237 Dart files · 42,483 lines',
  },
  {
    name: 'HCM Metro HURC',
    client: 'Utop',
    kind: 'Flutter SDK inside a third-party app',
    stack: ['Flutter', 'REST', 'eKYC'],
    summary:
      'A payment and account module that drops into the metro operator’s own application, so riders top up and link accounts without leaving it.',
    did: [
      'Built the payment and account-linking screens',
      'Implemented eKYC identity capture',
      'Wired payment and account APIs',
      'Held UI parity with the existing web flow',
    ],
  },
  {
    name: 'Shinhan Life Vietnam',
    client: 'Utop',
    kind: 'Loyalty CRM, mobile + web',
    stack: ['Flutter', '.NET MVC'],
    summary:
      'A points system embedded into an insurer’s main app: customers earn and redeem without a second login.',
    did: [
      'Synchronised customer data across mobile and web',
      'Kept one visual language across two very different runtimes',
      'Shipped the web-side SDK alongside the mobile build',
    ],
  },
  {
    name: 'BUV',
    client: 'Utop / British University Vietnam',
    kind: 'React Native student app',
    stack: ['React Native', 'Redux', 'i18n'],
    summary:
      'Campus life in one app: attendance and academic progression, transcripts, a skills-point scheme, clubs and societies, events, library and schedules.',
    did: [
      'Attendance and academic-progression screens',
      'Skills-point claims, history and transcript views',
      'Clubs, societies and event attendance flows',
      'Bilingual interface throughout',
    ],
    scale: '271 source files',
  },
  {
    name: 'MaisonOnline',
    client: 'Utop',
    kind: 'React Native commerce app, maintenance and upgrade',
    stack: ['React Native', 'TypeScript'],
    summary:
      'A live shopping app I took over: browsing, ordering, payment. The interesting work was not features — it was moving a large codebase forward without breaking it.',
    did: [
      'Upgraded the React Native core across major versions',
      'Fixed and reshaped UI against real customer feedback',
      'Kept the release train running through the upgrade',
    ],
    scale: '1,038 source files',
  },
  {
    name: 'GreenOil',
    client: 'Freelance',
    kind: 'React Native — fuel order & invoice management',
    stack: ['React Native'],
    summary:
      'My one freelance build: a system for a fuel distributor to raise orders, generate invoices against them, and keep the invoice records straight afterwards.',
    did: [
      'Order creation and invoice generation, end to end',
      'Wired the order-processing and invoice APIs',
      'Viewing, filtering and exporting invoice data',
    ],
  },
  {
    name: 'Honda Vietnam',
    client: 'Utop',
    kind: 'WebView SDK, React',
    stack: ['React', 'Framer Motion'],
    summary:
      'A loyalty surface that renders inside a native shell — lucky draw, gift history, consent. Animation carries the reward moment here, so it had to feel right, not just work.',
    did: [
      'Motion design for the draw and reward states',
      'Consent and gift-history flows',
      'A bridge layer between web and native shell',
    ],
  },
]

export const BUILDS: Project[] = [
  {
    name: 'api·log',
    client: 'Built and run by me',
    kind: 'Reverse proxy that records API traffic, plus a mock server',
    stack: ['Bun', 'Hono', 'SQLite', 'React 19', 'Tailwind v4'],
    summary:
      'QA points the app at a proxy instead of the backend. Everything is recorded — request, response, timing — and nothing on the backend changes. Then it goes further: it learns the shape of each endpoint’s response and tells you when the backend quietly changed the contract.',
    did: [
      'Session waterfalls, HAR export, request diffing',
      'Contract-drift detection tuned so it does not cry wolf',
      'Hand-written ZIP, binary-plist and AndroidManifest parsers to read .ipa/.apk without dependencies — cross-checked against Apple and Google’s own tooling',
      'Runs as a service behind Cloudflare Tunnel on my own machine',
    ],
    scale: '61-check end-to-end smoke test',
  },
  {
    name: 'DMS',
    client: 'Built by me',
    kind: 'Distribution management back office',
    stack: ['NestJS', 'PostgreSQL 18', 'React', 'Ant Design'],
    summary:
      'Inventory, orders, invoices and partner ledgers for a B2B distributor. Built mostly to answer one question properly: how do you model stock and debt so the numbers cannot silently go wrong?',
    did: [
      'Stock is the result of an append-only ledger, never a stored number — triggers block UPDATE and DELETE',
      'Money posts through database functions in one transaction, never through a status flag',
      'Prices, unit factors and tax rates are frozen onto document lines, so editing a price list cannot rewrite history',
      'Idempotency keys on client submissions and on ledger writes',
    ],
    scale: '53 tables · 17,600 lines · smoke tests 6/6 and 5/5 passing',
  },
]

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Mobile', items: ['Flutter', 'Dart', 'React Native', 'Native release pipelines'] },
  { group: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'GSAP', 'Framer Motion'] },
  { group: 'Backend & data', items: ['NestJS', 'Bun', 'Hono', 'PostgreSQL', 'SQLite', 'REST design'] },
  { group: 'Shipping', items: ['App Store & Play submission', 'Rejection triage', 'Cloudflare Tunnel', 'Git'] },
]

export const EDUCATION = [
  {
    school: 'VNUHCM — University of Science',
    detail: 'Bilingual BSc in Information Technology, with Université Claude Bernard Lyon 1',
    place: 'Ho Chi Minh City · Villeurbanne',
    years: '2020 – 2023',
  },
  {
    school: 'Kew High School',
    detail: 'International student, computer science',
    place: 'Melbourne, Australia',
    years: '2017 – 2019',
  },
]

export const CONTACT = {
  email: 'trandaoxuantricr123@gmail.com',
  phone: '+84 839 696 967',
  city: 'Ho Chi Minh City, Vietnam',
  languages: 'Vietnamese · English · French (beginner)',
}
