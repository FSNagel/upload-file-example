import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import {
    Container,
    FileInfo,
    Preview
} from './styles';

export default function FileList(props) {
    return (
        <Container>
            {
                props.files.map(uploadedFile => (
                    <li key={uploadedFile.id}>

                        <FileInfo>

                            <Preview src={uploadedFile.preview || uploadedFile.url} />

                            <div>
                                <strong>{uploadedFile.name}</strong>
                                <span>
                                    {uploadedFile.readableSize}{" "}
                                    { !!uploadedFile.url && <button onClick={() => props.onDelete(uploadedFile.id)}>Excluir</button>}
                                </span>
                            </div>

                        </FileInfo>

                        <div>

                            {!uploadedFile.uploaded && !uploadedFile.error && (
                                <CircularProgressbar
                                    styles={{
                                        root: { width: 20 },
                                        path: { stroke: "#26B99A" }
                                    }}
                                    strokeWidth={10}
                                    value={uploadedFile.progress}
                                />
                            )
                            }

                            {
                                uploadedFile.url && (
                                    <a
                                        href={uploadedFile.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                                    </a>
                                )
                            }

                            {uploadedFile.uploaded && <MdCheckCircle size={24} color="#26B99A" />}
                            {uploadedFile.error && <MdError size={24} color="#E74C3C" />}

                        </div>

                    </li>
                ))
            }
        </Container>
    );
}
