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

class ExamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: {},
    };
  }

  componentDidMount() {
    console.log('ExamList: props');
    console.log(this.props);

    this.fetchAllExams();
  }

  fetchAllExams = () => {
    //api
      //.getAllPatients()
    axios.get('http://localhost:3000/exams/exams')
        .then(resp => {
            const { exams } = resp.data;
            console.log('getAllExams: resp');
            console.log(exams);
            this.setState({ exams });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllExams': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleExam = itemId => {
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

  handleRemoveExams = data => {
    const itemId = data;

    //this.deleteSinglePatient(itemId)
    axios.delete(`http://localhost:3000/exams/exam/${itemId}`)
    .then(resp => {
        console.log('handleRemoveExam: resp');
        console.log(resp);
        this.fetchAllExams();
    });
  };

  render() {
    const exams = this.state.exams || {};
    console.log(exams);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        // filterable: true,
        Cell: props => {
          console.log(props);
          const { original } = props.cell.row;
          return <span data-exam-id={original._id}>{props.value}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'exam_id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-exam_id={original.exam_id}>{props.value}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'patient_id',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-patient_id={original.patient_id}>{props.value}</span>;
        },
      },

      {
        Header: 'Image',
        accessor: 'image',
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-image={original.image}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'key_findings',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-key_findings={original.key_findings}>{props.value}</span>;
        },
      },
      {
        Header: 'Brixia Score',
        accessor: 'brexia_score',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-brexia_score={original.brexia_score}>{props.value}</span>;
        },
      },
      {
        Header: 'Update',
        accessor: '_update',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <Link data-update-id={original._id} to={`/exam/update/${original._id}`}>
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
              <DeleteButton id={original._id} onDelete={this.handleRemoveExams} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(exams || []).length > 0 ? (
          <Table data={exams} columns={columns} />
        ) : (
          `No Exams to render... :(`
        )}
      </Wrapper>
    );
  }
}

export default ExamsList;
