'use client';

import { Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BCGMatrixChart({ metrics }) {
    const competitors = metrics?.competitor_landscape?.competitors;

    if (!competitors?.length) {
        return <p>No BCG data available.</p>;
    }

    const parsePercent = (val) =>
        parseFloat(val?.replace("%", "") ?? "0");

    const data = {
        datasets: competitors.map((company, index) => {
            const share = parsePercent(company.market_share?.value);
            const growth = parsePercent(company.market_growth_rate?.value);

            return {
                label: company.name,
                data: [{
                    x: share,
                    y: growth,
                    r: 10
                }],
                backgroundColor: `rgba(${50 + index * 40}, 100, 255, 0.6)`,
                borderColor: `rgba(${50 + index * 40}, 100, 255, 1)`,
                borderWidth: 1
            };
        })
    };

    const bubbleLabelPlugin = {
        id: 'bubbleLabelPlugin-local',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            ctx.save();

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                if (!meta?.data) return;

                meta.data.forEach((point, index) => {
                    const label = dataset.label;
                    if (!label) return;

                    const { x, y } = point.tooltipPosition();
                    ctx.font = '12px Inter';
                    ctx.fillStyle = '#000';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(label, x, y);
                });
            });

            ctx.restore();
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 0
        },
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const comp = competitors[context.datasetIndex];
                        const share = parsePercent(comp.market_share?.value);
                        const growth = parsePercent(comp.market_growth_rate?.value);
                        return [
                            `📌 ${comp.name}`,
                            `Market Share: ${share.toFixed(1)}%`,
                            `Market Growth: ${growth.toFixed(1)}%`,
                            `Type: ${comp.type}`
                        ];
                    },
                    afterBody: (context) => {
                        const comp = competitors[context[0].datasetIndex];
                        const src = comp.market_share?.url ?? comp.market_growth_rate?.url;
                        return src ? [`🔗 Source: ${src}`] : [];
                    }
                }
            },
            bubbleLabelPlugin
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const comp = competitors[datasetIndex];
                const link = comp.market_share?.url ?? comp.market_growth_rate?.url;
                if (link) {
                    window.open(link, '_blank');
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Relative market share (%)' },
                min: 0,
                max: 100
            },
            y: {
                title: { display: true, text: 'Market growth (%)' },
                min: -10,
                max: 30
            }
        }
    };

    return (
        <div className="h-[300px]">
            <Bubble data={data} options={options} plugins={[bubbleLabelPlugin]} />
        </div>
    );
}
