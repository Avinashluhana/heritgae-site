import { useState } from 'react';
import { XMarkIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const NFTS = [
  {
    id: 1,
    title: 'Lota Navy Blue',
    object: 'Lota (Water Vessel)',
    edition: '1 of 1',
    image: 'https://garlandmag.com/wp-content/uploads/2022/02/03-Lota-Installation-Detail-Drawing-Memories-A-Life-in-a-Day-2021-AGNSW-Photo-by-Felicity-Jenkins.jpg',
    creator: 'Abdullah M.I. Syed',
    creatorBio: 'Interdisciplinary artist and academic whose practice serves as an archival form of poetic resistance — combating socio-political conflicts through storytelling and shared vulnerability.',
    price: '0.08 ETH',
    openSeaUrl: 'https://opensea.io/assets',
    story: `"Cleanliness is half of faith" — this was the first Islamic lesson taught to Abdullah M.I. Syed during his formative years in Pakistan. It involves using water to perform wāzu (ablution) for prayers, bathing, and personal hygiene. At the centre of this practice is the lota.\n\nA quintessential South Asian invention, the lota is a household object that transcends barriers between class, age, gender, and socio-political division. Almost all citizens of Pakistan have knowledge, access, and ownership of a lota. For some, there is tremendous pride in having a family lota that goes back generations.\n\nSyed's mother gave him her beloved eighty-year-old ornate copper lota — originally included in her dowry and strictly used for hand washing and religious ablution — along with its stellar provenance and auspicious stories of how it accompanied its many owners to pilgrimages and migrations.\n\nThe core of this NFT project focuses on the changing meaning of the lota: from a symbol of purity, devotion, and abundance — a holder and transfer of the element of life — to a political symbol of ridicule and treachery. In Pakistan, the phrase bependi ka lota (a lota without a base) describes politicians who switch parties, as a lota without a base rolls in unpredictable directions. This cultural evolution became so negative that the lota was removed from the election ballot paper.\n\nBy minting the lota as an NFT on the OpenSea platform using the Polygon blockchain, Syed does not seek to commodify it. Rather, he uses the NFT format to invite the viewer to imagine the lota's tactile and historical existence in pixels — extending the Duchampian tradition of ready-mades into the digital age. The NFT becomes a placeholder: a meeting point of the tangible and the intangible, the physical and the digital, the sacred and the political.\n\nAs Syed writes: "We still live in a world where physical objects hold value and are appreciated for their visual, tactile form." The Lota Navy Blue NFT is not the object. It is its memory.`,
    tags: ['Everyday Object', 'Pakistan', 'Islamic Practice', 'NFT Art'],
  },
  {
    id: 2,
    title: 'Ajrak Fragment — Indigo',
    object: 'Ajrak Textile',
    edition: '1 of 5',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Person_wearing_Sindhi_ajrak.jpg',
    creator: 'Avinash Kumar',
    creatorBio: "Heritage researcher and digital artist documenting everyday objects of Karachi's living culture.",
    price: '0.12 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `Ajrak is one of the oldest living textile traditions in the world — block-printed in indigo and madder red, its geometric patterns trace back over 4,000 years to the Indus Valley Civilisation.\n\nThis fragment was photographed in Zarina's workshop in Lyari, Karachi. The pattern — called "Tara" (star) — represents the night sky over the Sindh desert.\n\nBy preserving this fragment as a digital object, we are creating a parallel record — one that can survive floods, fires, and the slow erasure of time.`,
    tags: ['Textile', 'Sindhi Heritage', 'Lyari'],
  },
  {
    id: 3,
    title: 'Art Futures — The Non-Traditional Artscape',
    object: 'NFT & CryptoArt in Pakistan',
    edition: '1 of 1',
    image: 'https://thekarachicollective.com/wp-content/uploads/2022/10/NFT-title.jpg',
    creator: 'NFT Oar / Ejaz Art Gallery',
    creatorBio: 'NFT Oar is a subsidiary of Ejaz Art Gallery, co-founded by Muhammad Awais and Ahmed Bilal in August 2021 — the first established gallery in Pakistan to venture into CryptoArt.',
    price: '0.20 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `In 2021, the art world experienced major shock waves caused by a digital development referred to as NFT. The moment that crystallised this shift was when digital artist Beeple's Everydays: The First 5000 Days sold at Christie's for $69.3 million — an incomprehensible figure that forced the entire art world to pay attention.\n\nIn Pakistan, NFT Oar — a subsidiary of Ejaz Art Gallery, co-founded by Muhammad Awais and Ahmed Bilal — became the first established gallery in the country to venture into CryptoArt. Their mission: to fill a critical gap in Pakistan's art market and bridge the physical and metaphysical art worlds.\n\nOne of NFT Oar's most significant early projects involved working with Umer Saeed, representative of veteran artist Saeed Akhtar's studio, to preserve the master painter's creations by minting them on the blockchain. As Awais explains: "Minting the NFT and recording it permanently in the blockchain with the signed certificate of authenticity would validate the work as original and discredit all fake copies."\n\nFor Karachi's art scene, NFTs represent something deeper than financial speculation. They offer a democratic, transparent system — an open ledger where the history of any artwork is accessible to everyone. Young Pakistani artists like Hamza Qazi and Sundeep Kumar have already minted their creations to challenge the traditional art landscape.\n\nAwais describes this moment as "the digital renaissance" — a technology movement that rewards artists who stay active, build communities, and set up royalties so that every time a work sells, the artist receives a percentage. For a city like Karachi, where art has long been gatekept by wealth and access, NFTs carry the promise of something genuinely new: art that belongs to everyone.`,
    tags: ['CryptoArt', 'Karachi Art Scene', 'NFT Oar', 'Digital Heritage'],
  },
  {
    id: 4,
    title: 'Truck Art Panel — Phool Patti',
    object: 'Folk Art Panel',
    edition: '1 of 8',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Truck_art_Pakistan.jpg',
    creator: 'Avinash Kumar',
    creatorBio: "Heritage researcher and digital artist documenting everyday objects of Karachi's living culture.",
    price: '0.06 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `This panel was painted by Haider Ali in his workshop in Sher Shah, Karachi. It took four days. The flowers are not decorative — each one is a specific variety with a specific meaning in the Phool Patti tradition.\n\nTruck art is one of Pakistan's most globally recognised folk art forms, and yet the artists who create it are rarely named, rarely credited, and rarely compensated fairly.\n\nThis NFT is issued with Haider Ali's full knowledge and consent. Fifty percent of any sale goes directly to him.`,
    tags: ['Folk Art', 'Sher Shah', 'Truck Art'],
  },
];

const STORIES = [
  {
    id: 1,
    name: 'Empress Market Evictions: When Heritage Restoration Displaces Lives',
    place: 'Empress Market, Saddar, Karachi',
    tag: 'Displacement & Justice',
    image: 'https://i.tribune.com.pk/media/images/1855314-image-1543327929/1855314-image-1543327929-640x480.webp',
    short: 'In 2018, over 1,700 shops were demolished and 10,000 families lost their livelihoods in the name of heritage restoration around Empress Market — raising urgent questions about who heritage is really for.',
    full: `In 2018, Karachi witnessed one of the most controversial urban interventions around the historic Empress Market in Saddar. What was presented as an effort to restore the colonial-era landmark and clear illegal encroachments quickly turned into a humanitarian crisis for thousands of families whose livelihoods depended on the market.\n\nThe Anti-Encroachment Drive\n\nFollowing orders from Pakistan's Supreme Court, authorities launched a large anti-encroachment campaign in the Saddar area. During this operation, more than 1,700 shops were demolished and thousands of vendors were forced to leave the surroundings of Empress Market. The goal was to restore the historic character of the area and remove structures considered illegal.\n\nHowever, the operation happened rapidly. Within just a few days, around 10,000 families lost their primary source of income, including approximately 4,000 street vendors who relied on the market's daily activity to support their households.\n\nGenerations of Livelihoods Disrupted\n\nFor many vendors, selling goods around Empress Market was not simply a job — it was a family tradition spanning decades. One street vendor, Baani, had sold dry fruits outside the market for 15 years. Before her, her mother and sister had worked in the same place for nearly 40 years. After the eviction, she and many others were left struggling to survive without any alternative space to continue their work.\n\nSimilarly, long-time traders like Abdul Rashid, whose family had operated shops in the market since the late 1940s, saw their businesses destroyed overnight. These shops were built through years of effort and customer trust, making the sudden demolition devastating both economically and emotionally.\n\nSocial and Human Impact\n\nThe anti-encroachment drive raised serious concerns among human rights organizations and urban experts. The Human Rights Commission of Pakistan (HRCP) warned that removing thousands of vendors without a clear rehabilitation plan could push many low-income families into poverty.\n\nStreet vendors reported daily harassment after the eviction. Some attempted to continue selling goods nearby but were repeatedly forced to leave by authorities. Without a stable location or formal support, many families struggled to feed their children or pay rent.\n\nHeritage vs. Living Urban Culture\n\nUrban scholars argue that Empress Market represents more than just a historic building. Over time, the surrounding markets, stalls, and street vendors became part of Karachi's social and economic fabric. For decades, the area served as a vibrant hub where different communities met, traded, and interacted.\n\nThe eviction therefore raised a critical question: Can heritage conservation ignore the communities that keep heritage spaces alive?\n\nMany experts believe that urban restoration should not only protect buildings but also preserve the living culture and local economies that develop around them.\n\nThe Need for Fair Rehabilitation\n\nSeveral planners and academics suggested that a rehabilitation strategy should have been implemented before the demolition began. Relocation markets, compensation mechanisms, and gradual transition plans could have reduced the social damage. Without such planning, thousands of families who contributed to the urban life of Saddar were suddenly displaced.\n\nA Lesson for Future Urban Planning\n\nThe events at Empress Market highlight an important lesson for cities undergoing redevelopment. Heritage preservation and urban improvement should not come at the cost of vulnerable communities. A truly inclusive urban policy must balance three key aspects: protecting historic architecture, supporting local livelihoods, and ensuring fair rehabilitation for displaced communities. Only then can cities preserve both their monuments and the people who give those spaces meaning.`,
  },
  {
    id: 2,
    name: 'Struggling on the Footpath: Hindu Women Vendors in Karachi',
    place: 'Empress Market, Saddar, Karachi',
    tag: 'Women & Minority Rights',
    image: 'https://profit.pakistantoday.com.pk/wp-content/uploads/2017/01/DSC_0106-1068x688.jpg',
    short: 'Around 200 Hindu women have sold dried fruits and nuts outside Empress Market for generations — a livelihood built on resilience, now threatened by harassment, evictions, and institutional neglect.',
    full: `On the crowded sidewalks outside the historic Empress Market in Karachi's Saddar district, a group of women — wrapped in vibrant saris and armed with baskets of dried fruits and nuts — run their makeshift stalls daily. Though unseen by most visitors rushing past, their work sustains entire families and carries decades of history.\n\nA Legacy on the Streets\n\nFor vendors like Savita (30), sidewalk selling is a generational legacy. Her grandmother and mother worked here after the 1965 war, and she continues the trade today because it remains one of the few viable paths for economic independence for Hindu women in the city. Around 200 women from the Hindu community have traditionally sold dried fruits and nuts near Empress Market, representing a significant thread in Karachi's sprawling informal economy.\n\nDespite the challenges of standing for hours outdoors with minimal shelter, these vendors view their role with dignity — one that has kept families fed and often educated across generations.\n\nChallenges Beyond the Heat\n\nTheir daily reality is far from simple. Some vendors report taunts and hostility from nearby businessmen — particularly Pashtun shopkeepers who claim the women disturb their business. Vendors like Savita have pulled their daughters out of school after they were teased or harassed near home — revealing how economic life intersects with social vulnerability. Some women also recount confrontations with law enforcement, including police who grab food from their stalls without compensation.\n\nThis precariousness reflects a broader pattern: women and minorities working in Pakistan's informal sector often lack contract protections, legal safeguards, or social support. According to labour research on Pakistan's informal workforce, women are frequently clustered in unregulated jobs with little legal recourse and significant vulnerability to exploitation.\n\nImpact of Urban Policy and Pandemic Disruption\n\nIn 2019, a major anti-encroachment drive aimed at beautifying Empress Market led to the demolition of nearly 1,700 shops and displaced roughly 3,000 hawkers, including many women from the Hindu community. When the COVID-19 pandemic struck, the situation worsened: lockdowns eliminated foot traffic, while government support for informal workers was largely absent. The coronavirus turned us into beggars, one vendor recalled, lamenting that no relief reached these women or their families.\n\nLives Off the Footpath\n\nMost of these vendors live in older, densely populated neighbourhoods such as Ranchore Line and Bhimpura — areas that grew around pockets of Hindu heritage before Partition. After a long day of selling, they pack up their goods and visit a nearby temple — a cultural and spiritual anchor — before heading home to families that depend entirely on their daily earnings.\n\nTheir lives — precarious yet determined — reveal a powerful narrative of survival. Despite regular hardship, harassment, and policy disruptions, these women persist because their earnings, however modest, allow them to sustain households and maintain dignity.`,
  },
  {
    id: 3,
    name: "The Disappearing Horizon: How 'Development' is Undoing Karachi's Seaview",
    place: 'Seaview, Clifton, Karachi',
    tag: 'Urban & Environment',
    image: 'https://i.dawn.com/primary/2025/02/679e5386bd244.jpg',
    short: "Karachi's Seaview — once a free, open coastline for the city's working class — is being steadily privatised, fenced off, and built over. A study in who urban development is really for.",
    full: `A City Caught Between the Static and the Kinetic\n\nThe transformation of Seaview can be understood through the lens of urban theory. Karachi is shaped by the tension between static elements — permanent concrete, steel, and glass structures — and kinetic elements, which are the ever-evolving, shifting facets of local life and culture.\n\nWhile the city's indigenous and working-class communities represent the kinetic energy of the coast, modern development aspirations often favour the static. These high-rise ambitions frequently ignore the local geographical and environmental context, favouring international aesthetics over materials and structures sensitive to the Karachi coastline.\n\nThe Creeping Boundaries of Privatisation\n\nWhat was once an open horizon is now increasingly interrupted by gated parks, where public land is being partitioned into enclosed areas that spread unchecked. The beach is seeing a rise in kiosks and restaurant extensions, with documentation showing instances where simple repair and renovation permits are being used to justify full structural changes and unauthorised construction.\n\nNewer attractions like Nishan-e-Pakistan are advertised as public spaces, yet they often implement ticketed entry. These fees act as a barrier for the very population that relies on the beach for free entertainment.\n\nEnvironmental and Social Costs\n\nThis rapid development is not without physical consequences. Untreated sewage continues to spew onto the beach from storm drains, posing a direct hazard to the public. Construction and the demarcation of boundaries with barbed wire — even within public spaces like AK Khan Park — restrict the public's ability to move freely across the seafront.\n\nAlarming rates of land reclamation are artificially expanding the seafront, leading researchers to worry that Seaview may eventually become a misnomer as the water is pushed further away by looming architecture.\n\nConclusion: Whose City Is It?\n\nThe development of Seaview raises a fundamental question: who is this development for? While new structures are often framed as progress, they frequently cater to a specific section of the population while displacing the working class.\n\nIf the current trend of privatisation and artificial expansion continues, the awaam — the people — may soon find themselves priced out or fenced out of the only open space they have left. It is a reminder that urban development should not just be about building static structures, but about preserving the kinetic life that makes a city vibrant and inclusive.`,
  },
  {
    id: 4,
    name: 'Phool Patti – The Truck Art Workshop',
    place: 'Sher Shah, Karachi',
    tag: 'Folk Art',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Truck_art_Pakistan.jpg',
    short: 'Inside the workshop where Karachi\'s iconic truck art is born — a tradition of colour, poetry, and pride.',
    full: `In the sprawling workshops of Sher Shah, master painter Haider Ali dips his brush into a tin of electric blue and begins outlining a mountain range on the side of a Bedford truck. Around him, apprentices fill in flowers, birds, and Urdu couplets in colours so vivid they seem to vibrate.\n\nKarachi's truck art — known as "Phool Patti" (flowers and leaves) — is recognised globally as one of Pakistan's most distinctive folk art forms. Every truck is a moving canvas: landscapes, portraits of heroes, verses from Rumi, and intricate geometric borders all compete for space.\n\nHaider Ali has been painting trucks for 35 years. He learned from his uncle, who learned from a painter in Rawalpindi. "Every region has its own style," he explains. "Karachi trucks are more colourful, more crowded. Like the city itself."\n\nThe workshop trains young men from across Sindh and Balochistan. For many, it is their first formal skill — and their entry into a tradition that has rolled through Pakistan's highways for over seventy years.`,
  },
  {
    id: 5,
    name: 'Mehrunnisa – Burns Road Baker',
    place: 'Burns Road, Karachi',
    tag: 'Food & Memory',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Frere_Hall_and_surrounding_gardens_1.jpg',
    short: 'A family bakery on Burns Road making the same Hyderabadi biscuits since 1952 — a taste that carries a city\'s memory.',
    full: `Mehrunnisa's family came to Karachi from Hyderabad Deccan in 1948. Her father, a baker by trade, set up a small shop on Burns Road — then a newly settled street of migrants — and began making the biscuits and rusks he had sold back home.\n\nSeventy years later, the shop still uses the same recipes. The same wood-fired oven. The same tin moulds her father brought from Hyderabad.\n\n"People come from all over Karachi for these biscuits," says Mehrunnisa, now in her seventies. "They say it tastes like their grandmother's house. That is the best thing anyone can say."\n\nBurns Road has become Karachi's most famous food street, but Mehrunnisa's bakery predates the restaurants and the fame. It is one of the last original shops from the street's founding generation — a quiet archive of a community's journey, baked into every batch.`,
  },
  {
    id: 6,
    name: 'Rustam Irani – The Last Parsi Dairy',
    place: 'Soldier Bazaar, Karachi',
    tag: 'Community & Faith',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Mohatta_Palace_Khi.jpg',
    short: 'The Irani family has run Karachi\'s oldest Parsi dairy for four generations — a living link to a shrinking community.',
    full: `The Irani Dairy on Soldier Bazaar Road opens at 5 AM every morning, just as it has since 1931. Rustam Irani, the fourth-generation owner, pours fresh milk into steel containers while the city is still dark and quiet.\n\nThe Parsi community — Zoroastrians who came to the subcontinent from Persia over a thousand years ago — once formed a significant part of Karachi's professional and merchant class. They built hospitals, schools, and fire temples. Today, fewer than 1,500 Parsis remain in the city.\n\n"Our community is small now," Rustam says. "But we are still here. This dairy is still here."\n\nThe shop is more than a business. It is a meeting point for Karachi's remaining Parsis, a landmark for the neighbourhood, and a reminder that the city was built by many communities — most of whom have been quietly forgotten.`,
  },
  {
    id: 7,
    name: 'Zarina – Sindhi Ajrak Weaver',
    place: 'Lyari, Karachi',
    tag: 'Craft & Tradition',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Ajrak.jpg',
    short: 'In a small room in Lyari, Zarina keeps the ancient art of Sindhi Ajrak block-printing alive for a new generation.',
    full: `Ajrak — the deep indigo and crimson block-printed cloth of Sindh — is one of the oldest textile traditions in South Asia, with roots going back over 4,000 years. Zarina learned to make it from her mother in their village near Thatta before moving to Karachi.\n\nIn a small room in Lyari, she has set up a printing table and a collection of hand-carved wooden blocks. She takes orders for dupattas, shawls, and table runners — each piece taking two to three days to complete.\n\n"Every pattern has a meaning," she explains, pressing a block into the indigo paste with practiced force. "The geometric shapes represent the stars, the river, the fields. When you wear Ajrak, you carry Sindh with you."\n\nZarina now teaches a weekly class for young women in Lyari. Twelve students attend regularly. She charges nothing. "If I don't teach," she says simply, "it ends with me."`,
  },
  {
    id: 8,
    name: 'Baba Noor – Mohatta Palace Caretaker',
    place: 'Clifton, Karachi',
    tag: 'Architecture & Memory',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Mohatta_Palace_Karachi_2.jpg',
    short: 'For 40 years, Baba Noor has opened and closed the gates of Mohatta Palace — and remembers everything it has witnessed.',
    full: `Baba Noor came to work at Mohatta Palace in 1984, when the building was still largely closed to the public. He was 22. He is now 62, and has watched the palace transform from a neglected government property into one of Karachi's most beloved cultural landmarks.\n\nMohatta Palace was built in 1927 by Seth Shivratan Mohatta, a Marwari businessman, as a summer residence. After partition, it was taken over by the government and used as a residence for Fatima Jinnah. It was later converted into a museum.\n\n"I have seen presidents come here. Artists. School children. Foreign visitors," Baba Noor says, polishing the brass handle of the main gate. "Every person who walks through this door — I remember their face."\n\nHe knows every room, every crack in the Jodhpur stone, every story attached to every corner. The palace has an official historian. But Baba Noor is its living memory.`,
  },
  {
    id: 9,
    name: 'The Qawwals of Abdullah Shah Ghazi',
    place: 'Abdullah Shah Ghazi Shrine, Clifton',
    tag: 'Music & Devotion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Abdullah_Shah_Ghazi_Shrine_Clifton_Karachi.jpg',
    short: 'Every Thursday night, hereditary qawwals perform at Karachi\'s most sacred shrine — a tradition unbroken for centuries.',
    full: `Every Thursday evening, as the sun sets over the Arabian Sea, the hilltop shrine of Abdullah Shah Ghazi fills with devotees. And from the inner courtyard, the sound of qawwali rises — harmonium, tabla, and voices layered in devotional poetry that has been sung at this spot for generations.\n\nThe qawwals who perform here are hereditary musicians — their right to sing at this shrine passed from father to son for over two hundred years. The lead singer, Ustad Fareed, is the seventh generation of his family to perform here.\n\n"This is not a performance," he says after the session ends. "This is ibaadat — worship. We are not singing for the audience. We are singing for the saint."\n\nAbdullah Shah Ghazi is believed to be an 8th-century Sufi saint and is considered the patron saint of Karachi. His shrine survived the 2010 suicide bombing that killed seven people. The qawwals returned the following Thursday. They have not missed a week since.`,
  },
];

const TAG_COLORS = {
  'Trade & Family': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Displacement & Justice': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'Women & Minority Rights': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'Urban & Environment': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Craft & Art': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Livelihood & Sea': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Folk Art': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'Food & Memory': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Community & Faith': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'Craft & Tradition': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Architecture & Memory': 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-300',
  'Music & Devotion': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

export default function Stories() {
  const [active, setActive] = useState(null);
  const [nftActive, setNftActive] = useState(null);
  const [storyOpen, setStoryOpen] = useState(false);

  const handleShare = (nft, platform) => {
    const urls = {
      Twitter: `https://twitter.com/intent/tweet?text=Check out "${nft.title}" — a digital heritage NFT from Karachi&url=${window.location.href}`,
      WhatsApp: `https://wa.me/?text=Check out "${nft.title}" — a digital heritage NFT from Karachi ${window.location.href}`,
      Instagram: 'https://instagram.com',
    };
    window.open(urls[platform], '_blank');
  };

  const handleDownload = (nft) => {
    const content = `${nft.title}\n${nft.object} | ${nft.edition}\nCreator: ${nft.creator}\n\n${nft.story}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nft.title.replace(/\s+/g, '_')}_Heritage_NFT.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Info sheet downloaded!');
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/PK_Karachi_asv2020-02_img36_Empress_Market.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Living Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Stories of Living Heritage
          </h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto">
            Heritage is not only in buildings and monuments — it lives in people, families, and the traditions they carry forward every single day.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">
          Why People and Traditions Matter
        </h2>
        <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
          Karachi is a city of arrivals — of communities that came from across the subcontinent and the world, each bringing their crafts, their food, their faith, and their stories.
          The real heritage of this city is not just its colonial buildings or ancient ruins. It is the calligrapher still writing by hand in Kharadar.
          The fisherman who knows the sea by instinct. The baker whose biscuits taste like someone's grandmother's house.
          These are the stories we are here to preserve — before they are lost.
        </p>
      </section>

      {/* Stories Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <article key={story.id} className="card overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
              {/* Image */}
              <div className="overflow-hidden h-52">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 space-y-3">
                <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_COLORS[story.tag] || 'bg-stone-100 text-stone-600'}`}>
                  {story.tag}
                </span>
                <h2 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100 leading-snug">
                  {story.name}
                </h2>
                <p className="text-sm text-heritage-600 dark:text-heritage-400 font-medium">
                  📍 {story.place}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
                  {story.short}
                </p>
                <button
                  onClick={() => setActive(story)}
                  className="btn-primary w-full py-2 text-sm mt-auto"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NFT Section */}
      <section className="bg-stone-900 py-20 px-4">
        {/* Hero */}
        <div
          className="relative rounded-2xl overflow-hidden max-w-5xl mx-auto mb-14"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/PK_Karachi_asv2020-02_img36_Empress_Market.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="relative z-10 text-center py-20 px-6">
            <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Digital Heritage
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              NFT Collection
            </h2>
            <p className="text-stone-200 text-lg max-w-xl mx-auto leading-relaxed">
              Everyday objects, forgotten crafts, and living traditions from Karachi — preserved permanently on the blockchain.
              Each NFT carries a story. Each story carries a community.
            </p>
            <a
              href="https://opensea.io"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-8 btn-primary px-8 py-3 text-base"
            >
              View on OpenSea →
            </a>
          </div>
        </div>

        {/* Why NFTs */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h3 className="font-serif text-2xl font-bold text-white mb-3">Why NFTs for Heritage?</h3>
          <p className="text-stone-400 leading-relaxed">
            NFTs allow us to create permanent, verifiable digital records of cultural objects and stories.
            Unlike a photograph that can be deleted or a website that can go offline, an NFT lives on the blockchain indefinitely —
            ensuring these objects, crafts, and stories survive no matter what happens to the physical world.
          </p>
        </div>

{/* NFT Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1 h-8 bg-heritage-500 rounded-full" />
            <h3 className="font-serif text-2xl font-bold text-white">The Collection</h3>
            <span className="ml-auto text-sm text-stone-500">{NFTS.length} items</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NFTS.map((nft) => (
              <div
                key={nft.id}
                className="bg-stone-800 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                onClick={() => { setNftActive(nft); setStoryOpen(false); }}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={nft.image}
                    alt={nft.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 px-4">
                    <p className="text-white font-serif text-lg font-bold text-center">{nft.title}</p>
                    <p className="text-stone-300 text-xs text-center line-clamp-2">{nft.story.split('\n\n')[0]}</p>
                    <span className="mt-2 bg-heritage-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">Click to View</span>
                  </div>
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{nft.edition}</span>
                </div>
                <div className="p-5 flex flex-col flex-1 space-y-2">
                  <p className="text-xs text-heritage-400 font-medium">{nft.object}</p>
                  <h4 className="font-serif text-lg font-bold text-white">{nft.title}</h4>
                  <p className="text-sm text-stone-400 flex-1 line-clamp-2">{nft.story.split('\n\n')[0]}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {nft.tags.map((t) => (
                      <span key={t} className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-stone-700 mt-auto">
                    <span className="font-bold text-heritage-400">{nft.price}</span>
                    <span className="text-xs text-stone-500">by {nft.creator}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Detail Modal */}
      {nftActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setNftActive(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img src={nftActive.image} alt={nftActive.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white text-xs font-semibold bg-heritage-500 px-3 py-1 rounded-full inline-block mb-1">{nftActive.edition}</p>
                <h2 className="font-serif text-2xl font-bold text-white">{nftActive.title}</h2>
                <p className="text-stone-300 text-sm">{nftActive.object}</p>
              </div>
              <button
                onClick={() => setNftActive(null)}
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                {nftActive.tags.map((t) => (
                  <span key={t} className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-400">Current Price</p>
                  <p className="font-bold text-xl text-heritage-600 dark:text-heritage-400">{nftActive.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400">Creator</p>
                  <p className="font-semibold text-stone-800 dark:text-stone-100">{nftActive.creator}</p>
                  <p className="text-xs text-stone-400 max-w-[180px] text-right">{nftActive.creatorBio}</p>
                </div>
              </div>

              <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">The Story</p>
                  <button
                    onClick={() => setStoryOpen((s) => !s)}
                    className="text-xs text-heritage-600 dark:text-heritage-400 font-medium hover:underline"
                  >
                    {storyOpen ? 'Show Less' : 'Read Full Story'}
                  </button>
                </div>
                <div className={`text-sm text-stone-500 dark:text-stone-400 leading-relaxed space-y-3 overflow-hidden transition-all duration-300 ${storyOpen ? 'max-h-[600px]' : 'max-h-16'}`}>
                  {nftActive.story.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a href={nftActive.openSeaUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm py-2.5 text-center">🔗 View NFT</a>
                <button onClick={() => setStoryOpen(true)} className="btn-secondary text-sm py-2.5">📖 Learn Story</button>
                <a href={nftActive.openSeaUrl} target="_blank" rel="noreferrer" className="col-span-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 rounded-lg text-center transition">🛒 Buy / Collect</a>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1">
                  <ShareIcon className="w-3.5 h-3.5" /> Share
                </p>
                <div className="flex gap-2">
                  {['Twitter', 'WhatsApp', 'Instagram'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => handleShare(nftActive, platform)}
                      className="flex-1 text-xs bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-medium py-2 rounded-lg transition"
                    >
                      {platform === 'Twitter' ? '𝕏' : platform === 'WhatsApp' ? '💬' : '📸'} {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleDownload(nftActive)}
                  className="flex-1 text-sm border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium py-2.5 rounded-lg transition"
                >
                  ⬇ Download Info
                </button>
                <button
                  onClick={() => setNftActive(null)}
                  className="flex-1 text-sm border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1"
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Back to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-stone-100 dark:bg-stone-800 py-16 text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-3 text-stone-800 dark:text-stone-100">Know a Story Worth Telling?</h2>
        <p className="text-stone-500 dark:text-stone-400 mb-7 max-w-md mx-auto">
          Every person, family, or tradition in Karachi has a story. Help us document it before it disappears.
        </p>
        <a href="/submit" className="btn-primary text-base px-10 py-3">Submit a Story →</a>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} HeritageSite Platform. Built with ❤️ for preservation.
      </footer>

      {/* Read More Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-56 overflow-hidden rounded-t-2xl">
              <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-7 space-y-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_COLORS[active.tag] || 'bg-stone-100 text-stone-600'}`}>
                {active.tag}
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100">{active.name}</h2>
              <p className="text-sm text-heritage-600 dark:text-heritage-400 font-medium">📍 {active.place}</p>
              <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-3">
                {active.full.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <button
                onClick={() => setActive(null)}
                className="btn-secondary w-full py-2 mt-2 flex items-center justify-center gap-2"
              >
                <XMarkIcon className="w-4 h-4" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
