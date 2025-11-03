import { startups } from "../mockData"

export default function RecommendedStartups() {
    const latestStartups = startups.slice(-3);

    return (
        <div>
            <h2 className="sub-heading">Recommended Startups</h2>

            <div className="grid grid-cols-3 gap-4">
                {latestStartups.map((startup, index) => (
                    <div key={index} className="border border-border p-4 rounded-md bg-secondary">
                        <div className="flex gap-2">
                            <div className="border border-border rounded-md overflow-hidden">
                                <img src={startup.logo} className="w-15 h-15" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-black">{startup.companyName}</h3>
                                <div className="flex gap-1">
                                    {startup.industries.map((industry, j) => (
                                        <p key={j} className="badge">{industry}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p>{startup.employees} Employees</p>
                            <button className="font-medium text-sm transition-all p-1.5 rounded-md flex justify-between items-center gap-2 bg-accent hover:bg-accent/90 cursor-pointer text-white">View</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>

    )
}
