function Table({ columns, data }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.header}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => {
                                const value = row[col.accessor];
                                return (
                                    <td key={col.header}>
                                        {value}
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