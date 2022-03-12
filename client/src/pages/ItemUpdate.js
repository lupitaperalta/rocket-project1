import React, { Component } from 'react';
import api from '../api';
import { shared } from '../constants';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;
`;

const DayInput = styled.input.attrs({
  className: '',
})`
  margin: 5px auto;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      examName: '',
      patientName: '',
      image: '',
      keyFindings: '',
      brixiaScore: 0,
    };
  }

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.fetchSingleItem(itemId).then(resp => {
      const { item } = resp.data;
      this.setState({ ...item });
    });
  }

  fetchSingleItem = itemId => {
    return api
      .getItemById(itemId)
      .then(resp => {
        console.log('getItemById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleChangeInputExamName = async event => {
    const examName = event.target.value;
    this.setState({ examName });
  };

  updateSingleItem = item => {
    return api
      .updateItemById(item._id, item)
      .then(resp => {
        console.log('updateItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('newItem: ', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleChangeInputPatientName = async event => {
    const patientName = event.target.value;
    this.setState({ patientName });
  };
  handleChangeInputImage = async event => {
    const image = event.target.value;
    this.setState({ image });
  };
  handleChangeInputKeyFindings = async event => {
    const keyFindings = event.target.value;
    this.setState({ keyFindings });
  };

  handleChangeInputBrixiaScore = async event => {
    const brixiaScore = event.target.validity.valid ? event.target.value : this.state.brixiaScore;

    this.setState({ brixiaScore });
  };


  handleUpdateItem = event => {
    const { _id, examName, patientName, image, keyFindings, brixiaScore } = this.state;
    const item = { _id, examName, patientName, image, keyFindings, brixiaScore };

    return this.updateSingleItem(item)
      .then(resp => {
        console.log('handleUpdateItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item updated successfully');
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the item... :(`);
        console.error('handleUpdateItem: err');
        console.error(err);
      });
  };

  confirmUpdateItem = event => {
    if (window.confirm(`Are you sure you want to update this item? ${this.state._id}`)) {
      return this.handleUpdateItem(event);
    }
  };

  render() {
    const { _id, examName, patientName, image, keyFindings, brixiaScore } = this.state;


    return (
      _id && (
        <Wrapper>
          <Title>Create Item</Title>

          <Label>Exam ID: </Label>
          <InputText type="text" value={examName} onChange={this.handleChangeInputExamName} />

          <Label>Patient ID: </Label>
          <InputText type="text" value={patientName} onChange={this.handleChangeInputPatientName} />

          <Label>Image: </Label>
          <InputText type="text" value={image} onChange={this.handleChangeInputImage} />


          <Label>Key Findings: </Label>
          <InputText type="textarea" value={keyFindings} onChange={this.handleChangeInputKeyFindings} />

          <Label>Brixia Score: </Label>
          <InputText
            type="number"
            step="0.1"
            lang="en-US"
            min="0"
            max="1000"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={brixiaScore}
            onChange={this.handleChangeInputBrixiaScore}
          />

          <Button onClick={this.confirmUpdateItem}>Update Item</Button>
          <CancelButton href={'/items'}>Cancel</CancelButton>
        </Wrapper>
      )
    );
  }
}

export default ItemUpdate;
