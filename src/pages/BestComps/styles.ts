import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  .body {
    max-width: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .option {
      display: flex;
      column-gap: 1rem;
      align-items: flex-end;

      .info {
        display: flex;
        column-gap: 1rem;
        flex: 1;
      }
      button {
        height: 3rem;
        background-color: ${colors.primary};
        border-radius: 0.4rem;
        border: none;
        justify-content: center;
        align-items: center;
        display: flex;
        transition: 0.2s;
        cursor: pointer;
        color: ${colors.white}
      }
      button:hover {
        background-color: ${colors.primaryHover};
      }
    }
  }
`;
