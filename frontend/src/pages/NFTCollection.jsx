import { useState } from 'react';
import { XMarkIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const NFTS = [
  {
    id: 1,
    title: 'Lota — Navy Blue',
    object: 'Lota (Water Vessel)',
    edition: '1 of 10',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.08 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `The lota is perhaps the most democratic object in South Asian life. It sits beside the rich and the poor alike — on marble bathroom shelves and beside mud-walled courtyards. It has no brand, no patent, no designer. And yet its form is so perfectly resolved that it has remained essentially unchanged for centuries.\n\nThis particular lota — navy blue, slightly dented on one side — belonged to a family in Lyari, Karachi. It was used for wuzu (ablution) before the five daily prayers for over forty years. The dent on its side came from a fall during the 1965 floods.\n\nTo mint this object as an NFT is not to commodify it. It is to insist that the ordinary deserves the same permanence we give to monuments. The lota does not need a museum. But it deserves to be remembered.`,
    tags: ['Everyday Object', 'Lyari', 'Islamic Practice'],
  },
  {
    id: 2,
    title: 'Ajrak Fragment — Indigo',
    object: 'Ajrak Textile',
    edition: '1 of 5',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.12 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `Ajrak is one of the oldest living textile traditions in the world — block-printed in indigo and madder red, its geometric patterns trace back over 4,000 years to the Indus Valley Civilisation.\n\nThis fragment was photographed in Zarina's workshop in Lyari, Karachi. The pattern — called "Tara" (star) — represents the night sky over the Sindh desert. Each block is hand-carved from sheesham wood and takes three days to make.\n\nBy preserving this fragment as a digital object, we are not replacing the physical tradition. We are creating a parallel record — one that can survive floods, fires, and the slow erasure of time.`,
    tags: ['Textile', 'Sindhi Heritage', 'Lyari'],
  },
  {
    id: 3,
    title: 'Empress Market Clock — 1889',
    object: 'Architectural Detail',
    edition: '1 of 3',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.20 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `The clock tower of Empress Market has marked time in Saddar since 1889. Built in the Gothic Revival style by the British colonial administration, it was named after Queen Victoria following her proclamation as Empress of India.\n\nBut the market belongs to Karachi now — to the vendors who have worked under its arches for generations, to the families who buy their spices here every week, to the pigeons that nest in its stonework.\n\nThis NFT captures the clock face at 7:14 AM on a Tuesday in March — the exact moment the morning light hits the stone at an angle that makes it look, briefly, like it is made of gold.`,
    tags: ['Colonial Architecture', 'Saddar', 'Landmark'],
  },
  {
    id: 4,
    title: 'Truck Art Panel — Phool Patti',
    object: 'Folk Art Panel',
    edition: '1 of 8',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.06 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `This panel was painted by Haider Ali in his workshop in Sher Shah, Karachi. It took four days. The flowers are not decorative — each one is a specific variety with a specific meaning in the Phool Patti tradition. The rose means love. The lotus means purity. The sunflower means the journey ahead.\n\nTruck art is one of Pakistan's most globally recognised folk art forms, and yet the artists who create it are rarely named, rarely credited, and rarely compensated fairly.\n\nThis NFT is issued with Haider Ali's full knowledge and consent. Fifty percent of any sale goes directly to him.`,
    tags: ['Folk Art', 'Sher Shah', 'Truck Art'],
  },
  {
    id: 5,
    title: 'Qawwali Harmonium — Abdullah Shah Ghazi',
    object: 'Musical Instrument',
    edition: '1 of 1',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.35 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `This harmonium has been played at the shrine of Abdullah Shah Ghazi every Thursday night for over thirty years. It belongs to Ustad Fareed, the seventh generation of his family to perform qawwali at this site.\n\nThe instrument is battered. Several keys stick. The bellows have been repaired with electrical tape. And yet the sound it produces — in the hands of someone who has played it for decades — is extraordinary.\n\nThis is a 1-of-1 NFT. There will never be another edition. Like the instrument itself, it is singular.`,
    tags: ['Music', 'Sufi Heritage', 'Clifton'],
  },
  {
    id: 6,
    title: 'Mohana Fishing Net — Ibrahim Hyderi',
    object: 'Craft Object',
    edition: '1 of 6',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    creator: 'Avinash Kumar',
    creatorBio: 'Heritage researcher and digital artist documenting everyday objects of Karachi\'s living culture.',
    price: '0.09 ETH',
    openSeaUrl: 'https://opensea.io',
    story: `Razia has been weaving fishing nets by hand since she was twelve years old. She learned from her mother, who learned from hers. The pattern she uses — a hexagonal mesh with reinforced edges — is specific to the Mohana community of Ibrahim Hyderi and is designed for the particular currents of the Arabian Sea near Karachi.\n\nAs industrial trawling has reduced fish stocks and younger generations leave for city jobs, the knowledge of how to make these nets by hand is disappearing.\n\nThis NFT documents a single net — its dimensions, its pattern, its maker — as a permanent record of a technique that may not survive another generation.`,
    tags: ['Craft', 'Ibrahim Hyderi', 'Mohana Community'],
  },
];

const SHARE_LINKS = (nft) => [
  {
    label: 'Twitter',
    icon: '𝕏',
    url: `https://twitter.com/intent/tweet?text=Check out "${nft.title}" — a digital heritage NFT from Karachi&url=${window.location.href}`,
  },
  {
    label: 'WhatsApp',
    icon: '💬',
    url: `https://wa.me/?text=Check out "${nft.title}" — a digital heritage NFT from Karachi ${window.location.href}`,
  },
  {
    label: 'Instagram',
    icon: '📸',
    url: `https://instagram.com`,
  },
];

export default function NFTCollection() {
  const [active, setActive] = useState(null);
  const [storyOpen, setStoryOpen] = useState(false);

  const handleShare = (nft, platform) => {
    const links = SHARE_LINKS(nft);
    const link = links.find((l) => l.label === platform);
    if (link) window.open(link.url, '_blank');
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

      {/* Hero Banner */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Digital Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            NFT Collection
          </h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto leading-relaxed">
            Everyday objects, forgotten crafts, and living traditions from Karachi — preserved permanently on the blockchain.
            Each NFT carries a story. Each story carries a community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a href="https://opensea.io" target="_blank" rel="noreferrer" className="btn-primary px-8 py-3 text-base">
              View on OpenSea →
            </a>
            <a href="/stories" className="btn-secondary border-white text-white hover:bg-white/10 px-8 py-3 text-base">
              ← Back to Stories
            </a>
          </div>
        </div>
      </section>

      {/* What is this */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">
          Why NFTs for Heritage?
        </h2>
        <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
          NFTs (Non-Fungible Tokens) allow us to create permanent, verifiable digital records of cultural objects and stories.
          Unlike a photograph that can be deleted or a website that can go offline, an NFT lives on the blockchain indefinitely.
          This collection does not aim to replace physical heritage — it aims to create a parallel digital archive
          that ensures these objects, crafts, and stories survive in some form, no matter what happens to the physical world.
        </p>
      </section>

      {/* NFT Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-8 bg-heritage-500 rounded-full" />
          <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">The Collection</h2>
          <span className="ml-auto text-sm text-stone-400">{NFTS.length} items</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NFTS.map((nft) => (
            <div
              key={nft.id}
              className="card overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => { setActive(nft); setStoryOpen(false); }}
            >
              {/* Image with hover overlay */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-serif text-lg font-bold px-4 text-center">{nft.title}</p>
                  <p className="text-stone-300 text-xs px-4 text-center line-clamp-2">{nft.story.split('\n\n')[0]}</p>
                  <span className="mt-2 bg-heritage-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Click to View
                  </span>
                </div>
                {/* Edition badge */}
                <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {nft.edition}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1 space-y-2">
                <p className="text-xs text-heritage-600 dark:text-heritage-400 font-medium">{nft.object}</p>
                <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100">{nft.title}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 flex-1 line-clamp-2">
                  {nft.story.split('\n\n')[0]}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {nft.tags.map((t) => (
                    <span key={t} className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-300 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-700 mt-auto">
                  <span className="font-bold text-heritage-600 dark:text-heritage-400">{nft.price}</span>
                  <span className="text-xs text-stone-400">by {nft.creator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Section */}
      <section className="bg-stone-100 dark:bg-stone-800 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4 text-stone-800 dark:text-stone-100">About the Creator</h2>
          <div className="card p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-heritage-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              A
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Avinash Kumar</h3>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
              Heritage researcher, digital archivist, and creator of the Karachi Living Heritage NFT Collection.
              This project began as a thesis on the preservation of intangible cultural heritage and evolved into
              a digital archive of the objects, people, and traditions that make Karachi irreplaceable.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <a href="https://opensea.io" target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 px-5">
                OpenSea Profile
              </a>
              <a href="/volunteer" className="btn-secondary text-sm py-2 px-5">
                Collaborate
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} HeritageSite Platform. Built with ❤️ for preservation.
      </footer>

      {/* Detail Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white text-xs font-semibold bg-heritage-500 px-3 py-1 rounded-full inline-block mb-1">
                  {active.edition}
                </p>
                <h2 className="font-serif text-2xl font-bold text-white">{active.title}</h2>
                <p className="text-stone-300 text-sm">{active.object}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span key={t} className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Price + Creator */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-400">Current Price</p>
                  <p className="font-bold text-xl text-heritage-600 dark:text-heritage-400">{active.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400">Creator</p>
                  <p className="font-semibold text-stone-800 dark:text-stone-100">{active.creator}</p>
                  <p className="text-xs text-stone-400 max-w-[180px] text-right">{active.creatorBio}</p>
                </div>
              </div>

              {/* Story preview / full toggle */}
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
                  {active.story.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={active.openSeaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm py-2.5 text-center"
                >
                  🔗 View NFT
                </a>
                <button
                  onClick={() => setStoryOpen(true)}
                  className="btn-secondary text-sm py-2.5"
                >
                  📖 Learn Story
                </button>
                <a
                  href={active.openSeaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 rounded-lg text-center transition"
                >
                  🛒 Buy / Collect
                </a>
              </div>

              {/* Share */}
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1">
                  <ShareIcon className="w-3.5 h-3.5" /> Share
                </p>
                <div className="flex gap-2">
                  {['Twitter', 'WhatsApp', 'Instagram'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => handleShare(active, platform)}
                      className="flex-1 text-xs bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-medium py-2 rounded-lg transition"
                    >
                      {platform === 'Twitter' ? '𝕏' : platform === 'WhatsApp' ? '💬' : '📸'} {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download + Back */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleDownload(active)}
                  className="flex-1 text-sm border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium py-2.5 rounded-lg transition"
                >
                  ⬇ Download Info
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="flex-1 text-sm border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-1"
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Back to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
