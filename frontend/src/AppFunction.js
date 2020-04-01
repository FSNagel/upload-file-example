import React, { useState } from 'react';

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

function App() {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  async function handleUpload(files) {
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

    console.log("listFiles", listFiles);

    await setUploadedFiles(uploadedFiles.concat(listFiles));

    console.log("uploadedFiles", uploadedFiles);

    listFiles.forEach(processUpload);

  }

  function processUpload(uploadedFile) {

    let data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {
      onUploadProgress: e => {

        let progress = parseInt(Math.round((e.loaded * 100) / e.total))

        updateFile(uploadedFile.id, {
          progress,
        })

      }
    });

  }

  function updateFile(id, data) {

    uploadedFiles.map(file => {
      return ((id === file.id) ? { ...file, ...data } : file);
    });

    console.log(uploadedFiles);

  }


  return (

    <Container>

      <GlobalStyle />

      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} />
        )}
      </Content>

    </Container>

  );
}

export default App;
