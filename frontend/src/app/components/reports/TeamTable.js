import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const TeamTable = ({ metrics, setMetrics }) => {
    const team = metrics?.management_team?.team || [];

    const linkedinTemplate = (row) => {
        if (!row.linkedin) return null;
        return (
            <a
                href={row.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm"
            >
                LinkedIn
            </a>
        );
    };

    return (
        <div className="w-full text-sm"> {/* ⬅️ globale Fontgröße */}
            <DataTable
                value={team}
                rowClassName={() => 'pt-1 pb-1'}
                tableStyle={{ minWidth: "100%", borderCollapse: "collapse" }}
            >
                <Column
                    field="name"
                    header="Name"
                    headerStyle={{ fontSize: '0.875rem', padding: '0.5rem' }}
                    style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                />
                <Column
                    field="position"
                    header="Position"
                    headerStyle={{ fontSize: '0.875rem', padding: '0.5rem' }}
                    style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                />
                {/* <Column
                    header="LinkedIn"
                    body={linkedinTemplate}
                    headerStyle={{ fontSize: '0.875rem', padding: '0.5rem' }}
                    style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                /> */}
            </DataTable>
        </div>
    );
};

export default TeamTable;
