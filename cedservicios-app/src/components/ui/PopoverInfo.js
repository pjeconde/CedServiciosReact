import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover, Button } from 'react-bootstrap';


export const PopoverInfo = ({ boxElement, placement, title, body }) => {

    const [show, setShow] = useState(false);
    const buttonRef = useRef();
    const iRef = useRef();
    const popoverRef = useRef();
    const arrowRef = useRef();

    const { styles, attributes } = usePopper(
        boxElement === 'button' ? buttonRef.current : iRef.current,
        popoverRef.current,
        {
            placement: placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    }
                },
                {
                    name: 'arrow',
                    options: {
                        element: arrowRef.current,
                    }
                }
            ]
        });

    return (
        <div>
            {
                boxElement === 'button'
                    ?
                    (
                        <Button
                            ref={buttonRef}
                            onClick={() => setShow(!show)}
                            type="button"
                            variant="secondary">
                            <i className="fas fa-info-circle"></i>
                        </Button>
                    )
                    :
                    (
                        <div>
                            <i ref={iRef} className="fas fa-info-circle mx-1" onClick={() => setShow(!show)}></i>
                        </div>
                    )
            }
            <Popover
                ref={popoverRef}
                style={styles.popper}
                {...attributes}
                className={!show ? 'visually-hidden' : ''}>
                <div ref={arrowRef} data-popper-arrow></div>
                <Popover.Header as="h3" style={{ margin: '0' }} >{title}</Popover.Header>
                <Popover.Body>{body}</Popover.Body>
            </Popover>
        </div>
    );
}
