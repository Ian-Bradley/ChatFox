import React from 'react'
import './User.scss'

/**
 * @props user (Object)
    id: (Number)
    name: (String)
    nickname: (String)
    color: (String [HEX])
 * @props clickName (Function) Clicking on a user name
 */

export default function Message ( props )
{
    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onClickName = e =>
    {
        console.log('===> onClickName')
        props.clickName(e)
        console.log('===> END - onClickName')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    
    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/
    
    return (
        <main className='container-user'>
            <div className='user'>
                <span className={'user-name'} style={{color: props.user.color}} onClick={onClickName}>
                    {props.user.nickname}
                </span>
            </div>
        </main>
    )
}