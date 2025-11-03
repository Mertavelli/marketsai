from typing import List

from buyout_cdd.models.models import KeyDrivers
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool


@CrewBase
class KeyDriversCrew:
    """KeyDrivers crew"""

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
    def get_key_drivers_task(self) -> Task:
        return Task(
            config=self.tasks_config["get_key_drivers_task"],
            output_pydantic=KeyDrivers,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the KeyDrivers crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
