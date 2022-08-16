import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// IMAGE COMPONENTS
import ImageLogo from '../../assets/images/sharechatfake.png';

// STYLED COMPONENTS
import {
    Form,
    Input,
    Label,
    Title,
    Image,
    Checbox,
    Container,
    FormContainer,
    ImageContainer,
    TitleContainer,
    InputContainer,
    RememberContainer,
} from './styles.js';

export default function Auth(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    // const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    // const [checked, setChecked] = useState(false);

    /*================================================
        BLOCK: HOOK - USER INFO
    ==================================================*/
    // TODO: only do AUTH if 'remember me' is checked (stored in cookies/local)
    // TODO: Cookies

    useEffect(() => {
        console.log('---------- USE-EFFECT - User Info ----------');
        // Get current userID (and maybe name/team/color) from cookies
        // If ID is not present, auth page has failed to store cookie
        // let userID = this.getCookie('user-id')
        // this.set_user_ID( userID )
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onUserName = (e) => {
        console.log('===> onUserName');
        console.log('===> END - onUserName');
    };

    /*================================================*/

    // const onEmail = (e) => {
    //     console.log('===> onEmail');
    //     console.log('===> END - onEmail');
    // };

    /*================================================*/

    const onPassword = (e) => {
        console.log('===> onPassword');
        console.log('===> END - onPassword');
    };

    /*================================================*/

    const onRememberMe = (e) => {
        console.log('===> onRememberMe');
        console.log('===> END - onRememberMe');
    };

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <FormContainer>
                <ImageContainer>
                    <Image src={ImageLogo} alt='logo' />
                </ImageContainer>
                <TitleContainer>
                    <Title>Chattr</Title>
                </TitleContainer>
                <Form>
                    <InputContainer>
                        <Input type='text' onKeyUp={onUserName} placeholder='User name' />
                        <Input type='password' onKeyUp={onPassword} placeholder='Password' />
                        {/* <Input type='email' onKeyUp={onEmail} placeholder='Email' /> */}
                    </InputContainer>
                    <Link to='/room'>room</Link>
                    <Link to='/eeeeeeeee'>error</Link>
                    <RememberContainer>
                        <Checbox id='remember-me' type='checkbox' onClick={onRememberMe} />
                        <Label htmlFor='remember-me'>Remember me</Label>
                    </RememberContainer>
                </Form>
            </FormContainer>
        </Container>
    );
}
