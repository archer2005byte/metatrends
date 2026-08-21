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

export const SHORT_URL = "meta.rogerarcher.com/resources";
export const RESOURCES_URL = "https://meta.rogerarcher.com/resources";
export const READING_PACK_URL = "/meta-trends-reading-pack.pdf";

export const readingGroups: ReadingGroup[] = [
  {
    id: "intelligence",
    label: "Intelligence",
    links: [
      {
        title: "Stanford AI Index Report",
        author: "Stanford HAI",
        url: "https://aiindex.stanford.edu/report/",
        note: "The annual measurement baseline for capability, cost and adoption.",
      },
      {
        title: "Epoch AI — Data on machine learning trends",
        author: "Epoch AI",
        url: "https://epoch.ai/data",
        note: "Compute, training runs and benchmark saturation, tracked over time.",
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
        note: "The transformer paper — the architecture beneath the curve.",
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
        title: "Lifespan: Why We Age and Why We Don't Have To",
        author: "David Sinclair",
        url: "https://lifespanbook.com/",
        note: "The healthspan argument, in its most ambitious form.",
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
        title: "Electricity 2025 — Data centres and AI demand",
        author: "International Energy Agency",
        url: "https://www.iea.org/reports/electricity-2025",
        note: "Where compute demand meets the grid.",
      },
      {
        title: "Energy and Civilization: A History",
        author: "Vaclav Smil",
        url: "https://mitpress.mit.edu/9780262536165/energy-and-civilization/",
        note: "The long view: energy as the constraint on everything else.",
      },
      {
        title: "Search for Artificial Stellar Sources of Infrared Radiation",
        author: "Freeman Dyson, Science, 1960",
        url: "https://www.science.org/doi/10.1126/science.131.3414.1667",
        note: "The original Dyson sphere paper — the 30-year horizon.",
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
