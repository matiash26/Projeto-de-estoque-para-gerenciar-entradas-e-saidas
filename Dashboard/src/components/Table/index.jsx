import "./style.css"
function Table({ th, children }) {
    return (
        <table>
            <thead>
                <tr>
                    {th.map((column, x) => <th key={x}>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
export default Table