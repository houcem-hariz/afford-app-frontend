import BsTable from 'react-bootstrap/Table'


function Table({ children, ...rest }) {
    return (
        <BsTable {...rest}>
            <tbody>
                {children}
            </tbody>
        </BsTable>
    )
}

export default Table;