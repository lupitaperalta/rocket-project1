import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import MaUTable from '@material-ui/core/Table';
import { CssBaseline, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-item-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: {},
    };
  }

  componentDidMount() {
    console.log('PatientList: props');
    console.log(this.props);

    this.fetchAllPatients();
  }

  fetchAllPatients = () => {
    //api
      //.getAllPatients()
    axios.get('http://localhost:3000/patients/patient')
      .then(resp => {
        const { patients } = resp.data;
        console.log('getAllPatients: resp');
        console.log(patients);
        this.setState({ patients });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllPatients': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSinglePatient = itemId => {
    return api
      .deleteItemById(itemId)
      .then(resp => {
        console.log('deleteItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemovePatients = data => {
    const itemId = data;

    //this.deleteSinglePatient(itemId)
    axios.delete(`http://localhost:3000/patients/patient/${itemId}`)
    .then(resp => {
        console.log('handleRemovePatient: resp');
        console.log(resp);
        this.fetchAllPatients();
    });
  };

  render() {
    const patients = this.state.patients || {};
    console.log(patients);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-patient-id={original._id}>{props.value}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'patientId',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-patientId={original.patientId}>{props.value}</span>;
        },
      },

      {
        Header: 'Age',
        accessor: 'age',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-age={original.age}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Sex',
        accessor: 'sex',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-sex={original.sex}>{props.value}</span>;
        },
      },
      {
        Header: 'Race',
        accessor: 'race',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-race={original.race}>{props.value}</span>;
        },
      },
      {
        Header: 'Zip Code',
        accessor: 'zip',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-zip={original.zip}>{props.value}</span>;
        },
      },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/patient/update/${original._id}`}>
              Update
            </Link>
          );
        },
      },
      {
        Header: 'Delete',
        accessor: '_delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (
            <span data-delete-id={original._id}>
              <DeleteButton id={original._id} onDelete={this.handleRemovePatients} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(patients || []).length > 0 ? (
          <Table data={patients} columns={columns} />
        ) : (
          `No patients to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default PatientsList;
