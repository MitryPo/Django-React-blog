import React from 'react'
import {Avatar, Chip} from '@material-ui/core'

export default function UserChip({...props}) {
    return (
        <div>
            <Chip 
            size='small'
            avatar={<Avatar></Avatar>} 
            label={props.author} 
            />
        </div>
    )
}
