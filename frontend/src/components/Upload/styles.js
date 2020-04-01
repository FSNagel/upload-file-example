import styled,  {css} from "styled-components";

const dragActive = css`
    border-color: #26B99A;
`;

const dragReject = css`
    border-color: #E74C3C;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed #DDD;
    border-radius: 5px;
    cursor: pointer;

    transition: height 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`;

const messageColors = {
    default: "#999",
    error: "#E74C3C",
    success: "#26B99A",
};

export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`