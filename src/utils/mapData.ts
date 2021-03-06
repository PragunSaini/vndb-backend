const mappers = {
  animeType: {
    tv: 'TV Series',
    ova: 'OVA',
    mov: 'Movie',
    oth: 'Other',
    web: 'Web',
    spe: 'TV Special',
    mv: 'Music Video',
  },
  tagCategory: {
    tech: 'Technical',
    ero: 'Content',
    cont: 'Sexual content',
  },
  vnRelation: {
    seq: 'Prequel',
    preq: 'Sequel',
    set: 'Same setting',
    alt: 'Alternative version',
    char: 'Shares characters',
    side: 'Parent story',
    par: 'Side story',
    ser: 'Same series',
    fan: 'Original game',
    orig: 'Fandisc',
  },
  vnLength: {
    0: null,
    1: 'Very short (< 2 hours)',
    2: 'Short (2 - 10 hours)',
    3: 'Medium (10 - 30 hours)',
    4: 'Long (30 - 50 hours)',
    5: 'Very long (> 50 hours)',
  },
  platforms: {
    win: 'Windows',
    ps3: 'Playstation 3',
    psv: 'Playstation Vita',
    xb3: 'Xbox 360',
    lin: 'Linux',
    mac: 'macOS',
    and: 'Android',
    ios: 'iOS',
    nds: 'Nintendo DS',
    ps2: 'Playstation 2',
    drc: 'Dreamcast',
    psp: 'Playstation Portable',
    gba: 'Gameboy Advance',
    wii: 'Nintendo Wii',
    n3d: 'Nintendo 3DS',
    oth: 'Other',
    dvd: 'DVD Player',
    bdp: 'Blu-ray Player',
    web: 'Browser',
    swi: 'Nintendo Switch',
    ps4: 'Playstation 4',
    wiu: 'Nintendo Wii U',
    nes: 'Famicon',
    sfc: 'Super Nintendo',
    sat: 'Sega Saturn',
    pce: 'PC Engine',
    x68: 'X68000',
    gbc: 'Game Boy Color',
    fmt: 'FM Towns',
    p88: 'PC-88',
    ps1: 'Playstation 1',
    p98: 'PC-98',
    xbo: 'Xbox One',
    pcf: 'PC-FX',
    xb1: 'Xbox',
    dos: 'DOS',
    msx: 'MSX',
  },
  releaseVoiced: {
    0: null,
    1: 'Not voiced',
    2: 'Only ero scenes voiced',
    3: 'Partially voiced',
    4: 'Fully voiced',
  },
  releaseAniStory: {
    0: null,
    1: 'No animations',
    2: 'Simple animations',
    3: 'Some fully animated scenes',
    4: 'All scenes fully animated',
  },
  isoLangs: {
    ab: {
      name: 'Abkhaz',
    },
    aa: {
      name: 'Afar',
    },
    af: {
      name: 'Afrikaans',
    },
    ak: {
      name: 'Akan',
    },
    sq: {
      name: 'Albanian',
    },
    am: {
      name: 'Amharic',
    },
    ar: {
      name: 'Arabic',
    },
    an: {
      name: 'Aragonese',
    },
    hy: {
      name: 'Armenian',
    },
    as: {
      name: 'Assamese',
    },
    av: {
      name: 'Avaric',
    },
    ae: {
      name: 'Avestan',
    },
    ay: {
      name: 'Aymara',
    },
    az: {
      name: 'Azerbaijani',
    },
    bm: {
      name: 'Bambara',
    },
    ba: {
      name: 'Bashkir',
    },
    eu: {
      name: 'Basque',
    },
    be: {
      name: 'Belarusian',
    },
    bn: {
      name: 'Bengali',
    },
    bh: {
      name: 'Bihari',
    },
    bi: {
      name: 'Bislama',
    },
    bs: {
      name: 'Bosnian',
    },
    br: {
      name: 'Breton',
    },
    bg: {
      name: 'Bulgarian',
    },
    my: {
      name: 'Burmese',
    },
    ca: {
      name: 'Catalan; Valencian',
    },
    ch: {
      name: 'Chamorro',
    },
    ce: {
      name: 'Chechen',
    },
    ny: {
      name: 'Chichewa; Chewa; Nyanja',
    },
    zh: {
      name: 'Chinese',
    },
    cv: {
      name: 'Chuvash',
    },
    kw: {
      name: 'Cornish',
    },
    co: {
      name: 'Corsican',
    },
    cr: {
      name: 'Cree',
    },
    hr: {
      name: 'Croatian',
    },
    cs: {
      name: 'Czech',
    },
    da: {
      name: 'Danish',
    },
    dv: {
      name: 'Divehi; Dhivehi; Maldivian;',
    },
    nl: {
      name: 'Dutch',
    },
    en: {
      name: 'English',
    },
    eo: {
      name: 'Esperanto',
    },
    et: {
      name: 'Estonian',
    },
    ee: {
      name: 'Ewe',
    },
    fo: {
      name: 'Faroese',
    },
    fj: {
      name: 'Fijian',
    },
    fi: {
      name: 'Finnish',
    },
    fr: {
      name: 'French',
    },
    ff: {
      name: 'Fula; Fulah; Pulaar; Pular',
    },
    gl: {
      name: 'Galician',
    },
    ka: {
      name: 'Georgian',
    },
    de: {
      name: 'German',
    },
    el: {
      name: 'Greek, Modern',
    },
    gn: {
      name: 'Guaraní',
    },
    gu: {
      name: 'Gujarati',
    },
    ht: {
      name: 'Haitian; Haitian Creole',
    },
    ha: {
      name: 'Hausa',
    },
    he: {
      name: 'Hebrew (modern)',
    },
    hz: {
      name: 'Herero',
    },
    hi: {
      name: 'Hindi',
    },
    ho: {
      name: 'Hiri Motu',
    },
    hu: {
      name: 'Hungarian',
    },
    ia: {
      name: 'Interlingua',
    },
    id: {
      name: 'Indonesian',
    },
    ie: {
      name: 'Interlingue',
    },
    ga: {
      name: 'Irish',
    },
    ig: {
      name: 'Igbo',
    },
    ik: {
      name: 'Inupiaq',
    },
    io: {
      name: 'Ido',
    },
    is: {
      name: 'Icelandic',
    },
    it: {
      name: 'Italian',
    },
    iu: {
      name: 'Inuktitut',
    },
    ja: {
      name: 'Japanese',
    },
    jv: {
      name: 'Javanese',
    },
    kl: {
      name: 'Kalaallisut, Greenlandic',
    },
    kn: {
      name: 'Kannada',
    },
    kr: {
      name: 'Kanuri',
    },
    ks: {
      name: 'Kashmiri',
    },
    kk: {
      name: 'Kazakh',
    },
    km: {
      name: 'Khmer',
    },
    ki: {
      name: 'Kikuyu, Gikuyu',
    },
    rw: {
      name: 'Kinyarwanda',
    },
    ky: {
      name: 'Kirghiz, Kyrgyz',
    },
    kv: {
      name: 'Komi',
    },
    kg: {
      name: 'Kongo',
    },
    ko: {
      name: 'Korean',
    },
    ku: {
      name: 'Kurdish',
    },
    kj: {
      name: 'Kwanyama, Kuanyama',
    },
    la: {
      name: 'Latin',
    },
    lb: {
      name: 'Luxembourgish, Letzeburgesch',
    },
    lg: {
      name: 'Luganda',
    },
    li: {
      name: 'Limburgish, Limburgan, Limburger',
    },
    ln: {
      name: 'Lingala',
    },
    lo: {
      name: 'Lao',
    },
    lt: {
      name: 'Lithuanian',
    },
    lu: {
      name: 'Luba-Katanga',
    },
    lv: {
      name: 'Latvian',
    },
    gv: {
      name: 'Manx',
    },
    mk: {
      name: 'Macedonian',
    },
    mg: {
      name: 'Malagasy',
    },
    ms: {
      name: 'Malay',
    },
    ml: {
      name: 'Malayalam',
    },
    mt: {
      name: 'Maltese',
    },
    mi: {
      name: 'Māori',
    },
    mr: {
      name: 'Marathi (Marāṭhī)',
    },
    mh: {
      name: 'Marshallese',
    },
    mn: {
      name: 'Mongolian',
    },
    na: {
      name: 'Nauru',
    },
    nv: {
      name: 'Navajo, Navaho',
    },
    nb: {
      name: 'Norwegian Bokmål',
    },
    nd: {
      name: 'North Ndebele',
    },
    ne: {
      name: 'Nepali',
    },
    ng: {
      name: 'Ndonga',
    },
    nn: {
      name: 'Norwegian Nynorsk',
    },
    no: {
      name: 'Norwegian',
    },
    ii: {
      name: 'Nuosu',
    },
    nr: {
      name: 'South Ndebele',
    },
    oc: {
      name: 'Occitan',
    },
    oj: {
      name: 'Ojibwe, Ojibwa',
    },
    cu: {
      name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    },
    om: {
      name: 'Oromo',
    },
    or: {
      name: 'Oriya',
    },
    os: {
      name: 'Ossetian, Ossetic',
    },
    pa: {
      name: 'Panjabi, Punjabi',
    },
    pi: {
      name: 'Pāli',
    },
    fa: {
      name: 'Persian',
    },
    pl: {
      name: 'Polish',
    },
    ps: {
      name: 'Pashto, Pushto',
    },
    pt: {
      name: 'Portuguese',
    },
    'pt-br': {
      name: 'Portuguese (Brazil)',
    },
    'pt-pt': {
      name: 'Portuguese (Portugal)',
    },
    qu: {
      name: 'Quechua',
    },
    rm: {
      name: 'Romansh',
    },
    rn: {
      name: 'Kirundi',
    },
    ro: {
      name: 'Romanian, Moldavian, Moldovan',
    },
    ru: {
      name: 'Russian',
    },
    sa: {
      name: 'Sanskrit (Saṁskṛta)',
    },
    sc: {
      name: 'Sardinian',
    },
    sd: {
      name: 'Sindhi',
    },
    se: {
      name: 'Northern Sami',
    },
    sm: {
      name: 'Samoan',
    },
    sg: {
      name: 'Sango',
    },
    sr: {
      name: 'Serbian',
    },
    gd: {
      name: 'Scottish Gaelic; Gaelic',
    },
    sn: {
      name: 'Shona',
    },
    si: {
      name: 'Sinhala, Sinhalese',
    },
    sk: {
      name: 'Slovak',
    },
    sl: {
      name: 'Slovene',
    },
    so: {
      name: 'Somali',
    },
    st: {
      name: 'Southern Sotho',
    },
    es: {
      name: 'Spanish; Castilian',
    },
    su: {
      name: 'Sundanese',
    },
    sw: {
      name: 'Swahili',
    },
    ss: {
      name: 'Swati',
    },
    sv: {
      name: 'Swedish',
    },
    ta: {
      name: 'Tamil',
    },
    te: {
      name: 'Telugu',
    },
    tg: {
      name: 'Tajik',
    },
    th: {
      name: 'Thai',
    },
    ti: {
      name: 'Tigrinya',
    },
    bo: {
      name: 'Tibetan Standard, Tibetan, Central',
    },
    tk: {
      name: 'Turkmen',
    },
    tl: {
      name: 'Tagalog',
    },
    tn: {
      name: 'Tswana',
    },
    to: {
      name: 'Tonga (Tonga Islands)',
    },
    tr: {
      name: 'Turkish',
    },
    ts: {
      name: 'Tsonga',
    },
    tt: {
      name: 'Tatar',
    },
    tw: {
      name: 'Twi',
    },
    ty: {
      name: 'Tahitian',
    },
    ug: {
      name: 'Uighur, Uyghur',
    },
    uk: {
      name: 'Ukrainian',
    },
    ur: {
      name: 'Urdu',
    },
    uz: {
      name: 'Uzbek',
    },
    ve: {
      name: 'Venda',
    },
    vi: {
      name: 'Vietnamese',
    },
    vo: {
      name: 'Volapük',
    },
    wa: {
      name: 'Walloon',
    },
    cy: {
      name: 'Welsh',
    },
    wo: {
      name: 'Wolof',
    },
    fy: {
      name: 'Western Frisian',
    },
    xh: {
      name: 'Xhosa',
    },
    yi: {
      name: 'Yiddish',
    },
    yo: {
      name: 'Yoruba',
    },
    za: {
      name: 'Zhuang, Chuang',
    },
  },
}

export { mappers }
