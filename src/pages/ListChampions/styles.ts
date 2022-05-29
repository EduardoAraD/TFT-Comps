import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    .item {
      background-color: ${colors.background};
      display: flex;
      flex-direction: column;
      border-radius: 1rem;
      padding: 0.6rem;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        display: flex;
        border-bottom: 2px solid ${colors.primary};

        p {
          margin: 0.4rem;
          color: ${colors.text};
        }

        h4 {
          margin: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          color: ${colors.dourad};
        }
      }

      .sinergy {
        display: flex;
        flex-direction: column;

        div {
          display: flex;
          column-gap: 0.8rem;
          align-items: center;
          margin: 10px;

          p {
            margin: 0px;
            color: ${colors.text};
            font-size: 17px;
            font-weight: 600;
          }
        }
      }

      button {
        padding: 0.4rem;
        border: none;
        border-radius: 0.4rem;
        background-color: ${colors.red};
        transition: 0.2s;
        cursor: pointer;
        margin-top: 0.8rem;
        align-self: flex-end;
        display: flex;
        column-gap: 0.4rem;
        align-items: center;
        
        font-family: 'JetBrains Mono', monospace;
        font-size: 1rem;
        font-weight: 500;
        color: ${colors.white};
      }

      button:hover{
        background-color: ${colors.redHover};
      }
    }
  }
`;
