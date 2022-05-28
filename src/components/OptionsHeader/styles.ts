import styled from "styled-components";

export const Container = styled.div`
  width: 30rem;
  display: flex;
  justify-content: space-around;

  button {
    background: none;
    cursor: pointer;
    border-color: transparent;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    border-bottom-width: 2px;
    display: flex;
    transition: 0.3s;
    font-weight: 500;
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    padding: 6px;
  }
  
  button.select {
    font-size: 1.1rem;
    border-color: #232323;
  }

  button:hover {
    font-size: 1.2rem;
    border-color: #232323;
  }

`;
