import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    flex-flow: column nowrap;
`;
/*======================================*/
/*======================================*/
export const DevInfo = styled.div`
    width: auto;
    white-space: nowrap;
`;
/*======================================*/
/*======================================*/
export const DevList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
`;
/*======================================*/
/*======================================*/
export const DevListItem = styled.li`
    margin-top: 6px;
    color: #ff3333;
`;
/*======================================*/
/*======================================*/
export const DevTitle = styled.span`
    font-weight: 800;
    border: 2px solid black;
    padding: 0px 2px;
    background: black;
    color: white;
`;
/*======================================*/
/*======================================*/
export const DevTools = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;
/*======================================*/
/*======================================*/
