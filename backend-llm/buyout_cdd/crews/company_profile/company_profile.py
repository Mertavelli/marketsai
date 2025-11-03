from typing import List

from buyout_cdd.models.models import CompanyProfile
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class CompanyProfileCrew:
    """CompanyProfile crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config["researcher"],
            verbose=True,
            tool=[SerperDevTool()],
        )

    @task
    def extract_company_task(self) -> Task:
        return Task(
            config=self.tasks_config["extract_company_task"],
        )

    @task
    def get_company_profile_task(self) -> Task:
        return Task(
            config=self.tasks_config["get_company_profile_task"],
            output_pydantic=CompanyProfile,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the CompanyProfile crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
