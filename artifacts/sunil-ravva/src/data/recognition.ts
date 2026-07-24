export type RecognitionItem = {
  img: string;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  linkLabel?: string;
  isVideo?: boolean;
};

// The first 4 entries are the ones featured on the homepage.
// Add new awards/certificates anywhere in this array — they'll
// automatically show up on the full "/recognition" page.
// New entries only need `img` and `title` (subtitle optional);
// no `url`/`description` is required.
export const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    img: "/images/shine-award.png",
    title: "HSBC Shine Award",
    subtitle: "HSBC 2019",
    description:
      "Winner of the HSBC Shine Award at the HTI Annual Awards & Celebrations (TRANSCEND 2020), recognising exceptional performance and impact.",
    url: "https://www.youtube.com/watch?v=5i7NeuvIbJ8",
    linkLabel: "Watch on YouTube",
    isVideo: true,
  },
  {
    img: "/images/award-belongs-her.png",
    title: "1st Architect of the Year",
    subtitle: "HSBC 2019",
    description:
      "Recognised as the first-ever Architect of the Year at HSBC, awarded for excellence in technical architecture and product innovation.",
    url: "https://www.linkedin.com/pulse/award-belongs-her-sunil-ravva/",
    linkLabel: "Read Article",
    isVideo: false,
  },
  {
    img: "/images/award-fintech-star.png",
    title: "Rising Fintech Star",
    subtitle: "BankingTech Awards 2020",
    description:
      "Highly Commended at the prestigious BankingTech Awards 2020 for outstanding contributions to financial technology innovation.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6743043053818257408/",
    linkLabel: "View on LinkedIn",
    isVideo: false,
  },
  {
    img: "/images/lloyds-recognition.png",
    title: "Certificate of Recognition",
    subtitle: "Lloyds Technology Centre 2026",
    description:
      "Recognised for driving Data & AI product excellence at Lloyds Technology Centre, accelerating delivery and shaping customer-first data products.",
    url: "https://www.linkedin.com/posts/sunilravva_lloydstechnologycentre-bestplacestowork-recognitionmatters-activity-7353052955920510976-3n5b",
    linkLabel: "View on LinkedIn",
    isVideo: false,
  },

  // --- Add new awards/certificates below this line ---
  // Example of a simple entry (photo + name only, no link):
  // {
  //   img: "/images/my-new-certificate.png",
  //   title: "Name of the award or certificate",
  //   subtitle: "Issuing body, Year",
  // },
];

// Only the first 4 are shown on the homepage.
export const FEATURED_RECOGNITION_COUNT = 4;
