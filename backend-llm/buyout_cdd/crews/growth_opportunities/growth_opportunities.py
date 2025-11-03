from typing import List

from buyout_cdd.models.models import MarketGrowthOpportunity
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class GrowthOpportunitiesCrew:
    """GrowthOpportunities crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config["researcher"],
            verbose=True,
            tools=[SerperDevTool()],
        )

    @task
    def get_market_growth_type_task(self) -> Task:
        return Task(
            config=self.tasks_config["get_market_growth_type_task"],
            output_pydantic=MarketGrowthOpportunity,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the GrowthOpportunities crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
