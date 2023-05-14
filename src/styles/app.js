import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #222e35;
  color: white;
  width: 100%;
  height: 100vh;
  .esperando {
    align-self: center;
    margin-left: 30%;
  }
  @media screen and (max-width: 1280px) {
	.esperando {
		margin-left: 25%;
	}
}
`;