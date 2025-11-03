'use client'
import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { useGetPortfolioOfUser, useAddInvestmentToPortfolio, useDeleteInvestmentFromPortfolio } from '../hooks/api'
import { useAuthStore } from '../stores/useAuthStore'

export default function PortfolioModal({ setPortfolioIsOpen }) {
    const { user } = useAuthStore()
    const { data: portfolio = [], isLoading, isError, error } = useGetPortfolioOfUser(user.id);
    const [selectedRows, setSelectedRows] = useState([])
    const [newEntry, setNewEntry] = useState({ company: '', capital: '', equity: '' })
    const addInvestment = useAddInvestmentToPortfolio();
    const deleteInvestment = useDeleteInvestmentFromPortfolio();

    const handleDelete = (index) => {
        selectedRows.forEach(index => {
            deleteInvestment.mutate({ userId: user.id, investmentIndex: index });
        });
        setSelectedRows([]); // UI Reset
    };

    const handleAdd = () => {
        const { company, capital, equity } = newEntry;

        if (!company || !capital || !equity) {
            console.warn("Bitte alle Felder ausfüllen.");
            return;
        }

        const capitalNum = parseFloat(capital);
        const equityNum = parseFloat(equity);

        if (isNaN(capitalNum) || isNaN(equityNum)) {
            console.warn("Capital und Equity müssen gültige Zahlen sein.");
            return;
        }

        // ✅ Sende Investment an Backend
        addInvestment.mutate({
            userId: user.id,
            investment: {
                company: company.trim(),
                capital: capitalNum,
                stake: equityNum,
            },
        });

        // Reset UI
        setNewEntry({ company: '', capital: '', equity: '' });
    };
    const columnHelper = createColumnHelper()

    const columns = useMemo(() => [
        {
            id: 'select',
            header: '',
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={selectedRows.includes(row.index)}
                    onChange={() =>
                        setSelectedRows((prev) =>
                            prev.includes(row.index)
                                ? prev.filter((i) => i !== row.index)
                                : [...prev, row.index]
                        )
                    }
                />
            ),
        },
        columnHelper.accessor('company', {
            header: 'Company',
            cell: info => <span className="font-medium text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor('capital', {
            header: 'Invested Capital',
            cell: info => {
                const value = info.getValue()
                return <span className="text-gray-700">${Number(value).toLocaleString()}</span>
            },
        }),
        columnHelper.accessor('stake', {
            header: 'Equity Stake',
            cell: info => {
                const value = info.getValue()
                return <span className="text-gray-700">{value}%</span>
            },
        }),
    ], [selectedRows])

    const table = useReactTable({
        data: portfolio,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-4xl z-50 flex flex-col gap-5">
                <h2 className="heading text-center">Your Portfolio</h2>
                <p className="text-center text-black text-sm">Easily track, add, or remove portfolio investments.</p>

                {isLoading && <p className="text-center text-sm text-gray-500">Loading...</p>}
                {isError && <p className="text-center text-sm text-red-500">Error: {error.message}</p>}

                {!isLoading && !isError && (
                    <div className="overflow-auto rounded-lg border border-border max-h-[300px]">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-black text-xs uppercase tracking-wider">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className="px-4 py-3 text-left border-b border-border">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className={selectedRows.includes(row.index) ? 'bg-blue-50' : ''}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-4 py-2 border-b border-border">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Optional: Eingabe für neue lokale Einträge (wird nicht gespeichert, aber fürs UI da) */}
                <div className="flex flex-col md:flex-row gap-2 text-sm">
                    <input
                        className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Company"
                        value={newEntry.company}
                        onChange={(e) => setNewEntry({ ...newEntry, company: e.target.value })}
                    />
                    <input
                        className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Capital (e.g. 500000)"
                        value={newEntry.capital}
                        onChange={(e) => setNewEntry({ ...newEntry, capital: e.target.value })}
                    />
                    <input
                        className="border border-border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Equity (e.g. 12)"
                        value={newEntry.equity}
                        onChange={(e) => setNewEntry({ ...newEntry, equity: e.target.value })}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </div>

                <div className="flex justify-between mt-2">
                    <button
                        onClick={handleDelete}
                        className="text-red-600 text-sm hover:underline disabled:opacity-50 cursor-pointer"
                        disabled={selectedRows.length === 0}
                    >
                        Delete Selected
                    </button>

                    <button
                        onClick={() => setPortfolioIsOpen(false)}
                        className="text-sm hover:underline cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}
