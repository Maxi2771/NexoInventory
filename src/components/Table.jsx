import StockIndicator from "./StockIndicator";
import Trash from "../assets/img/icons/Trash";
import Edit from "../assets/img/icons/Edit";

function Table({ columns, data, onDelete, onEdit, userRole }) {
    return (
        <div className="bg-slate-800 rounded-lg overflow-x-auto border border-slate-700 w-300">
            <table className="w-full min-w-max text-sm text-left text-gray-300">
                <thead className="bg-slate-900 text-xs text-slate-400 uppercase">
                    <tr>
                        {columns.map((col) => (
                            <th scope="col" className="px-6 py-4 font-medium tracking-wider" key={col.header}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr className="border-b border-slate-700 hover:bg-slate-700/50" key={row.id}>
                            {columns.map((col) => {
                                const value = row[col.accessor];
                                return (
                                    <td className="px-6 py-4 whitespace-nowrap" key={`${row.id}-${col.accessor}`}>
                                        {col.accessor === 'actions' ? (
                                            userRole === 1 && (
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => onEdit(row)} className="text-slate-400 hover:text-white transition-colors">
                                                        <Edit />
                                                    </button>
                                                    <button onClick={() => onDelete(row)} className="text-slate-400 hover:text-white transition-colors">
                                                        <Trash />
                                                    </button>
                                                </div>
                                            )
                                        ) : col.accessor === 'stock' ? (
                                            <StockIndicator amount={value} />
                                        ) : (
                                            value
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;