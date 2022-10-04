import styled from 'styled-components';

const StyledLoader = styled.div`
  display: flex;
  align-self: center;
  border: 2.5px solid #f9f9f9; /* Light grey */
  border-top: 2.5px solid rgb(227, 144, 67);
  border-radius: 50%;
  width: 25px !important;
  height: 25px !important;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;
