import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    row-gap: 1rem;

    .double {
      display: flex;
      width: 100%;
      column-gap: 1rem;
    }

    .option {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 1rem;

      div {
        flex: 1;
      }
      button {
        height: 3rem;
        width: 3rem;
        background-color: ${colors.green};
        border-radius: 0.4rem;
        border: none;
        justify-content: center;
        align-items: center;
        display: flex;
        transition: 0.2s;
        cursor: pointer;

        svg {
          color: ${colors.white};
          font-size: 2rem;
        }
      }
      button:hover {
        background-color: ${colors.greenHover};
      }
    }

    div.scale {
      width: 100%;
      background-color: ${colors.background};
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem;
        column-gap: 0.8rem;

        .pos {
          margin: 0px;
          color: ${colors.primary};
        }
        .desc{
          flex: 1;
          margin: 0px;
          color: ${colors.text};
        }

        button {
          height: 2rem;
          width: 2rem;
          background-color: ${colors.red};
          border-radius: 0.4rem;
          border: none;
          justify-content: center;
          align-items: center;
          display: flex;
          transition: 0.2s;
          cursor: pointer;

          svg {
            color: ${colors.white};
            font-size: 1.2rem;
          }
        }
        button:hover {
          background-color: ${colors.redHover};
        }
      }
    }
  }
`;
