import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    width: 250px;
    height: 372px;
    z-index: 1000;
    display: flex;
    flex-flow: column nowrap;
    background: #333;
`;
/*======================================*/
/*======================================*/
export const Info = styled.div`
    width: auto;
    white-space: nowrap;
`;
/*======================================*/
/*======================================*/
export const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
`;
/*======================================*/
/*======================================*/
export const ListItem = styled.li`
    margin-top: 6px;
    color: #ff3333;
`;
/*======================================*/
/*======================================*/
export const Title = styled.span`
    font-weight: 800;
    border: 2px solid black;
    padding: 0px 2px;
    background: black;
    color: white;
`;
/*======================================*/
/*======================================*/
export const Tools = styled.div`
    display: flex;
    flex-flow: column nowrap;

    & button {
        color: #eee;
        background: #333;

        &:hover {
            color: #333;
            background: #eee;
        }
    }
`;
/*======================================*/
/*======================================*/
