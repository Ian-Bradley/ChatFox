import { sizes, transition, FLEX_CENTER_COL, FLEX_CENTER_ROW } from 'Styles/common.js';
import styled from 'styled-components';
import React from 'react';

import IconButton from 'Shared/Buttons/IconButton.jsx';
import RightSVG from 'Assets/icons/right.svg.js';
import LeftSVG from 'Assets/icons/left.svg.js';
import DownSVG from 'Assets/icons/down.svg.js';
import UpSVG from 'Assets/icons/up.svg.js';

/**
 * @props onBorderGrow (Function) Can't spell FUNction without FUN
 * @props onLogoSwap (Function) Can't spell FUNction without FUN
 */

export default function Fun(props) {
    return (
        <>
            <ContainerLeft>
                <IconButton onClick={props.onBorderGrow} data={'grow'} icon={UpSVG} />
                <IconButton onClick={props.onBorderGrow} data={'shrink'} icon={DownSVG} />
            </ContainerLeft>
            <ContainerRight>
                <IconButton onClick={props.onLogoSwap} data={'left'} icon={LeftSVG} />
                <IconButton onClick={props.onLogoSwap} data={'right'} icon={RightSVG} />
            </ContainerRight>
        </>
    );
}

const Container = styled.div`
    position: absolute;
    top: ${sizes.spacing.app};
    opacity: 0.09;
    transition: opacity linear ${transition.fade};
    &:hover {
        opacity: 1;
    }
`;

const ContainerLeft = styled(Container)`
    left: ${sizes.spacing.app};
    ${FLEX_CENTER_COL}
`;

const ContainerRight = styled(Container)`
    right: ${sizes.spacing.app};
    ${FLEX_CENTER_ROW}
`;
