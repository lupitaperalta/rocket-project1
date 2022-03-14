import React, { Component } from 'react';
import axios from 'axios';

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

export default class CreateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam_id: '',
            patient_id: '',
            image: '',
            key_findings: '',
            brexia_score: '',

            patientId: '',
            age: 0,
            sex: '',
            race: '',
            zip: 0,
    };
  }

  // name is string
  handleChangeInputExamId = async event => {
    const exam_id = event.target.value;
    this.setState({ exam_id });
  };
  handleChangeInputPid = async event => {
    const patient_id = event.target.value;
    this.setState({ patient_id });
  };
  handleChangeInputImage = async event => {
    const image = event.target.value;
    this.setState({ image });
  };
  handleChangeInputKeyFindings = async event => {
    const key_findings = event.target.value;
    this.setState({ key_findings });
  };
  handleChangeInputBrexiaScore = async event => {
    const brexia_score = event.target.value;
    this.setState({ brexia_score });
  };

  handleChangeInputPatientId = async event => {
    const patientId = event.target.value;
    this.setState({ patientId });
  };

  handleChangeInputAge = async event => {
    const age = event.target.validity.valid ? event.target.value : this.state.age;
    this.setState({ age });
  };
  handleChangeInputRace = async event => {
    const race = event.target.value;
    this.setState({ race });
  };

  handleChangeInputSex = async event => {
    const sex = event.target.value;
    this.setState({ sex });
  };

  handleChangeInputZip = async event => {
    const zip = event.target.validity.valid ? event.target.value : this.state.zip;

    this.setState({ zip });
  };


  handleInsertExam = event => {
    event.preventDefault();

    const { exam_id, patient_id, image, key_findings, brexia_score } = this.state;
    const exam = { exam_id, patient_id, image, key_findings, brexia_score };

    const { patientId, age, sex, race, zip } = this.state;
    const patient = { patientId, age, sex, race, zip };
    axios.post('http://localhost:3000/exams/exam', exam)
      .then(resp => {
          console.log('handleInsertExam: resp');
          console.log(resp);
          if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
              window.alert('Exam inserted successfully');
              this.setState({
                  exam_id: '',
                  patient_id: '',
                  image: '',
                  key_findings: '',
                  brexia_score: 0,
                });
            } else {
            throw resp;
            }
        })
      .catch(err => {
        //TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the Exam... :(`);
        console.log('handleInsertExam: err');
        console.log(err);
      });

    
    
    axios.post('http://localhost:3000/patients/patient', patient)
      .then(resp => {
          console.log('handleInsertPatient: resp');
          console.log(resp);
          if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
              window.alert('Patient inserted successfully');
              this.setState({
                  patientId: '',
                  age: 0,
                  sex: '',
                  race: '',
                  zip: 0,
                });
            } else {
            throw resp;
            }
        })
      .catch(err => {
        //TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the patient... :(`);
        console.log('handleInsertPatient: err');
        console.log(err);
      }); 
  };

  render() {
    const { exam_id, patient_id, image, key_findings, brexia_score } = this.state;
    const { patientId, age, sex, race, zip } = this.state;

    return (
      <Wrapper>  
      
        <Title>Create Exam</Title>

        <Label>Exam Id: </Label>
        <InputText type="text" value={exam_id} onChange={this.handleChangeInputExamId} />

        <Label>Patient Id: </Label>
        <InputText type="text" value={patient_id} onChange={this.handleChangeInputPid} />

        <Label>Image: </Label>
        <InputText type="text" value={image} onChange={this.handleChangeInputImage} />

        <Label>Key Findings: </Label>
        <InputText type="text" value={key_findings} onChange={this.handleChangeInputKeyFindings} />

        <Label>Brixia Score: </Label>
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={brexia_score}
          onChange={this.handleChangeInputBrexiaScore}
        />
        <Title>Create Patient</Title>
        <Label>Patient Id: </Label>
        <InputText type="text" value={patientId} onChange={this.handleChangeInputPatientId} />

        <Label>Age: </Label>
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={age}
          onChange={this.handleChangeInputAge}
        />
        <Label>Sex: </Label>
        <InputText type="text" value={sex} onChange={this.handleChangeInputSex} />

        <Label>Race: </Label>
        <InputText type="text" value={race} onChange={this.handleChangeInputRace} />

        <Label>Zip Code: </Label>
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="1000"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={zip}
          onChange={this.handleChangeInputZip}
        />


        <Button onClick={this.handleInsertExam}>Add Exam</Button>
        <CancelButton href={'/'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}