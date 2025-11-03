import { LuBriefcaseBusiness } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import { LuSquareUser } from "react-icons/lu";
import { LuSquarePen } from "react-icons/lu";
import { LuPresentation } from "react-icons/lu";

export const workflows = (size) => {
    const workflowsList = [
        {
            title: "Buyout CDD",
            icon: <LuChartLine size={size} />,
            badges: {
                target: "Buyout-Ready",
                focus: "20+ Slides",
                new: true,
                locked: false
            },
            info: "Avg. duration: 2 min",
            description: "Detaillierte Outside-CDD für PE-Funds – mit Markt-, Wettbewerb-, Risiko-, Team- und Investment Case-Analyse.",
            category: "CDD"
        },
        {
            title: "Startup CDD",
            icon: <LuBriefcaseBusiness size={size} />,
            badges: {
                target: "Early-Stage",
                focus: "Concise",
                new: false,
                locked: false
            },
            info: "Avg. duration: 2 min",
            description: "Schnelle, kompakte CDD für Frühphasen-Startups. Fokus auf Markt, Team, Risiken & Traction – ideal für VC-Entscheidungen.",
            category: "CDD"
        },
        {
            title: "Target Scouting",
            icon: <LuLayers size={size} />,
            badges: {
                target: "Deal Sourcing",
                focus: "Strategic Fit",
                new: true,
                locked: true
            },
            info: "Avg. duration: 2 min",
            description: "Identifiziere passende Übernahmeziele basierend auf Markt, Wettbewerb und strategischer Passung.",
            category: "Identification"
        }
    ]
    return workflowsList
}

