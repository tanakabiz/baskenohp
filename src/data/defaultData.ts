export const defaultMembers = [
  {
    id: 1,
    name: 'Player #4',
    alias: 'ゴール下イップス',
    position: 'PF / C',
    specialMove: 'アブラマシマシカラメ',
    quote: '動いた分以上のカロリーを摂取してます',
    instagram: '',
    image: '/player-1.png',
    stats: [
      { subject: '得点力', value: 'B' },
      { subject: '3P', value: 'C' },
      { subject: 'スピード', value: 'E' },
      { subject: 'フィジカル', value: 'B' },
      { subject: 'スタミナ', value: 'G' },
      { subject: 'IQ', value: 'A' },
      { subject: 'ディフェンス', value: 'F' },
    ]
  },
  {
    id: 2,
    name: 'Player #5',
    alias: '北のカリー',
    position: 'PG',
    specialMove: 'Coming soon...',
    quote: 'Coming soon...',
    instagram: '',
    image: '/player-2.png',
    stats: [
      { subject: '得点力', value: 'B' },
      { subject: '3P', value: 'S' },
      { subject: 'スピード', value: 'S' },
      { subject: 'フィジカル', value: 'D' },
      { subject: 'スタミナ', value: 'A' },
      { subject: 'IQ', value: 'B' },
      { subject: 'ディフェンス', value: 'A' },
    ]
  },
  {
    id: 3,
    name: 'Player #8',
    alias: 'シューティングスター',
    position: 'GK',
    specialMove: 'メテオジャム',
    quote: '俺に任せろ',
    instagram: '',
    image: '/player-3.png',
    stats: [
      { subject: '得点力', value: 'S' },
      { subject: '3P', value: 'S' },
      { subject: 'スピード', value: 'S' },
      { subject: 'フィジカル', value: 'S' },
      { subject: 'スタミナ', value: 'S' },
      { subject: 'IQ', value: 'G' },
      { subject: 'ディフェンス', value: 'S' },
    ]
  },
  {
    id: 4,
    name: 'Player #13',
    alias: '細身の弾丸',
    position: 'SG',
    specialMove: 'Coming soon...',
    quote: 'Coming soon...',
    instagram: '',
    image: '/player-4.png',
    stats: [
      { subject: '得点力', value: 'B' },
      { subject: '3P', value: 'S' },
      { subject: 'スピード', value: 'F' },
      { subject: 'フィジカル', value: 'G' },
      { subject: 'スタミナ', value: 'C' },
      { subject: 'IQ', value: 'A' },
      { subject: 'ディフェンス', value: 'C' },
    ]
  }
];

export const defaultSiteData = {
  hero: {
    catchphrase1: "楽しさも、",
    catchphrase2: "本気も。",
    subtext: "札幌で、一番 “青春してる” 社会人バスケ。",
    description: "戦いたくなるチームへ。\n仲間と共に熱くなる、大人のためのバスケコミュニティ。",
    image: "/top-image.png"
  },
  teamIntro: {
    title: "TEAM INFO",
    description1: "「経験者中心だけどエンジョイ」\n「仲の良さ」「笑いあり」「本気あり」",
    description2: "シャムゴットは、札幌市を拠点とする大人の青春バスケットボールコミュニティです。\n勝敗だけでなく、仲間と過ごす熱い時間を何より大切にしています。",
    image: "/top-image.png"
  },
  members: defaultMembers,
  schedules: [
    {
      id: 1,
      date: '2024-06-01T19:00',
      location: '札幌市西区体育館',
      isRecruiting: true,
      description: '通常練習'
    },
    {
      id: 2,
      date: '2024-06-08T18:00',
      location: '札幌市北区体育館',
      isRecruiting: false,
      description: '練習試合'
    }
  ],
  achievements: [
    { id: 1, year: '2023', event: '札幌市民大会', result: '3回戦進出' },
    { id: 2, year: '2022', event: '札幌市民大会', result: '2回戦進出' },
    { id: 3, year: '2021', event: 'チーム結成', result: '活動開始' },
  ]
};
