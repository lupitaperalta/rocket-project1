import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table-6';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import styled from 'styled-components';

import 'react-table-6/react-table.css';


const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    console.log('ItemsList: props');
    console.log(this.props);
    // if (((this.props.itemData || {}).items || []).length) return;

    this.fetchAllItems();
  }

  fetchAllItems = () => {
    api
      .getAllItems()
      .then(resp => {
        debugger;
        const { items } = resp.data;
        console.log('getAllItems: resp');
        console.log(items);
        this.setState({ items });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllItems': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSingleItem = itemId => {
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

  handleRemoveItem = data => {
    const itemId = data;

    this.deleteSingleItem(itemId).then(resp => {
      console.log('handleRemoveItem: resp');
      console.log(resp);
      this.fetchAllItems();
    });
  };

  render() {
    const items = this.state.items || {};
    console.log(items);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-item-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Exam ID',
        accessor: 'examName',
        filterable: true,
        Cell: props => {
          return <span data-examName={props.original.examName}>{props.value}</span>;
        },
      },
      {
        Header: 'Patient ID',
        accessor: 'patientName',
        Cell: props => {
          return <span data-patientName={props.original.patientName}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: props => {
          return(
            
            <img
            style={{ height: '80px', width: '80px' }}
            src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${props.value}`}            
          /> 
          )
          //return <span data-image={props.original.image}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Key Findings',
        accessor: 'keyFindings',
        Cell: props => {
          return <span data-keyFindings={props.original.keyFindings}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Brixia Score',
        accessor: 'brixiaScore',
        filterable: true,
        Cell: props => {
          return <span data-brixiaScore={props.original.brixiaScore}>{props.value}</span>;
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/item/update/${props.original._id}`}>
              Update Item
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveItem} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        {(items || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={items}
            columns={columns}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No items to render!!! :(`
        )}
      </Wrapper>
    );
  }
}

export default ItemsList;