import React, { useState } from 'react';
import { Button, Badge } from 'reactstrap';

class Menu extends React.Component
{
    render()
    {
        const menuHome = this.props;
        const notifCant = this.props;
        return( 
            <div>
                <Button color="primary">{this.props.menuHome}</Button>
                <Button color="danger">Danger!</Button>
                <Button color="primary" outline>
                    Notifications <Badge color="secondary">{this.props.notifCant}</Badge>
                </Button>
            </div>
        )
    }
}

export default Menu