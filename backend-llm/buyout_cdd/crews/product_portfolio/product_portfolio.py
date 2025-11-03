from typing import List

from buyout_cdd.models.models import ProductPortfolio
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class ProductPortfolioCrew:
    """ProductPortfolio crew"""

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
    def get_product_portfolio_task(self) -> Task:
        return Task(
            config=self.tasks_config["get_product_portfolio_task"],
            output_pydantic=ProductPortfolio,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the ProductPortfolio crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
