import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const root = path.resolve(dirname, '..')

async function uploadLocalImage(payload: Awaited<ReturnType<typeof getPayload>>, filePath: string, alt: string) {
  const data = fs.readFileSync(filePath)
  const name = path.basename(filePath)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/png',
      name,
      size: data.length,
    },
    context: { disableRevalidate: true },
  })
  return media
}

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.SEED_ADMIN_EMAIL || 'admin@glministries.org',
        password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMeNow!',
        name: 'GLIC Admin',
        role: 'admin',
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('Created admin user')
  }

  const heroPath = path.join(root, 'public/images/hero.png')
  const logoPath = path.join(root, 'public/images/logo.png')
  const hero = await uploadLocalImage(payload, heroPath, 'Gospel Light International Church worship service')
  const logo = await uploadLocalImage(payload, logoPath, 'Gospel Light International Church logo')

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      churchName: 'Gospel Light International Church',
      tagline: 'A Christ-centered church shining the light of Christ throughout Ethiopia and the nations.',
      logo: logo.id,
      contact: {
        address: 'P.O. Box 12992\nAddis Ababa, Ethiopia\nAware Branch — Aware, Addis Ababa, Ethiopia',
        phoneHQ: '+251 911 716 848',
        phone: '+251-113 71 88 47',
        fax: '+251-113 72 65 13',
        email: 'addis@glministries.org',
      },
      social: {
        youtube: '',
        facebook: '',
        instagram: '',
      },
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      hero: {
        headline: 'Gospel Light International Church',
        subheadline:
          'A Christ-centered church shining the light of Christ throughout Ethiopia and the nations.',
        locationLine: 'Aware • Addis Ababa • Ethiopia',
        primaryCtaLabel: 'Join Us',
        primaryCtaHref: '/en/contact',
        secondaryCtaLabel: 'Watch Sermons',
        secondaryCtaHref: '/en/media/sermons',
        image: hero.id,
      },
      worship: {
        heading: 'Worship with us',
        serviceTimes: '',
        location: 'Aware, Addis Ababa',
        directionsLabel: 'Get directions',
      },
      whoWeAre: {
        eyebrow: 'Who we are',
        heading: 'A church built on the Word of God',
        body: 'Gospel Light International Church – Aware Branch is the founding church and international headquarters of Gospel Light International Church. Founded upon the unchanging Word of God, our church exists to glorify Jesus Christ by proclaiming the Gospel, making disciples, equipping leaders, and serving our communities with excellence, integrity, and compassion.',
        ctaLabel: 'Discover our story',
        ctaHref: '/en/about',
        image: hero.id,
      },
      vision: {
        heading: 'Our vision',
        statement:
          'To glorify God by building a Christ-centered church that transforms lives, equips servant leaders, plants healthy churches, and shines the light of Christ throughout Ethiopia and the nations.',
        pillars: [
          { label: 'Transform lives' },
          { label: 'Equip leaders' },
          { label: 'Plant churches' },
          { label: 'Reach nations' },
        ],
      },
      scripture: {
        quote: 'Arise, shine, for your light has come, and the glory of the Lord rises upon you.',
        reference: 'Isaiah 60:1',
      },
      finalCta: {
        heading: 'Worship, grow, and serve with us',
        body: 'Whether you are seeking a church family, a deeper relationship with Christ, or a place to grow in faith, we welcome you with open hearts.',
        primaryLabel: 'Contact us',
        primaryHref: '/en/contact',
        secondaryLabel: 'Watch sermons',
        secondaryHref: '/en/media/sermons',
      },
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      introHeading: 'About Gospel Light',
      introBody:
        'Gospel Light International Church – Aware Branch is the founding church and international headquarters of Gospel Light International Church. It stands as the fulfillment of the vision God entrusted to Apostle Daniel Makonnen to proclaim the Gospel of Jesus Christ, raise faithful disciples, and develop servant leaders who impact generations.\n\nOur church is committed to biblical teaching, passionate worship, prayer, evangelism, discipleship, leadership development, and compassionate outreach. Every ministry we undertake is centered on the Word of God and empowered by the Holy Spirit.\n\nToday, the Aware Branch continues to serve as the heart of Gospel Light International Church, providing spiritual direction, leadership development, and ministry oversight for churches throughout Ethiopia and internationally.',
      historyIntro:
        'Gospel Light Ministries Church (GLC) is a God-given vision to Pastor Daniel Makonnen, one of the most beloved and respected ministers in the Ethiopian Evangelical churches.',
      visionStatement:
        'To glorify God by building a Christ-centered church that transforms lives, equips servant leaders, plants healthy churches, and shines the light of Christ throughout Ethiopia and the nations.',
      beliefs:
        'We believe in one God—Father, Son, and Holy Spirit; Jesus Christ as Savior; the Bible as God\'s inspired Word; salvation through faith in Christ alone; the empowering work of the Holy Spirit; the mission of the Church to worship, disciple, serve, and proclaim the Gospel; and the return of Jesus Christ.',
      commitment:
        'As the Mother Church, we are committed to influencing generations through biblical leadership, raising faithful disciples, empowering believers to fulfill their God-given calling, supporting pastors and churches, building healthy families, and advancing the Kingdom of God throughout Ethiopia and the world.',
      heroImage: hero.id,
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'pastor',
    locale: 'en',
    data: {
      name: 'Apostle Daniel Makonnen',
      title: 'Founder & Senior Pastor',
      summary:
        'Apostle Daniel Makonnen is the Founder and Senior Pastor of Gospel Light International Church. For decades he has faithfully preached the Gospel, trained ministers, planted churches, and inspired believers through biblical teaching, leadership development, discipleship, and missions.\n\nPastor Daniel was called of God at a young age to preach the gospel. During the dark period of Ethiopian history, when communism was at its destructive peak, he publicly preached the healing power of our Lord Jesus Christ to tens of thousands of people. After the Lord brought Pastor Daniel to the United States, he continued to minister and bless the Ethiopians in the Diaspora, particularly those in the Washington DC area.\n\nPastor Daniel has written several books covering topics ranging from Discipleship to the Holy Spirit.',
      portrait: hero.id,
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'giving-page',
    locale: 'en',
    data: {
      heading: 'Give',
      body: 'Your faithful giving supports evangelism, church planting, leadership development, missions, and community outreach.',
      scriptureQuote: 'God loves a cheerful giver.',
      scriptureReference: '2 Corinthians 9:7',
      ctaLabel: 'Give online',
      supports: [
        { item: 'Evangelism' },
        { item: 'Church planting' },
        { item: 'Leadership development' },
        { item: 'Missions' },
        { item: 'Community outreach' },
      ],
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    locale: 'en',
    data: {
      heading: 'Contact us',
      intro: 'We would love to connect with you. Reach the Aware Branch headquarters using the details below.',
    },
    context: { disableRevalidate: true },
  })

  const values = [
    'Biblical Truth',
    'Christ-Centered Worship',
    'Prayer',
    'Excellence',
    'Integrity',
    'Compassion',
    'Leadership Development',
    'Evangelism',
  ]
  const existingValues = await payload.find({ collection: 'core-values', limit: 1 })
  if (existingValues.totalDocs === 0) {
    for (let i = 0; i < values.length; i++) {
      await payload.create({
        collection: 'core-values',
        locale: 'en',
        data: { title: values[i], order: i + 1 },
        context: { disableRevalidate: true },
      })
    }
  }

  const mission = [
    'Proclaim the Gospel of Jesus Christ to all people.',
    'Make disciples who faithfully follow Christ.',
    'Equip and train leaders for the Kingdom of God.',
    'Build spiritually mature believers through biblical teaching.',
    'Demonstrate God\'s love through compassionate service.',
    'Support church planting and global missions.',
    'Raise generations that faithfully serve God and impact society.',
  ]
  const existingMission = await payload.find({ collection: 'mission-items', limit: 1 })
  if (existingMission.totalDocs === 0) {
    for (let i = 0; i < mission.length; i++) {
      await payload.create({
        collection: 'mission-items',
        locale: 'en',
        data: { title: mission[i], order: i + 1 },
        context: { disableRevalidate: true },
      })
    }
  }

  const milestones = [
    {
      eraLabel: 'Early calling',
      title: 'The calling',
      body: 'Pastor Daniel was called of God at a young age to preach the gospel. He was appointed by God to bring the full message of the gospel of our Lord Jesus Christ to various churches and localities in Ethiopia.',
      order: 1,
    },
    {
      eraLabel: '1970s revival',
      title: 'Ethiopian revival',
      body: 'During the dark period of Ethiopian history, when communism was at its destructive peak, Pastor Daniel, a young visionary leader, publicly preached the healing power of our Lord Jesus Christ to tens of thousands of people. Despite severe persecution and intense scrutiny from the communist regime, a revival broke out. This revival that broke out in the nineteen seventies had a dramatic effect on Ethiopian Christianity and played a major role in shaping the direction of the charismatic movement of the Ethiopian Evangelical churches.',
      order: 2,
    },
    {
      eraLabel: 'Ministry abroad',
      title: 'Ministry in the United States',
      body: 'After the Lord brought Pastor Daniel to the United States, he continued to minister and bless the Ethiopians in the Diaspora, particularly those in the Washington DC area. Having made himself available to the Lord, Pastor Daniel is a servant of God whom the Lord continues to use as his faithful and yielding vessel.',
      order: 3,
    },
    {
      eraLabel: 'Gospel Light',
      title: 'Gospel Light Ministries',
      body: 'The Lord has given the vision of Gospel Light Ministries to Pastor Daniel once again to reach multitudes throughout the nations. GLM produces literatures, audio and video materials to help churches, fellowships and individuals in their ministries and Christian walks with the Lord.',
      order: 4,
    },
    {
      eraLabel: 'Aware / Addis Ababa',
      title: 'International headquarters',
      body: 'The newly planted Gospel Light church in Addis Ababa is now one among the fastest growing churches in Ethiopia. Gospel Light International Church – Aware Branch is the founding church and international headquarters of Gospel Light International Church.',
      order: 5,
    },
    {
      eraLabel: 'The nations',
      title: 'Ethiopia and the nations',
      body: 'Visions of Gospel Light Ministries include further involvement in facilitating and funding of community projects, HIV/AIDS prevention related activities from Christian perspectives, establishment of Bible Schools, vocational training centers, clinics and creation of jobs through various schemes to achieve sustainable development. The leadership qualities shown by Pastor Daniel have earned him acclaim not only within the churches that he has founded, but also by ministers of other denominations.',
      order: 6,
    },
  ]

  const existingMilestones = await payload.find({ collection: 'history-milestones', limit: 1 })
  if (existingMilestones.totalDocs === 0) {
    for (const m of milestones) {
      await payload.create({
        collection: 'history-milestones',
        locale: 'en',
        data: m,
        context: { disableRevalidate: true },
      })
    }
  }

  const ministries = [
    {
      title: 'Church Ministries',
      summary: 'Biblical teaching, passionate worship, prayer, evangelism, discipleship, and compassionate outreach centered on the Word of God.',
      order: 1,
    },
    {
      title: 'Leadership',
      summary: 'Spiritual direction, pastoral training, and ministry support for churches and believers across Ethiopia and around the world.',
      order: 2,
    },
    {
      title: 'Church Planting',
      summary: 'Supporting the planting of healthy churches and advancing the Kingdom of God throughout Ethiopia and the world.',
      order: 3,
    },
    {
      title: 'Missions',
      summary: 'Shining the light of Christ throughout Ethiopia and the nations through proclamation, discipleship, and global mission support.',
      order: 4,
    },
    {
      title: 'Leadership Development',
      summary: 'Equipping and training servant leaders for the Kingdom of God who impact generations.',
      order: 5,
    },
    {
      title: 'Community Outreach',
      summary: 'Demonstrating God\'s love through compassionate service and community-focused ministry.',
      order: 6,
    },
  ]
  const existingMinistries = await payload.find({ collection: 'ministries', limit: 1 })
  if (existingMinistries.totalDocs === 0) {
    for (const m of ministries) {
      await payload.create({
        collection: 'ministries',
        locale: 'en',
        data: {
          ...m,
          slug: m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
        context: { disableRevalidate: true },
      })
    }
  }

  const locationSeeds = [
    {
      name: 'Aware Branch',
      slug: 'aware-branch',
      region: 'ethiopia' as const,
      city: 'Addis Ababa',
      address: 'Aware, Addis Ababa, Ethiopia\nP.O. Box 12992',
      phone: '+251-113 71 88 47',
      email: 'addis@glministries.org',
      description:
        'Founding church and international headquarters of Gospel Light International Church (Addis Ababa Administration Synod).',
      order: 1,
      image: hero.id,
    },
    {
      name: 'East Showa Zone Synod',
      slug: 'east-showa',
      region: 'ethiopia' as const,
      city: 'East Showa',
      address: 'East Showa Zone, Ethiopia',
      description: 'Gospel Light churches in the East Showa Zone Synod.',
      order: 2,
    },
    {
      name: 'Eastern Ethiopia Synod',
      slug: 'eastern-ethiopia',
      region: 'ethiopia' as const,
      city: 'Eastern Ethiopia',
      address: 'Eastern Ethiopia',
      description: 'Gospel Light churches in the Eastern Ethiopia Synod.',
      order: 3,
    },
    {
      name: 'Washington DC',
      slug: 'washington-dc',
      region: 'international' as const,
      city: 'Washington, DC',
      address: 'Gospel Light Church\n2401 Virginia Ave NW\nWashington DC 20037',
      phone: '+1 202 466 4642',
      email: 'dc@glmministries.org',
      description: 'Gospel Light Church in Washington, DC, United States.',
      order: 4,
    },
  ]

  for (const loc of locationSeeds) {
    const existing = await payload.find({
      collection: 'locations',
      where: { slug: { equals: loc.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'locations',
        id: existing.docs[0].id,
        locale: 'en',
        data: loc,
        context: { disableRevalidate: true },
      })
    } else {
      await payload.create({
        collection: 'locations',
        locale: 'en',
        data: loc,
        context: { disableRevalidate: true },
      })
    }
  }

  const cats = [
    { title: 'Biblical Teaching', slug: 'biblical-teaching' },
    { title: 'Discipleship', slug: 'discipleship' },
    { title: 'Leadership', slug: 'leadership' },
    { title: 'Holy Spirit', slug: 'holy-spirit' },
    { title: 'Faith', slug: 'faith' },
    { title: 'Family', slug: 'family' },
  ]
  const existingCats = await payload.find({ collection: 'sermon-categories', limit: 1 })
  if (existingCats.totalDocs === 0) {
    for (const c of cats) {
      await payload.create({
        collection: 'sermon-categories',
        locale: 'en',
        data: c,
        context: { disableRevalidate: true },
      })
    }
  }

  payload.logger.info('Seed complete')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
