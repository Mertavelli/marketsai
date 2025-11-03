import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const CompetitorTable = ({ metrics }) => {
    const competitors = metrics?.competitors || [];

    const websiteTemplate = (row) => {
        const url = Array.isArray(row.website) ? row.website[0] : row.website;
        if (!url) return null;

        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-xs"
            >
                Open
            </a>
        );
    };


    return (
        <div className="w-full">
            <DataTable
                value={competitors.slice(0, 10)}
                className="text-xs"
                rowClassName={() => 'pt-1 pb-1'}
                tableStyle={{ minWidth: "100%", borderCollapse: "collapse" }}
            >
                <Column
                    field="name"
                    header="Name"
                    className="text-xs"
                    headerStyle={{ fontSize: '0.75rem', padding: '0.2rem' }}
                    style={{ padding: '0.2rem' }}
                />

                <Column
                    field="innovation"
                    header="Innovation"
                    className="text-xs"
                    headerStyle={{ fontSize: '0.75rem', padding: '0.2rem' }}
                    style={{ padding: '0.2rem' }}
                />

                <Column
                    field="market_power"
                    header="Market Power"
                    className="text-xs"
                    headerStyle={{ fontSize: '0.75rem', padding: '0.2rem' }}
                    style={{ padding: '0.2rem' }}
                />

                <Column
                    header="Website"
                    body={websiteTemplate}
                    className="text-xs"
                    headerStyle={{ fontSize: '0.75rem', padding: '0.2rem' }}
                    style={{ padding: '0.2rem' }}
                />
            </DataTable>


        </div>
    );
};

export default CompetitorTable;
