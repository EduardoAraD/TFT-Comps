import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 1rem;
    font-weight: 400;
    color: #232323;
  }

  input {
    background-color: transparent;
    border: 2px solid #c6c6c6;
    padding: 10px 5px;
    flex: 1;
    border-radius: 10px;
  }
`;
