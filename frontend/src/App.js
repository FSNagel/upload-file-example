import React, { Component } from 'react';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import Upload from './components/Upload'
import FileList from './components/FileList'

import GlobalStyle from './styles/global';
import {
  Container,
  Content
} from './styles'

class App extends Component {

  state = {
    uploadedFiles: []
  };

  async componentDidMount() {
    const response = await api.get('posts');

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        preview: file.url,
        readableSize: file.size,
        uploaded: true,
        url: file.url
      }))
    });
  }

  componentWillUnmount(){
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  handleUpload = (files) => {
    let listFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    })
    );

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(listFiles)
    });

    listFiles.forEach(this.processUpload);

  }

  processUpload = (uploadedFile) => {

    let data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {

      onUploadProgress: e => {

        let progress = parseInt(Math.round((e.loaded * 100) / e.total))

        this.updateFile(uploadedFile.id, {
          progress
        });

      }

    }).then((response) => {

      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url,
      });

    }).catch(() => {

      this.updateFile(uploadedFile.id, {
        error: true
      });

    });

  }

  updateFile = (id, data) => {

    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(file => {
        return id === file.id ? { ...file, ...data } : file;
      })
    });

  }

  handleDelete = async id => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  }


  render() {
    return (

      <Container>

        <GlobalStyle />

        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!this.state.uploadedFiles.length && (
            <FileList files={this.state.uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>

      </Container>
    )
  }
}

export default App;
