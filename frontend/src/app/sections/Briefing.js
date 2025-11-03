import { BsStars } from "react-icons/bs";
import LoadingDots from "../components/LoadingDots";

export default function Briefing({ }) {
    return (
        <div className="flex flex-col h-full">
            <h2 className="sub-heading">Your Briefing</h2>

            <div className="card flex-grow">
                <div className="flex items-center gap-2 mb-2.5">
                    <BsStars size={25} className="text-accent" />
                    <div className="flex items-center gap-2">
                        <h1 className="heading">AI monitoring for insights</h1>
                        <LoadingDots />
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-semibold text-black mb-1">Portfolio Insight</h3>
                        <ul className="list-disc pl-5 text-sm space-y-2 leading-6">
                            <li>
                                Novex featured in Gartner’s <i>AI Infrastructure Outlook</i> as a key player in the enterprise tooling landscape.
                            </li>
                            <li>
                                Strategic partnership with NVIDIA cited as catalyst for upcoming growth phase.
                            </li>
                            <li>
                                Expansion into US mid-market forecasted for Q4.
                                <a href="https://example.com/gartner-ai-report" target="_blank" rel="noopener noreferrer" className="text-accent ml-1">[source]</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-black mb-1">Dealflow Signal</h3>
                        <ul className="list-disc pl-5 text-sm space-y-2 leading-6">
                            <li>
                                Solara Analytics under evaluation by two Berlin-based mid-sized VC firms.
                            </li>
                            <li>
                                Competitor interest indicates increased deal momentum in climate intelligence.
                            </li>
                            <li>
                                Suggested action: reassess timeline for initial contact or LOI.
                                <a href="https://example.com/dealflow-intel" target="_blank" rel="noopener noreferrer" className="text-accent ml-1">[source]</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-black mb-1">Market Movement</h3>
                        <ul className="list-disc pl-5 text-sm space-y-2 leading-6">
                            <li>
                                Climate tech funding surged +22% WoW to $2.8B globally (source: PitchBook).
                            </li>
                            <li>
                                Top performing sub-sectors: energy infrastructure and green mobility.
                            </li>
                            <li>
                                Notable round: VoltGrid raised $190M Series C led by Energy Impact Partners.
                                <a href="https://example.com/climate-funding" target="_blank" rel="noopener noreferrer" className="text-accent ml-1">[source]</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}