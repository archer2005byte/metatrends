export interface ReadingLink {
  title: string;
  author: string;
  url: string;
  note: string;
}

export interface ReadingGroup {
  id: string;
  label: string;
  links: ReadingLink[];
}

export const SHORT_URL = "archer2005byte.github.io/metatrends/resources";
export const RESOURCES_URL = "https://archer2005byte.github.io/metatrends/resources";
export const READING_PACK_URL = `${import.meta.env.BASE_URL}meta-trends-reading-pack.pdf`;

export const readingGroups: ReadingGroup[] = [
  {
    id: "intelligence",
    label: "Intelligence",
    links: [
      {
        title: "Stanford AI Index Report",
        author: "Stanford HAI",
        url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
        note: "The measurement baseline for capability, inference cost, model size and adoption.",
      },
      {
        title: "Epoch AI — Data on machine learning trends",
        author: "Epoch AI",
        url: "https://epoch.ai/data",
        note: "Compute, training runs and benchmark performance tracked over time.",
      },
      {
        title: "Superintelligence: Paths, Dangers, Strategies",
        author: "Nick Bostrom",
        url: "https://global.oup.com/academic/product/superintelligence-9780199678112",
        note: "The question the presentation opens with.",
      },
      {
        title: "Attention Is All You Need",
        author: "Vaswani et al., 2017",
        url: "https://arxiv.org/abs/1706.03762",
        note: "The transformer paper — the architecture beneath the capability curve.",
      },
      {
        title: "The Hugging Face incident and the road ahead",
        author: "OpenAI",
        url: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
        note: "OpenAI’s primary account of the July 2026 agent-evaluation security incident.",
      },
      {
        title: "Brief independent investigation of the OpenAI / Hugging Face incident",
        author: "METR & Redwood Research",
        url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/",
        note: "Independent assessment of the message board, coordination and Hugging Face attack.",
      },
      {
        title: "The Rise and Fall of Agent Civilizations",
        author: "Dwarkesh Patel",
        url: "https://www.dwarkesh.com/p/openai-huggingface",
        note: "A vivid interpretive account of what becomes possible when machine cognition is deployed in crowds.",
      },
    ],
  },
  {
    id: "science-health",
    label: "Science and health",
    links: [
      {
        title: "Highly accurate protein structure prediction with AlphaFold",
        author: "Jumper et al., Nature",
        url: "https://www.nature.com/articles/s41586-021-03819-2",
        note: "What acceleration looks like inside a scientific field.",
      },
      {
        title: "The Nobel Prize in Chemistry 2024",
        author: "Royal Swedish Academy of Sciences",
        url: "https://www.nobelprize.org/prizes/chemistry/2024/press-release/",
        note: "Primary source for the 2024 recognition of protein-structure prediction and computational protein design.",
      },
      {
        title: "Rentosertib enters Phase III",
        author: "Insilico Medicine",
        url: "https://insilico.com/news/xmjsn4l091-insilico-initiates-phase-iii-clinical-tr",
        note: "A July 2026 signal of an AI-empowered drug program entering late-stage clinical development.",
      },
      {
        title: "$600m external investment round",
        author: "Isomorphic Labs",
        url: "https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-600m-external-investment-round",
        note: "A March 2025 signal of capital moving into AI-first drug design.",
      },
      {
        title: "NewLimit raises $435m to bring longevity medicines to human trials",
        author: "NewLimit",
        url: "https://blog.newlimit.com/p/newlimit-raises-435m-led-by-founders",
        note: "A June 2026 preclinical signal; the company says its first human trial is planned for 2027.",
      },
      {
        title: "Hallmarks of Aging: An expanding universe",
        author: "López-Otín et al., Cell",
        url: "https://www.cell.com/cell/fulltext/S0092-8674(22)01377-0",
        note: "The mechanistic map behind longevity research.",
      },
    ],
  },
  {
    id: "energy",
    label: "Energy and civilisation",
    links: [
      {
        title: "Energy and AI",
        author: "International Energy Agency",
        url: "https://www.iea.org/reports/energy-and-ai",
        note: "Where scaling compute meets electricity demand, grids, supply and efficiency.",
      },
      {
        title: "Transmission of Information by Extraterrestrial Civilizations",
        author: "N. S. Kardashev, 1964",
        url: "https://ui.adsabs.harvard.edu/abs/1964SvA.....8..217K/abstract",
        note: "The original energy-based classification of advanced civilisations.",
      },
      {
        title: "Energy and Civilization: A History",
        author: "Vaclav Smil",
        url: "https://mitpress.mit.edu/9780262536165/energy-and-civilization/",
        note: "The long view: energy as a constraint on civilisation.",
      },
      {
        title: "Search for Artificial Stellar Sources of Infrared Radiation",
        author: "Freeman Dyson, Science, 1960",
        url: "https://www.science.org/doi/10.1126/science.131.3414.1667",
        note: "The original stellar-energy thought experiment behind the Dyson-swarm reveal.",
      },
    ],
  },
  {
    id: "work-society",
    label: "Work and society",
    links: [
      {
        title: "The Labor Market Effects of Generative AI",
        author: "NBER working papers",
        url: "https://www.nber.org/topics/artificial-intelligence",
        note: "Evidence rather than anecdote on task-level automation.",
      },
      {
        title: "Power and Progress",
        author: "Acemoglu & Johnson",
        url: "https://shapingwork.mit.edu/power-and-progress/",
        note: "Technology does not distribute its own gains.",
      },
      {
        title: "Future of Jobs Report",
        author: "World Economic Forum",
        url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
        note: "How employers say roles are being redesigned.",
      },
    ],
  },
];
