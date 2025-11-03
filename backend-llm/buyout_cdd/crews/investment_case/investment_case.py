from typing import List

from buyout_cdd.models.models import InvestmentCase
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class InvestmentCaseCrew:
    """InvestmentCase crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def strengths_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["strengths_agent"],
            verbose=True,
            tools=[SerperDevTool()],
        )

    @agent
    def opportunities_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["opportunities_agent"],
            verbose=True,
            tools=[SerperDevTool()],
        )

    @agent
    def summary_agent(self) -> Agent:
        return Agent(
            config=self.agents_config["summary_agent"],
        )

    @agent
    def consolidation_agent(self) -> Agent:
        return Agent(config=self.agents_config["consolidation_agent"])

    @task
    def strengths_task(self) -> Task:
        return Task(
            config=self.tasks_config["strengths_task"],
        )

    @task
    def opportunities_task(self) -> Task:
        return Task(
            config=self.tasks_config["opportunities_task"],
        )

    @task
    def summary_task(self) -> Task:
        return Task(
            config=self.tasks_config["summary_task"],
        )

    @task
    def consolidation_task(self) -> Task:
        return Task(
            config=self.tasks_config["consolidation_task"],
            output_pydantic=InvestmentCase,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the InvestmentCase crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
