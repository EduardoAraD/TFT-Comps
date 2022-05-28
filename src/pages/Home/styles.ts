import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #f1f1f1;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  flex: 1;

  div.content {
    max-width: 60rem;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;

    div.dados {
      background-color: #FFFFFF;
      border-radius: 10px;
      padding: 1.4rem;
      width: 100%;
      margin: 1rem;
    }
  }
`;
