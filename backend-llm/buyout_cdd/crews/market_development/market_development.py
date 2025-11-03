from typing import List

from buyout_cdd.models.models import MarketDevelopmentAll
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class MarketDevelopmentCrew:
    """MarketDevelopment crew"""

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
    def get_market_development_task(self) -> Task:
        return Task(
            config=self.tasks_config["get_market_development_task"],
            output_pydantic=MarketDevelopmentAll,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MarketGrowth crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
