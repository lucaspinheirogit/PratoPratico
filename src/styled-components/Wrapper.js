import styled from 'styled-components/native';

export const Wrapper = styled.View`
    flex: 1;
    width: 100%;
    background-color: #FFF;
`;

export const WrapperCenter = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
`;

export const ScrollWrapper = styled.ScrollView`
    flex: 1;
    width: 100%;
    background-color: #FFF;
`;

export const ScrollWrapperCenter = styled.ScrollView.attrs({
  contentContainerStyle: () => ({
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  })
})``;

// export const ScrollWrapperCenter = styled.ScrollView.attrs(() => (
//   {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF'
//   }))``;
