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
    to: 'Present',
    note: 'Ship Flutter and React Native apps for metro payments, life insurance and retail loyalty. Own end-to-end App Store and Play submissions, including diagnosing and clearing rejections.',
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
  /** Nền tảng và phiên bản chạy thật, đọc từ package.json / pubspec.yaml của
   *  chính repo. Đây là dòng nhà tuyển dụng quét đầu tiên khi lọc theo nền
   *  tảng, nên để riêng chứ không trộn vào stack. */
  runtime?: string
  /** Chỉ điền khi đã mở đúng trang store và thấy đúng tên app. App nội bộ
   *  (app thu ngân) và SDK nhúng vào app của bên khác thì không có link — để
   *  trống chứ không trỏ sang app gần giống. */
  links?: { ios?: string; android?: string }
  /** Đặt true khi phần mình làm là module chạy BÊN TRONG app của bên khác.
   *  Link khi đó trỏ tới app của khách hàng, không phải app của mình — nhãn
   *  phải nói đúng điều đó, nếu không là nhận vơ cả sản phẩm. */
  embedded?: boolean
  /** Mã nguồn công khai. Chỉ điền khi repo thật sự public — link tới repo
   *  private thì người xem bấm vào chỉ thấy trang 404.
   *  api·log để private theo yêu cầu: công cụ nội bộ, source lưu trên GitHub
   *  nhưng không mở cho người ngoài. */
  repo?: string
  stack: string[]
  summary: string
  did: string[]
  scale?: string
  /** Dự án gồm nhiều app rời nhau — FamilyMart Vietnam có app người dùng, app thu ngân,
   *  và game theo chiến dịch. Gộp thành một dòng là mô tả sai quy mô. */
  parts?: { name: string; note: string }[]
}

export const WORK: Project[] = [
  {
    name: 'FamilyMart Vietnam',
    links: {
      ios: 'https://apps.apple.com/vn/app/familymart-vietnam/id1435763343',
      android: 'https://play.google.com/store/apps/details?id=jp.co.toshiba.famipoint.membership.mobile.android',
    },
    client: 'Utop',
    kind: 'Loyalty platform — three apps',
    runtime: 'React Native 0.79 + 0.84 · React 19',
    stack: ['React Native', 'React 19', 'TypeScript', 'Redux Saga', 'TanStack Query', 'Firebase'],
    summary:
      'The largest thing I worked on: a rewards platform where members earn and spend points, and staff run the counter. Not one app but three, sharing one backend and one visual language.',
    parts: [
      {
        name: 'Member app · React Native 0.79.3',
        note: 'Points, vouchers, in-app commerce, store locator, QR scan, surveys. Redux Saga, Firebase analytics/crashlytics/performance, biometric unlock through Keychain, maps, i18n — 1,066 files, 106,087 lines',
      },
      {
        name: 'Cashier app · React Native 0.84.1, New Architecture',
        note: 'Rebuilt from scratch: 94 of 94 files TypeScript, newArchEnabled=true, TanStack Query instead of Redux. The one codebase here running Fabric and TurboModules — 13,879 lines',
      },
      {
        name: 'Mid-Autumn campaign · React 19.2',
        note: 'A seasonal lucky-box game shipped inside the app as a WebView, fully TypeScript, against live prize and redemption APIs — 22 files, 1,882 lines',
      },
    ],
    did: [
      'Feature work across the member app’s points and commerce surfaces',
      'Rebuilt the cashier app on React Native’s New Architecture, in TypeScript throughout',
      'Shipped the campaign game against a live prize backend, on a campaign deadline',
      'Kept one visual language across three codebases and two React versions',
    ],
    scale: '3 apps · 1,182 files · 121,848 lines',
  },
  {
    name: 'CapitaOne',
    links: {
      ios: 'https://apps.apple.com/vn/app/capitaone/id6765926050',
      android: 'https://play.google.com/store/apps/details?id=com.cldmobileapp',
    },
    client: 'Utop / CapitaLand',
    kind: 'Flutter retail loyalty app',
    runtime: 'Flutter · Dart SDK 3.11',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Dio', 'Firebase', 'flavors'],
    summary:
      'Mall loyalty app with separate UAT and production flavours — the codebase I know most intimately, and the one I test my own tools against.',
    did: [
      'Riverpod for state, go_router for navigation, Dio for the API layer',
      'Biometric unlock via local_auth, tokens held in flutter_secure_storage',
      'Signing and verification with PointyCastle and ASN.1',
      'QR capture, OneSignal push, in-app PDF viewing',
      'Release flavours for UAT and production, plus debug tooling for QA',
    ],
    scale: '237 Dart files · 42,483 lines',
  },
  {
    name: 'HCM Metro HURC',
    embedded: true,
    links: {
      ios: 'https://apps.apple.com/vn/app/hcmc-metro-hurc/id6449395180',
      android: 'https://play.google.com/store/apps/details?id=com.fts.metro',
    },
    client: 'Utop',
    kind: 'Flutter SDK inside a third-party app',
    runtime: 'Flutter',
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
    embedded: true,
    links: {
      ios: 'https://apps.apple.com/vn/app/my-shinhanlife/id6743426483',
      android: 'https://play.google.com/store/apps/details?id=vn.com.shlv.cpo',
    },
    client: 'Utop',
    kind: 'Loyalty CRM, mobile + web',
    runtime: 'Flutter · .NET MVC',
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
    name: 'British University Vietnam',
    links: {
      ios: 'https://apps.apple.com/vn/app/buv-campus-central/id6748009347',
      android: 'https://play.google.com/store/apps/details?id=com.akc.buv.prod',
    },
    client: 'Utop / British University Vietnam',
    kind: 'React Native student app',
    runtime: 'React Native 0.79 · React 19',
    stack: ['React Native', 'Redux Toolkit', 'i18next', 'Vision Camera', 'Firebase'],
    summary:
      'Campus life in one app: attendance and academic progression, transcripts, a skills-point scheme, clubs and societies, events, library and schedules.',
    did: [
      'Attendance and academic-progression screens',
      'Skills-point claims, history and transcript views',
      'Sign in with Apple, plus Firebase analytics and crashlytics',
      'Bilingual interface throughout, on i18next',
    ],
    scale: '267 files · 20,891 lines',
  },
  {
    name: 'MaisonOnline',
    links: {
      ios: 'https://apps.apple.com/vn/app/maison-online/id1565132130',
      android: 'https://play.google.com/store/apps/details?id=com.maisonjsc.online',
    },
    client: 'Utop',
    kind: 'React Native commerce app, maintenance and upgrade',
    runtime: 'React Native 0.79 · React 19',
    stack: ['React Native', 'Redux Saga', 'Vision Camera', 'Firebase'],
    summary:
      'A live shopping app I took over: browsing, ordering, payment. The interesting work was not features — it was moving a large codebase forward without breaking it.',
    did: [
      'Upgraded the React Native core across major versions, up to 0.79',
      'Kept biometrics, camera and deep links working through the upgrade',
      'Fixed and reshaped UI against real customer feedback',
      'Kept the release train running the whole way',
    ],
    scale: '1,030 files · 100,404 lines',
  },
  {
    name: 'GreenOil',
    client: 'Freelance',
    kind: 'React Native — fuel order & invoice management',
    runtime: 'React Native',
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
    embedded: true,
    links: {
      ios: 'https://apps.apple.com/vn/app/my-honda/id1482745552',
      android: 'https://play.google.com/store/apps/details?id=vn.co.honda.hondacrm',
    },
    client: 'Utop',
    kind: 'WebView SDK, React',
    runtime: 'React 18',
    stack: ['React', 'Framer Motion'],
    summary:
      'A loyalty surface that renders inside a native shell — lucky draw, gift history, consent. Animation carries the reward moment here, so it had to feel right, not just work.',
    did: [
      'Motion design for the draw and reward states',
      'Consent and gift-history flows',
      'A bridge layer between web and native shell',
    ],
    scale: '105 files · 16,898 lines',
  },
]

