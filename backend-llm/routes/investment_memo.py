from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pipelines.investment_memo import investment_memo

router = APIRouter()

investment_memo_data = {
    "executive_summary": "...",
    "company_overview": {
        "name": "QuantumCompute Inc.",
        "industry": "Quantum Computing",
        "website": "https://www.quantumcompute.com",
        "headquarter": "San Francisco, USA",
    },
    "financials": {
        "revenue_last_year": {
            "title": "Annual Report 2024",
            "origin_value": "45M",
            "origin_currency": "USD",
            "url": "https://example.com/revenue2024",
            "snippet": "Revenue increased to $45 million in 2024",
            "year": "2024",
            "is_estimated": False,
            "estimator_comment": "",
        },
        "profit_last_year": {
            "title": "Profit Statement 2024",
            "origin_value": "-10M",
            "origin_currency": "USD",
            "url": "https://example.com/profit2024",
            "snippet": "The company posted a loss of $10 million.",
            "year": "2024",
            "is_estimated": False,
            "estimator_comment": "",
        },
        "employees": {
            "title": "Company Overview",
            "origin_value": "120",
            "origin_currency": None,
            "url": "https://example.com/team",
            "snippet": "QuantumCompute Inc. employs 120 people worldwide.",
            "year": "2024",
            "is_estimated": False,
            "estimator_comment": "",
        },
    },
    "market_size": {
        "target_region": "North America",
        "tam": {
            "title": "TAM Analysis by McKinsey",
            "origin_value": "15B",
            "origin_currency": "USD",
            "url": "https://mckinsey.com/quantum-tam",
            "snippet": "TAM for quantum computing expected to reach $15B by 2030.",
            "year": "2023",
            "is_estimated": True,
            "estimator_comment": "Based on projected adoption curve.",
        },
        "sam": {
            "title": "SAM Estimation",
            "origin_value": "3B",
            "origin_currency": "USD",
            "url": "https://example.com/sam",
            "snippet": "Serviceable market is around $3B.",
            "year": "2024",
            "is_estimated": True,
            "estimator_comment": "Focused on financial services segment.",
        },
        "comment": "High growth potential driven by advances in hardware scalability.",
    },
    "market_growth": {
        "data_set": [
            {
                "title": "Market Report 2024",
                "origin_value": "23%",
                "origin_currency": None,
                "url": "https://example.com/growth",
                "snippet": "The market is growing at 23% CAGR.",
                "year": "2024",
                "is_estimated": False,
                "estimator_comment": "",
            }
        ],
        "comment": "Growth driven by increased enterprise adoption.",
    },
    "competitor_landscape": {
        "competitors": [
            {
                "name": "Qbit Systems",
                "type": "Startup",
                "market_share": {
                    "title": "Competitor Analysis 2024",
                    "origin_value": "12%",
                    "origin_currency": None,
                    "url": "https://example.com/qbit-share",
                    "snippet": "Qbit Systems holds 12% of the quantum market.",
                    "year": "2024",
                    "is_estimated": True,
                    "estimator_comment": "Based on funding and number of clients.",
                },
                "market_growth_rate": {
                    "title": "Competitor Growth 2024",
                    "origin_value": "30%",
                    "origin_currency": None,
                    "url": "https://example.com/qbit-growth",
                    "snippet": "Qbit is growing at 30% CAGR.",
                    "year": "2024",
                    "is_estimated": False,
                    "estimator_comment": "",
                },
                "website": "https://qbit.systems",
            }
        ],
        "comment": "Qbit Systems and IonQ are the most relevant competitors.",
    },
    "risks": {
        "market": 3,
        "competitive": 4,
        "regulatory": 2,
        "technology": 5,
        "reputational": 1,
    },
    "management_team": {
        "team": [
            {
                "name": "Dr. Alice Newton",
                "desciption": "Former Head of Quantum Research at IBM",
                "position": "CEO",
                "linkedin": "https://linkedin.com/in/alicenewton",
                "comment": "Highly experienced in scaling deep-tech companies.",
            },
            {
                "name": "Bob Lee",
                "desciption": "Ex-Google Hardware Director",
                "position": "CTO",
                "linkedin": "https://linkedin.com/in/boblee",
                "comment": "Strong technical leadership in quantum devices.",
            },
        ],
        "comment": "Team has a unique combination of academic and commercial experience.",
    },
}


@router.post("/investment-memo")
async def create_report(request: Request):
    try:
        messages = await request.json()

        if not isinstance(messages, list):
            return JSONResponse(
                content={"error": "Invalid message format – expected a list"},
                status_code=400,
            )

        # simulate result for now
        result = await investment_memo(messages)
        return result

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