export const effectiveMetrics = {
    "company_overview": {
        "name": "NeuroCompute AG",
        "industry": "Semiconductor / AI Hardware",
        "usp": "Edge-optimized AI chips with low power consumption and high parallelism.",
        "business_model": "Design and licensing of custom AI accelerators for edge devices and automotive use cases.",
        "headquarter": "Munich, Germany",
        "website": "https://www.stihl.de/de",
        "innovation": 92,
        "market_power": 75
    },

    "financials": {
        "revenue_last_year": 125000000,
        "revenue_last_year_source": "NeuroCompute AG – Annual Report 2023",
        "profit_last_year": 18500000,
        "profit_last_year_source": "NeuroCompute AG – Annual Report 2023",
        "wages": 46000000,
        "wages_source": "Internal HR Report 2023",
        "employees": 320,
        "employees_source": "Company Website – About Us (2024)",
        "total_businesses": 1,
        "total_businesses_source": "Commercial Registry Germany"
    },

    "market_data": {
        "sector": "AI Semiconductor",

        "market_size": {
            "tam": 30000000000,
            "tam_sources": [
                {
                    "name": "McKinsey & Company",
                    "description": "AI semiconductor market global outlook",
                    "trustlevel": 5,
                    "date": "2023",
                    "link": "https://www.mckinsey.com/industries/semiconductors/insights/global-ai-chip-market"
                }
            ],
            "sam": 12000000000,
            "sam_sources": [
                {
                    "name": "Statista",
                    "description": "Edge AI chip market size Europe",
                    "trustlevel": 4,
                    "date": "2023",
                    "link": "https://www.statista.com/statistics/edge-ai-market"
                }
            ],
            "penetration": 5,
            "som": 600000000,
            "ai_commentary": "Laut McKinsey beläuft sich der globale TAM für AI-Halbleiter auf rund 30 Mrd. USD. Innerhalb Europas adressiert der Edge-AI-Segment laut Statista etwa 12 Mrd. USD (SAM). Mit einer angenommenen Penetrationsrate von 5 % ergibt sich ein realistischer Einstiegspunkt (SOM) von ca. 600 Mio. USD. Die Zahlen deuten auf ein stark wachsendes Marktumfeld mit klar abgegrenztem Go-to-Market-Fokus hin."
        },

        "market_growth": {
            "years": [2020, 2021, 2022, 2023, 2024, 2025],
            "values": [5000000000, 7000000000, 12000000000, 18000000000, 25000000000, 30000000000],
            "source": {
                "name": "McKinsey & Company",
                "description": "Prognostiziertes Marktvolumen für AI-Chips weltweit",
                "date": "2023",
                "link": "https://www.mckinsey.com/industries/semiconductors/insights/global-ai-chip-market"
            },
            "ai_commentary": "Die zeitliche Entwicklung des AI-Halbleitermarkts zeigt ein signifikantes Wachstum von 5 Mrd. USD im Jahr 2020 auf prognostizierte 30 Mrd. USD bis 2025 – eine Versechsfachung innerhalb von fünf Jahren. Diese Dynamik unterstreicht das steigende Interesse an AI-Rechenleistung und legt nahe, dass Unternehmen im Marktsegment frühzeitig Position beziehen sollten, um Skalierungsvorteile zu realisieren."
        }
    },
    "bcg_matrix": {
        "competitors": [
            {
                "name": "AlphaTech",
                "type": "Incumbent",
                "market_share": 0.65,
                "market_growth_rate": 0.12,
                "website": "https://alphatech.com",
                "source": {
                    "name": "Strategy Analytics",
                    "description": "Marktanteil & Wachstum laut AI-Hardware Report 2024",
                    "trustlevel": 4,
                    "date": "2024",
                    "link": "https://strategyanalytics.com/reports/alphatech"
                }
            },
            {
                "name": "BetaAI",
                "type": "Challenger",
                "market_share": 0.25,
                "market_growth_rate": 0.30,
                "website": "https://betaai.com",
                "source": {
                    "name": "CB Insights",
                    "description": "Startup-Wachstumsanalyse im Bereich AI-Chips",
                    "trustlevel": 4,
                    "date": "2024",
                    "link": "https://cbinsights.com/betaai"
                }
            },
            {
                "name": "GammaCore",
                "type": "Niche Player",
                "market_share": 0.08,
                "market_growth_rate": 0.20,
                "website": "https://gammacore.com",
                "source": {
                    "name": "Statista",
                    "description": "Marktpositionierung kleinerer Anbieter",
                    "trustlevel": 3,
                    "date": "2023",
                    "link": "https://statista.com/gammacore"
                }
            },
            {
                "name": "DeltaX",
                "type": "Declining",
                "market_share": 0.02,
                "market_growth_rate": -0.05,
                "website": "https://deltax.ai",
                "source": {
                    "name": "Forrester",
                    "description": "Analyse rückläufiger Anbieter im AI-Chipmarkt",
                    "trustlevel": 4,
                    "date": "2024",
                    "link": "https://forrester.com/deltax"
                }
            }
        ],
        "ai_commentary": "Die BCG-Matrix positioniert AlphaTech als marktführende 'Cash Cow'. BetaAI zeigt hohes Wachstumspotenzial und agiert im 'Star'-Quadranten. GammaCore ist ein typisches 'Question Mark', das sich je nach Investitionsstrategie positiv oder negativ entwickeln kann. DeltaX hingegen fällt in den 'Dog'-Quadranten und sollte aufgrund seines schrumpfenden Marktanteils kritisch hinterfragt werden."
    },

    "risk_analysis": {
        "competition": {
            "value": 80,
            "name": "CB Insights",
            "description": "Competitive pressure in the AI chip market",
            "trustlevel": 4,
            "date": "2023",
            "link": "https://www.cbinsights.com/research/report/ai-chips-competition"
        },
        "technology": {
            "value": 88,
            "name": "McKinsey",
            "description": "Technological uncertainty in edge AI accelerators",
            "trustlevel": 5,
            "date": "2023",
            "link": "https://www.mckinsey.com/ai/edge-computing-trends"
        },
        "regulatory": {
            "value": 60,
            "name": "OECD",
            "description": "Regulatory frameworks for emerging AI hardware",
            "trustlevel": 4,
            "date": "2022",
            "link": "https://www.oecd.org/ai/regulation"
        },
        "finance": {
            "value": 72,
            "name": "PitchBook",
            "description": "Funding risks in semiconductor startups",
            "trustlevel": 4,
            "date": "2024",
            "link": "https://pitchbook.com/financing-ai-hardware"
        },
        "demand": {
            "value": 78,
            "name": "Statista",
            "description": "Projected demand for AI chips (2025 forecast)",
            "trustlevel": 3,
            "date": "2023",
            "link": "https://www.statista.com/ai-chip-demand"
        },
        "ai_commentary": [
            "Wettbewerbsdruck im Markt ist hoch (80 %), was schnelle Innovation und Differenzierung erfordert.",
            "Technologierisiken sind besonders ausgeprägt (88 %) – frühe Standards fehlen, technologische Relevanz kann sich schnell verschieben.",
            "Regulatorische Unsicherheit ist moderat, aber relevant (60 %), insbesondere bei Exportkontrollen und KI-Ethik.",
            "Finanzierungsrisiken (72 %) deuten auf ein selektives Investorenumfeld für Deep-Tech-Hardware hin.",
            "Die Nachfrageentwicklung bleibt positiv (78 %), was auf stabile Marktchancen trotz Risiken schließen lässt."
        ]
    },
    "management_team": [
        {
            "name": "Sarah Müller",
            "position": "CEO",
            "linkedin": "https://linkedin.com/in/sarahmueller",
            "ai_commentary": "Erfahrene Führungskraft mit Fokus auf Wachstumsstrategien und AI-Kommerzialisierung."
        },
        {
            "name": "David Zhang",
            "position": "CTO",
            "linkedin": "https://linkedin.com/in/davidzhang",
            "ai_commentary": "Technologieorientierter CTO mit starkem Hintergrund in Machine Learning und Skalierung von Infrastruktur."
        }
    ],
    "management_summary": "NeuroCompute AG is a Munich-based AI hardware startup targeting edge inference with a specialized chip architecture. With rising demand in smart mobility and low-power devices, the company is well-positioned within a growing niche. However, dependency on fabless production and limited market power create scaling challenges. Revenue growth is healthy, with a focused and lean structure.",

    "ai_recommendation": "Given the high innovation, niche positioning and growing market, NeuroCompute AG is attractive for early-stage VC investors with a 5–7 year horizon. However, due to moderate market power and high capex dependency, this investment suits portfolios with risk appetite and sectoral alignment. Recommendation: Proceed with enhanced due diligence – conditional buy."
}

