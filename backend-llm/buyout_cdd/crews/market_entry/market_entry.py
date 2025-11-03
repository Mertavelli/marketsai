from typing import List

from buyout_cdd.models.models import MarketEntryAssessment
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class MarketEntryCrew:
    """MarketEntry crew"""

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
    def market_entry_assessment_task(self) -> Task:
        return Task(
            config=self.tasks_config["market_entry_assessment_task"],
            output_pydantic=MarketEntryAssessment,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the MarketEntry crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
