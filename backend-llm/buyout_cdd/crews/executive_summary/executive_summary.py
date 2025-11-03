from typing import List

from buyout_cdd.models.models import ExecutiveSummary
from crewai import Agent, Crew, Process, Task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai.project import CrewBase, agent, crew, task


@CrewBase
class ExecutiveSummaryCrew:
    """ExecutiveSummary crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def executive_summary_agent(self) -> Agent:
        return Agent(config=self.agents_config["executive_summary_agent"], verbose=True)

    @task
    def generate_executive_summary_task(self) -> Task:
        return Task(
            config=self.tasks_config["generate_executive_summary_task"],
            output_pydantic=ExecutiveSummary,
        )

    @crew
    def crew(self) -> Crew:
        """Creates the ExecutiveSummary crew"""

        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