export const projects = [
    {
        title: "Private",
        created_by: "louiskarakas.bw@gmail.com",
    },
    {
        title: "AI Companies",
        created_by: "louiskarakas.bw@gmail.com",
    },
    {
        title: "Sustainability Companies",
        created_by: "louiskarakas.bw@gmail.com",
    },
]

export const buyout_cdd_data = {
    "id": "3feaf723-655f-4609-864a-c91564b56341",
    "messages": [
        {
            "role": "user",
            "content": "Ich will eine commercial due diligence für die Firma: Andreas Stihl AG & Co. KG aus Waiblingen, Deutschland"
        }
    ],
    "executive_summary": {
        "key_takeaways": [
            {
                "takeaway": "Stihl besitzt eine starke Marktposition durch hohe Markenbekanntheit und Kundenloyalität.",
                "supporting_arguments": [
                    "Stihl hat sich einen hervorragenden Ruf als Hersteller hochwertiger Produkte erarbeitet.",
                    "Die starke Kundenloyalität zeigt sich in den hohen Zufriedenheitswerten und den kontinuierlichen Umsätzen von 5,33 Milliarden Euro im Jahr 2024."
                ]
            },
            {
                "takeaway": "Innovative Produktlinie und technologische Führerschaft sind entscheidend für zukünftiges Wachstum.",
                "supporting_arguments": [
                    "Ein umfassendes Patentportfolio schützt technische Innovationen und stärkt die Wettbewerbsfähigkeit.",
                    "Der Trend zu nachhaltigen Energielösungen ist klar erkennbar, da 24% des Umsatzes bereits aus Batterieprodukten stammen."
                ]
            },
            {
                "takeaway": "Stihl hat bedeutende Möglichkeiten zur Kostenreduktion und Effizienzsteigerung durch vertikale Integration.",
                "supporting_arguments": [
                    "Durch die Insourcing kritischer Komponenten könnte die Produktqualität weiter verbessert werden.",
                    "Investitionen in upstream-Lieferanten würden strategische Preismacht und verbesserte Margen ermöglichen."
                ]
            }
        ],
        "final_recommendation": "Empfehlung zur Übernahme von Stihl; das Unternehmen zeigt ein starkes Wachstumspotenzial und eine solide Marktstellung, die für nachhaltiges Investieren spricht."
    },
    "company_profile": {
        "company_name": "Andreas Stihl AG & Co. KG",
        "company_name_presentation": "Stihl",
        "industry": "Manufacturing",
        "website": "https://www.stihl.com",
        "headquarters_location": "Waiblingen, Germany",
        "operating_countries": [
            "Germany",
            "United States"
        ]
    },
    "investment_case": {
        "summary": "Germany-based manufacturing company Stihl seems attractive as an acquisition candidate to AUCTUS",
        "strengths": [
            "Strong global brand recognition bolstered by extensive customer loyalty and high-quality reputation.",
            "Comprehensive patent portfolio enhances competitive advantage and protects technological innovations.",
            "Advanced manufacturing capabilities ensure high product quality and operational efficiency across global locations.",
            "Robust logistics network supports efficient distribution and meets diverse market demands promptly.",
            "Consistent revenue growth, recording 5.33 billion euros in 2024, indicates resilient market performance.",
            "High customer satisfaction ratings derived from continuous innovation in product performance and reliability.",
            "24% of sales now from battery products, aligning with market trends towards sustainable energy solutions.",
            "Investments in technology and capabilities support ongoing market expansion into new product categories."
        ],
        "opportunities": [
            "Stihl could enhance product quality by insourcing critical component manufacturing processes.",
            "As a vertically integrated player, Stihl may leverage supply chain efficiencies to reduce costs significantly.",
            "Stihl could gain market agility through direct control over distribution channels and retail formats.",
            "Investing in upstream suppliers may provide Stihl with strategic pricing power and improved margins."
        ]
    },
    "market_development": {
        "title": "Manufacturing market volume development in Germany and United States over the past years",
        "markets": [
            {
                "title": "Germany has exhibited steady growth in last five years.",
                "market": "Manufacturing",
                "country": "Germany",
                "unit": "bn EUR",
                "data": [
                    {
                        "year": 2019,
                        "value": 351.1
                    },
                    {
                        "year": 2020,
                        "value": 367.6
                    },
                    {
                        "year": 2021,
                        "value": 390.2
                    },
                    {
                        "year": 2022,
                        "value": 401.5
                    },
                    {
                        "year": 2023,
                        "value": 407.7
                    }
                ],
                "source": "https://www.statista.com/statistics/381927/turnover-manufacturing-industry-germany/",
                "source_name": "Statista"
            },
            {
                "title": "United States manufacturing sector shows resilience.",
                "market": "Manufacturing",
                "country": "United States",
                "unit": "bn USD",
                "data": [
                    {
                        "year": 2019,
                        "value": 2400.0
                    },
                    {
                        "year": 2020,
                        "value": 2310.0
                    },
                    {
                        "year": 2021,
                        "value": 2570.0
                    },
                    {
                        "year": 2022,
                        "value": 2630.0
                    },
                    {
                        "year": 2023,
                        "value": 2700.0
                    }
                ],
                "source": "https://www.mckinsey.com/business-functions/operations/our-insights/the-future-of-manufacturing-in-the-us",
                "source_name": "McKinsey"
            }
        ]
    },
    "market_trends": {
        "market": "Manufacturing",
        "country": "Germany",
        "trends": [
            {
                "type": "Technology",
                "description": "Rising investment in smart manufacturing and automation technologies.",
                "growth_direction": "up"
            },
            {
                "type": "Regulatory / Policy",
                "description": "Increasing environmental regulations pushing for sustainable manufacturing practices.",
                "growth_direction": "up"
            },
            {
                "type": "Demographics / Society",
                "description": "Aging workforce leading to skills shortages in traditional manufacturing sectors.",
                "growth_direction": "down"
            },
            {
                "type": "Competition / Substitution",
                "description": "Increased competition from low-cost manufacturers in Eastern Europe and Asia.",
                "growth_direction": "down"
            },
            {
                "type": "Sustainability",
                "description": "Growing consumer preference for environmentally friendly products and sustainable production processes.",
                "growth_direction": "up"
            }
        ],
        "source": "https://www.statista.com/outlook/io/manufacturing/germany",
        "source_name": "Statista"
    },
    "product_portfolio": {
        "title": "Andreas Stihl AG & Co. KG's product portfolio focuses on outdoor power equipment",
        "value_proposition": "Innovative tools for outdoor work efficiency",
        "pillars": [
            {
                "name": "Chainsaws",
                "products": [
                    "MS 271 Farm Boss",
                    "MS 462 C-M",
                    "MS 261 C-M"
                ],
                "price_strategy": [
                    "Premium pricing",
                    "Value-based pricing"
                ]
            },
            {
                "name": "Garden Machinery",
                "products": [
                    "BGA 56 Battery Blower",
                    "RMA 443 C Mower",
                    "HTA 50 Hedgetrimmer"
                ],
                "price_strategy": [
                    "Mid to high pricing",
                    "Cost-plus pricing"
                ]
            },
            {
                "name": "Professional Power Equipment",
                "products": [
                    "TS 420 Cut-off Machine",
                    "BR 800 C-E Backpack Blower",
                    "MS 660 Chainsaw"
                ],
                "price_strategy": [
                    "High-value premium pricing",
                    "Tiered pricing based on features"
                ]
            },
            {
                "name": "Battery Products",
                "products": [
                    "AK 30 Battery",
                    "AL 101 Charger",
                    "RLA 240 Mower"
                ],
                "price_strategy": [
                    "Competitive pricing",
                    "Subscription models for batteries"
                ]
            },
            {
                "name": "Accessories and Tools",
                "products": [
                    "Replacement chains",
                    "Safety gear",
                    "Sprayers"
                ],
                "price_strategy": [
                    "Affordable pricing",
                    "Bundled offers"
                ]
            }
        ],
        "source": "https://www.stihl.com",
        "source_name": "STIHL Corporate Website"
    },
    "key_drivers": {
        "summary": "Stihl relies on four key drivers to ensure high customer traffic.",
        "drivers": [
            {
                "type": "Location",
                "description": [
                    "Stihl operates stores in high-footfall urban areas and shopping streets.",
                    "Research confirms that location is a key driver of customer choice in this category."
                ],
                "source_url": "https://www.cliffsnotes.com/study-notes/18217155"
            },
            {
                "type": "Service",
                "description": [
                    "Stihl invests in professional training and friendliness of store personnel.",
                    "The brand regularly tops rankings for best in-store customer experience."
                ],
                "source_url": "https://inmarket.com/case-studies/stihl/"
            },
            {
                "type": "Pricing",
                "description": [
                    "Stihl employs a premium pricing strategy, reflecting high-quality products.",
                    "Competitors note Stihl's pricing consistency, which reinforces brand loyalty."
                ],
                "source_url": "https://ar.stihl.com/2021/journal/what-customers-want.html"
            },
            {
                "type": "Marketing",
                "description": [
                    "Stihl runs strong marketing campaigns focusing on quality and durability.",
                    "Loyalty programs are also integrated to enhance customer retention."
                ],
                "source_url": "https://corporate.stihl.com/en/press/press-release-company/2025/financial-pressconference-2025"
            }
        ]
    },
    "growth_opportunities": {
        "country": "Germany",
        "new_organic": false,
        "new_acquisition": false,
        "existing_organic": true,
        "existing_acquisition": false,
        "source_url": "https://sustainabilityreport.stihl.com/2024/content/stihl-group-and-strategy/index.html"
    },
    "market_entry": {
        "title": "Emerging manufacturing markets present diverse opportunities for growth",
        "evaluated_markets": [
            {
                "country": "Vietnam",
                "attractiveness": 8,
                "ease_of_entry": 7,
                "focus": "current"
            },
            {
                "country": "Mexico",
                "attractiveness": 7,
                "ease_of_entry": 8,
                "focus": "current"
            },
            {
                "country": "India",
                "attractiveness": 9,
                "ease_of_entry": 6,
                "focus": "current"
            },
            {
                "country": "Poland",
                "attractiveness": 6,
                "ease_of_entry": 5,
                "focus": "future"
            },
            {
                "country": "Brazil",
                "attractiveness": 5,
                "ease_of_entry": 6,
                "focus": "future"
            },
            {
                "country": "Thailand",
                "attractiveness": 7,
                "ease_of_entry": 5,
                "focus": "future"
            },
            {
                "country": "Philippines",
                "attractiveness": 6,
                "ease_of_entry": 4,
                "focus": "future"
            },
            {
                "country": "Nigeria",
                "attractiveness": 4,
                "ease_of_entry": 3,
                "focus": "no_potential"
            },
            {
                "country": "Russia",
                "attractiveness": 5,
                "ease_of_entry": 2,
                "focus": "no_potential"
            },
            {
                "country": "South Africa",
                "attractiveness": 4,
                "ease_of_entry": 5,
                "focus": "future"
            }
        ],
        "future_markets_comment": "Investments in infrastructure and regulatory improvements will drive future market potential."
    }
}

