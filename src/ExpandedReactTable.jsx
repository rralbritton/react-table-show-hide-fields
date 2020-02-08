import React from 'react'
import ReactTable from 'react-table';
import { Col, Row } from "react-bootstrap";
import 'react-table/react-table.css'

class ExpandedReactTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            columnList: []
        }
    }

    componentDidMount() {
        this.setColumns();
    }

    setColumns = () => {
        Object.keys(this.props.data[0]).map(key => {
            this.setState({ [key]: true });
            this.setState(prevState => ({
                columns: [...prevState.columns,
                {
                    Header: key,
                    accessor: key,
                    show: prevState[key]
                }],
                columnList: [...prevState.columnList, key]
            }))
        }
        )
    }

    /*Allows filters to be case insensitive*/
    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null) {
            return (
                row[id] !== undefined ?
                    String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) /*replace includes with startsWith() to search at the start of field*/
                    :
                    true
            );
        }
    };

    updateColumnShow = fieldName => {
        console.log(fieldName);
        this.setState(state => {
            const columns = state.columns.map(column => {

                if (column.Header === fieldName) {
                    column.show = !column.show;
                    return column
                } else {
                    return column;
                }
            });
            return { columns }
        })
    }

    render() {

        return (
            <React.Fragment>
                <h2>React Table</h2>
                <h3>Show/Hide Columns Example</h3>
                <br />
                <Row>
                    <Col md={2}>
                        <h5>Choose Columns</h5>
                        <ul>
                            {this.state.columnList.map(listItem => (
                                <li key={listItem}>
                                    <input key={listItem} className="form-check-input" type="checkbox" checked={this.state.listItem} name={listItem} onChange={() => this.updateColumnShow(listItem)} />
                                    {listItem}
                                </li>
                            )
                            )}
                        </ul>
                    </Col>
                    <Col md={10}>
                        <ReactTable
                            columns={this.state.columns}
                            data={this.props.data}
                            filterable
                            defaultFilterMethod={this.filterCaseInsensitive}
                            noDataText="No Data"
                            pageSize={this.props.data.length}
                            className="-striped -highlight"
                            sortable={false}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ExpandedReactTable;