/*================================================
    ANCHOR: TRACKING CLASS
==================================================*/

export default class DataTracker
{
    constructor()
    {
        this.state = {
            // TODO: convert to MongoDB
            log: [],
            users: [],
            messages: [],
            channels: [],
        }

        /*======================================*/
        /*======================================*/

        // State methods - Users
        this.addUser    = this.addUser.bind(this)
        this.removeUser = this.removeUser.bind(this)

        // State methods - User Info
        this.setUserName     = this.setUserName.bind(this)
        this.setUserNickname = this.setUserNickname.bind(this)
        this.setUserColor    = this.setUserColor.bind(this)

        // State methods - Channels
        this.addChannel         = this.addChannel.bind(this)
        this.deleteChannel      = this.deleteChannel.bind(this)
        this.setChannelName     = this.setChannelName.bind(this)
        this.setChannelPublic   = this.setChannelPublic.bind(this)
        this.setChannelPrivate  = this.setChannelPrivate.bind(this)
        this.setChannelPassword = this.setChannelPassword.bind(this)

        // State methods - Messages
        this.addMessage = this.addMessage.bind(this)

        // State methods - Dev Log
        this.addLogItem = this.addLogItem.bind(this)
    }

    /*================================================
        ANCHOR: STATE METHODS - Users
    ==================================================*/

    addUser ( user )
    {
        this.state.users.push( user )
    }

    /*======================================*/
    /*======================================*/

    removeUser ( userID )
    {
        console.log('userID: ', userID)
        console.log('typeof userID: ', typeof userID)
        console.log('FIND USER: ', this.state.users.find( user => ( user.id === userID ) ))
        if ( this.state.users.find( user => ( user.id === userID ) ) )
        {
            // User exists in array
            console.log('User exists in array')
            console.log('this.state.users: ', this.state.users)
            this.state.users = this.state.users.filter( user => ( user.id !== userID ) )
            console.log('this.state.users: ', this.state.users)
        }
        else
        {
            // No user!!
            console.log('No user!!')
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - User Info
    ==================================================*/

    setUserName ( user, newName )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].name = newName
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setUserNickname ( user, newNickname )
    {
        for ( let i = 0; i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].nickname = newNickname
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setUserColor ( user, newColor )
    {
        for ( let i = 0 ;i < this.state.users.length; i++ )
        {
            if ( this.state.users[i].id === user.id )
            {
                this.state.users[i].color = newColor
            }
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - Channels
    ==================================================*/

    addChannel ( channel )
    {
        this.state.channels.push( channel )
    }

    /*======================================*/
    /*======================================*/

    deleteChannel ( channelID )
    {
        console.log('channelID: ', channelID)
        console.log('typeof channelID: ', typeof channelID)
        console.log('FIND CHANNEL: ', this.state.channels.find( channel => ( channel.id === channelID ) ))
        if ( this.state.channels.find( user => ( user.id === channelID ) ) )
        {
            console.log('Channel exists in array')
            console.log('this.state.channels: ', this.state.channels)
            this.state.channels = this.state.channels.filter( channel => ( channel.id !== channelID ) )
            console.log('this.state.channels: ', this.state.channels)
        }
        else
        {
            console.log('No channel!!')
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelName ( channel, name )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].nickname = name
            }
        }
    }
    
    /*======================================*/
    /*======================================*/

    setChannelPublic ( channel )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].locked = false
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelPrivate ( channel )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].locked = true
            }
        }
    }

    /*======================================*/
    /*======================================*/

    setChannelPassword ( channel, password )
    {
        for ( let i = 0; i < this.state.channels.length; i++ )
        {
            if ( this.state.channels[i].id === channel.id )
            {
                this.state.channels[i].password = password
            }
        }
    }

    /*================================================
        ANCHOR: STATE METHODS - Messages
    ==================================================*/

    addMessage ( message )
    {
        this.state.messages.push( message )
    }

    /*================================================
        ANCHOR: STATE METHODS - Dev Log
    ==================================================*/

    addLogItem ( logItem )
    {
        this.state.log.push( logItem )
    }
}