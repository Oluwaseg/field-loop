export type SampleBodyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] }
  | { type: 'stats'; items: { value: string; label: string }[] };

export type SamplePost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  featuredImage: { url: string; alt: string };
};

/** Sample posts from Blog_page_new_ui.txt */
export const SAMPLE_POSTS: SamplePost[] = [
  {
    slug: 'cutting-post-harvest-losses-nigeria',
    title: 'How Smart Storage Cuts Post-Harvest Losses From 40% to 5%',
    excerpt:
      'Nigerian farmers lose nearly half of every harvest before it reaches a market. Solar cold rooms, humidity sensors, and AI-driven dispatch flip that math.',
    publishedAt: '2026-06-18T09:00:00.000Z',
    category: 'Storage',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80',
      alt: 'Sunlit Nigerian farmland with tomatoes drying in crates',
    },
  },
  {
    slug: 'drones-changing-cassava-yields',
    title: 'Drones Are Quietly Doubling Cassava Yields in Ogun State',
    excerpt:
      'Multispectral imagery, weekly crop diagnostics, and tight feedback loops are letting smallholders out-produce industrial farms with a fraction of the inputs.',
    publishedAt: '2026-06-04T09:00:00.000Z',
    category: 'Drones',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1600&q=80',
      alt: 'Agricultural drone hovering over green crop rows at sunrise',
    },
  },
  {
    slug: 'iot-soil-sensors-roi',
    title: 'What an IoT Soil Sensor Actually Pays Back in a Season',
    excerpt:
      'A line-by-line breakdown of water saved, fertilizer not wasted, and yield gained. The number surprised our own engineers.',
    publishedAt: '2026-05-22T09:00:00.000Z',
    category: 'IoT',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&q=80',
      alt: 'Close-up of soil moisture sensor in dark fertile soil',
    },
  },
  {
    slug: 'ai-market-timing-tomatoes',
    title: 'Selling Tomatoes on the Right Day: AI Market Timing, Explained',
    excerpt:
      'Price swings of 300% in 72 hours are normal in Mile 12. Here is how we forecast them and what farmers do with the signal.',
    publishedAt: '2026-05-09T09:00:00.000Z',
    category: 'AI',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=1600&q=80',
      alt: 'Vibrant red tomatoes at an open-air Lagos market',
    },
  },
  {
    slug: 'from-pilot-to-fifty-farms',
    title: 'From Pilot to 50 Farms: What We Got Wrong Along the Way',
    excerpt:
      'An honest field journal. The sensor we had to redesign three times, the cold room that overheated, and the farmer who taught us about trust.',
    publishedAt: '2026-04-27T09:00:00.000Z',
    category: 'Stories',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
      alt: 'Two farmers inspecting crops in a wide field at golden hour',
    },
  },
  {
    slug: 'climate-resilient-irrigation',
    title: 'Designing Irrigation That Survives a Climate-Volatile Decade',
    excerpt:
      'Rainfall in southwest Nigeria has become unrecognizable. The irrigation playbook from 2015 needs a full rewrite — here is ours.',
    publishedAt: '2026-04-12T09:00:00.000Z',
    category: 'Climate',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
      alt: 'Irrigation sprinklers in a green field under dramatic sky',
    },
  },
];

/** Default article body from Blog_page_new_ui.txt */
export const DEFAULT_SAMPLE_BODY: SampleBodyBlock[] = [
  {
    type: 'p',
    text: 'We spent the last three planting seasons embedded with smallholder farms across Lagos, Ogun, and Oyo. What follows is a distilled field journal — the parts we wish someone had told us before we shipped our first prototype.',
  },
  {
    type: 'stats',
    items: [
      { value: '42%', label: 'Average loss before FieldLoop' },
      { value: '4.8%', label: 'Loss after one full season' },
      { value: '₦1.9M', label: 'Median added revenue / hectare' },
    ],
  },
  { type: 'h2', text: 'The problem hiding in plain sight' },
  {
    type: 'p',
    text: 'Most post-harvest loss is not dramatic. It is a slow bleed — a degree too warm here, a humidity spike there, a truck that arrived a day late. The fix is rarely a single piece of hardware. It is a feedback loop tight enough to catch the bleed before it compounds.',
  },
  {
    type: 'quote',
    text: 'Before the sensors I was guessing. Now I know which crate goes out first and which one needs the cold room. My income doubled in one season.',
    cite: 'Mrs. Olufunke, tomato farmer · Ikorodu',
  },
  { type: 'h2', text: 'What actually moved the needle' },
  {
    type: 'list',
    items: [
      'Solar-powered cold storage sized for a single cooperative, not an industrial estate',
      "Humidity + ethylene sensors with SMS alerts in the farmer's local language",
      'Dispatch routing tuned to Lagos market price windows, not just distance',
      'Weekly drone diagnostics replacing the monthly walk-through',
    ],
  },
  { type: 'h2', text: "What we'd do differently" },
  {
    type: 'p',
    text: 'Trust compounds faster than technology. The farms where we showed up weekly — even when nothing was broken — adopted twice as fast as the ones we treated as remote deployments. Build the relationship first and the data flows on its own.',
  },
  {
    type: 'p',
    text: 'If you are running a similar program, start with one cooperative, instrument heavily, and resist the temptation to scale before the first cohort is genuinely thriving. The case studies write themselves once that happens.',
  },
];
