import React, { Component } from 'react';
//import { shared } from '../constants';
import api from '../api';

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

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

// const Fieldset = styled.fieldset.attrs({
//   className: 'form-control',
// })`
//   background-color: transparent;
//   border-color: transparent;
//   margin: 1em auto 0.5em;
//   max-width: 50%;
//   min-height: 6em;

//   @media screen and (max-width: 420px) {
//     height: auto;
//     max-width: 75%;
//   }
// `;

// const DayInput = styled.input.attrs({
//   className: '',
// })`
//   margin: 5px 5px 5px auto;
//   text-align: center;
// `;

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

class ItemInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
		examName: '',
		patientName: '',
		image: '',
		keyFindings: '',
		brixiaScore: '',
    };
  }

  handleChangeInputExamName = async event => {
    const examName = event.target.value;
    this.setState({ examName });
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

  insertSingleItem = item => {
    return api
      .insertItem(item)
      .then(resp => {
        console.log('insertItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('insertItem: newItem', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleInsertItem = event => {
    event.preventDefault();

    const { examName, patientName, image, keyFindings, brixiaScore } = this.state;
    const item = { examName, patientName, image, keyFindings, brixiaScore };

    this.insertSingleItem(item)
      .then(resp => {
        console.log('handleInsertItem: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Item inserted successfully');
          this.setState({
            examName: '',
            patientName: '',
            image: '',
            keyFindings: '',
            brixiaScore: 0,
          });
        } else {
          throw resp;
        }
      })
      .catch(err => {
        // TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the item... :(`);
        console.log('handleInsertItem: err');
        console.log(err);
      });
  };

  render() {
    const { examName, patientName, image, keyFindings, brixiaScore } = this.state;

    return (
      <Wrapper>
        <Title>Create Item</Title>

        <Label>Exam ID: </Label>
        <InputText type="text" value={examName} onChange={this.handleChangeInputExamName} />

        <Label>Patient ID: </Label>
        <InputText type="text" value={patientName} onChange={this.handleChangeInputPatientName} />

        <Label>Image: </Label>
        <InputText type="text" value={image} onChange={this.handleChangeInputImage} />

        <Label>Key Findings: </Label>
        <InputText type="text" value={keyFindings} onChange={this.handleChangeInputKeyFindings} />

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


        <Button onClick={this.handleInsertItem}>Add Item</Button>
        <CancelButton href={'/items'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default ItemInsert;
