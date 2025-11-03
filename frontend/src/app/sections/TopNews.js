import Button from "../components/Button";

const topNews = [
    {
        title: "McKinsey: AI Will Reshape 25% of All Job Categories by 2030",
        description: "New report highlights sector-level disruption in finance, healthcare, and logistics through autonomous decision systems.",
        source: "McKinsey",
        sourceIcon: "https://logo.clearbit.com/mckinsey.com",
        href: "https://www.mckinsey.com/insights/ai-job-disruption-2030",
        topic: "Research",
        date: "2025-06-27",
        time: "17:00"
    },
    {
        title: "BlackRock Launches $1.2B AI Strategy Fund",
        description: "The actively managed fund will target public companies with exposure to automation, data infrastructure, and cognitive AI.",
        source: "Bloomberg",
        sourceIcon: "https://logo.clearbit.com/bloomberg.com",
        href: "https://www.bloomberg.com/news/blackrock-ai-strategy-fund-launch",
        topic: "Asset Management",
        date: "2025-06-30",
        time: "14:15"
    },
    {
        title: "AI Funding Reaches Record High in Q2",
        description: "Venture funding for AI startups hit $28.3B globally in Q2 2025, driven by LLM infrastructure and vertical SaaS applications.",
        source: "TechCrunch",
        sourceIcon: "https://logo.clearbit.com/techcrunch.com",
        href: "https://techcrunch.com/ai-funding-q2-report",
        topic: "Funding",
        date: "2025-07-01",
        time: "08:45"
    },
    {
        title: "Sequoia Leads $140M Round in Legal AI Platform",
        description: "LegalOS secures growth capital to expand its generative AI document engine across Europe and the US.",
        source: "Sifted",
        sourceIcon: "https://logo.clearbit.com/sifted.eu",
        href: "https://sifted.eu/articles/legalos-sequoia-140m-round",
        topic: "VC Deals",
        date: "2025-06-29",
        time: "11:20"
    },
    {
        title: "EU Publishes Draft Guidelines for LLM Regulation",
        description: "Proposed framework includes model classification, explainability standards, and liability rules for high-impact use cases.",
        source: "Politico",
        sourceIcon: "https://logo.clearbit.com/politico.eu",
        href: "https://www.politico.eu/article/eu-ai-llm-regulation-guidelines-2025",
        topic: "Policy",
        date: "2025-07-02",
        time: "09:30"
    },
];


export default function TopNews() {
    return (
        <div>
            <h2 className="sub-heading">Top News</h2>

            <div className="grid grid-cols-1 gap-4">
                {topNews.map((topNew, i) => (
                    <div key={i} className="card">

                        <div className="flex w-full">

                            <div className="flex items-center gap-4 w-2/4">
                                <img src={topNew.sourceIcon} className="w-15 h-15 rounded-full" />
                                <div className="">
                                    <h1 className="card-heading text-accent">{topNew.title}</h1>
                                    <p>{topNew.description}</p>
                                </div>
                            </div>


                            <div className="w-1/4 text-right">
                                <p>{topNew.date}</p>
                                <p>{topNew.time}</p>
                            </div>

                            <div className="w-1/4 content-end text-right">
                                <Button className={"px-10"}>Open</Button>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}