export const BUILDS: Project[] = [
  {
    name: 'api·log',
    client: 'Mine — built and running',
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
    client: 'Mine',
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
  github: 'github.com/TriTran1911',
  linkedin: 'linkedin.com/in/tri-tran-0833bb267',
  cv: '/tri-tran-cv.pdf',
  email: 'trandaoxuantricr123@gmail.com',
  phone: '+84 839 696 967',
  city: 'Ho Chi Minh City, Vietnam',
  languages: 'Vietnamese · English · French (beginner)',
}

/* ─── Cột trái và dải số liệu ────────────────────────────────────────────
   Nội dung cho cột trái. Số liệu từng có một dải riêng ở đầu trang, đã bỏ
   theo yêu cầu — các con số vẫn nằm trong từng dự án ở WORK/BUILDS. */

export const ABOUT =
  'Flutter and React Native developer, at Utop since 2023. Metro fares, insurance ' +
  'points, mall loyalty — the apps people actually pay through. I own App Store and ' +
  'Play releases end to end, rejections included. Outside client work I build the ' +
  'tools I need myself.'

export const FOCUS: string[] = [
  'Production mobile apps — Flutter, React Native',
  'App Store & Play release, rejection triage',
  'Frontend systems in React 19 and TypeScript',
  'Data modelling when the tool calls for it',
]


/* Các ngành đã làm, rút từ chính WORK phía trên — không phải thông tin mới:
   FamilyMart Vietnam + CapitaOne (bán lẻ), HCM Metro HURC (giao thông công
   cộng), Shinhan Life Vietnam (bảo hiểm nhân thọ), British University Vietnam
   (giáo dục), MaisonOnline (thương mại điện tử), GreenOil (phân phối nhiên
   liệu), Honda Vietnam (loyalty hãng xe).

   Để ở đầu trang vì đây là thứ nhà tuyển dụng quét trước: đã đụng vào những
   ngành nào. Danh sách tên dự án thì đã có ở mục Production work, lặp lại là
   thừa — nên ở đây nói theo ngành. */
export const DOMAINS: string[] = [
  'Retail loyalty',
  'Transit payments',
  'Life insurance',
  'Higher education',
  'E-commerce',
  'Fuel distribution',
]