export const startups = [
    {
        companyName: "NeuroLink Systems",
        slogan: "Wiring the Future – Unlocking the Human Mind through Technology",
        logo: "https://wellfound.com/cdn-cgi/image/width=128,height=128,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/1343458-055b3d10a262cb69a6f269626c0bbaa9-medium_jpg.jpg?buster=1589589334",
        website: "https://neurolink.ai",
        employees: "51–100",
        location: "San Francisco",
        description:
            "NeuroLink Systems entwickelt fortschrittliche Gehirn-Computer-Schnittstellen, die es Menschen ermöglichen, Maschinen direkt mit ihren Gedanken zu steuern. Durch neuronale Implantate, maschinelles Lernen und Echtzeit-Datenverarbeitung revolutioniert NeuroLink sowohl den medizinischen Bereich – etwa bei Lähmungen und neurologischen Störungen – als auch die Mensch-Maschine-Interaktion in der Arbeitswelt. Ziel des Unternehmens ist es, Barrieren zwischen Mensch und Technologie aufzulösen und eine neue Ära kognitiv gesteuerter Systeme einzuläuten.",
        industries: ["Neurotechnologie", "Künstliche Intelligenz", "Medizintechnik"]
    },
    {
        companyName: "AetherGrid",
        slogan: "Power from the Skies – Clean Energy for a Disconnected World",
        logo: "https://wellfound.com/cdn-cgi/image/width=128,height=128,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/1343458-055b3d10a262cb69a6f269626c0bbaa9-medium_jpg.jpg?buster=1589589334",
        website: "https://aethergrid.com",
        employees: "11–50",
        location: "Oslo",
        description:
            "AetherGrid erschließt eine völlig neue Energiequelle: atmosphärische Elektrizität. Mit hochentwickelten Antennensystemen und cloudbasierter Steuerung zapft das Unternehmen natürliche elektrische Ströme in der Atmosphäre an und wandelt sie in nutzbare Energie um. Diese Technologie ist besonders für abgelegene Gebiete und Katastrophengebiete geeignet, in denen herkömmliche Stromnetze versagen. AetherGrid verbindet Innovation, Umweltbewusstsein und soziale Verantwortung zu einer disruptiven Lösung für die globale Energieversorgung.",
        industries: ["Energie", "CleanTech", "Infrastruktur"]
    },
    {
        companyName: "Synthora",
        slogan: "Life, Engineered – The Future of Healing Starts at the Code of Life",
        logo: "https://wellfound.com/cdn-cgi/image/width=128,height=128,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/1343458-055b3d10a262cb69a6f269626c0bbaa9-medium_jpg.jpg?buster=1589589334",
        website: "https://synthora.bio",
        employees: "101–250",
        location: "Boston",
        description:
            "Synthora steht an der Spitze der synthetischen Biologie und Genom-Editierung. Das Unternehmen entwickelt maßgeschneiderte genetische Therapien zur Behandlung seltener und bislang unheilbarer Krankheiten. Dabei werden moderne CRISPR-Technologien, KI-gestützte Proteindesigns und klinische Datenanalysen kombiniert, um Heilung auf Zellebene möglich zu machen. Synthora verfolgt eine Vision, in der Krankheiten präzise, individuell und nachhaltig geheilt werden können – durch Kontrolle über den Code des Lebens selbst.",
        industries: ["Biotechnologie", "Pharma", "Gesundheit"]
    },
    {
        companyName: "Orbital Hive",
        slogan: "Automating Space, One Drone at a Time – The Future of Orbital Logistics",
        logo: "https://wellfound.com/cdn-cgi/image/width=128,height=128,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/1343458-055b3d10a262cb69a6f269626c0bbaa9-medium_jpg.jpg?buster=1589589334",
        website: "https://orbitalhive.space",
        employees: "51–100",
        location: "Tokyo",
        description:
            "Orbital Hive baut ein Netzwerk autonomer Drohnen, die im Orbit stationiert werden und dort Wartungs-, Reparatur- und Inspektionsaufgaben übernehmen. Ziel ist es, die Lebensdauer von Satelliten zu verlängern, Weltraummüll zu reduzieren und das Management orbitaler Infrastrukturen zu automatisieren. Durch Echtzeitnavigation, robotische Präzision und KI-gesteuerte Entscheidungsprozesse schafft Orbital Hive eine neue Ära effizienter und sicherer Raumfahrtlogistik.",
        industries: ["Raumfahrt", "Robotik", "Autonome Systeme"]
    },
    {
        companyName: "Civica",
        slogan: "Democracy Reimagined – Empowering Citizens through Digital Governance",
        logo: "https://wellfound.com/cdn-cgi/image/width=128,height=128,fit=scale-down,gravity=0.5x0.5,quality=90,format=auto/https://photos.wellfound.com/startups/i/1343458-055b3d10a262cb69a6f269626c0bbaa9-medium_jpg.jpg?buster=1589589334",
        website: "https://getcivica.org",
        employees: "11–50",
        location: "Tallinn",
        description:
            "Civica revolutioniert demokratische Beteiligung im digitalen Zeitalter. Mit einer Blockchain-basierten Plattform ermöglicht das Unternehmen sichere Online-Abstimmungen, partizipative Stadtentwicklung und transparente Entscheidungsprozesse für Kommunen, NGOs und internationale Organisationen. Ziel ist es, die Distanz zwischen Bürger:innen und Regierung zu verringern und echte Mitbestimmung zu ermöglichen – jederzeit, überall und fälschungssicher.",
        industries: ["GovTech", "Blockchain", "SaaS"]
    }
];
