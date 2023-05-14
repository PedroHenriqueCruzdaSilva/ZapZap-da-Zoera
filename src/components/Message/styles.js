import styled from "styled-components";

export const Container = styled.div``;

export const Line = styled.div`
  margin: 10px;
  display: flex;
  &.me {
    > div {
      background-color: #005c4b;
    }
    justify-content: right;
  }
`;

export const Content = styled.div`
  background-color: #202c33;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  margin-left: 8px;
  max-width: 80%;
`;

export const Message = styled.span`
  font-size: 16px;
  margin: 5px 40px 5px 5px;
`;

export const MessageDate = styled.span`
  font-size: 10px;
  color: #a5aaad;
  text-align: right;
  height: 15px;
  margin: -5px 5px 0;
`;