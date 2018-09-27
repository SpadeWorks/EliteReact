

import * as React from 'react';

interface HeaderBoxProps {
    type: string;
};
class HeaderBox extends React.Component<HeaderBoxProps> {
    constructor(props, context) {
        super(props, context);
    }

    getBox(type) {
        type = type.toLowerCase();
        switch (type) {
            case 'readytotest':
                return <div className='live_box green_slant'>
                    <div className='slant_box green_slant'>
                        <h5>Ready to test</h5>
                    </div>
                </div>
            case 'livenow':
                return <div className='live_box blue_slant'>
                    <div className='slant_box blue_slant'>
                        <h5>Live now</h5>
                    </div>
                </div>
            case 'waitingtotest':
                return <div className='live_box yellow_slant'>
                    <div className='slant_box yellow_slant'>
                        <h5>Waiting to test</h5>
                    </div>
                </div>
            case 'registernow':
                return <div className='live_box red_slant'>
                    <div className='slant_box red_slant'>
                        <h5>Register Now</h5>
                    </div>
                </div>
            case 'completeregistration':
                return <div className='live_box red_slant'>
                    <div className='slant_box red_slant' style={{width: '175px'}}>
                        <h5>Complete registration</h5>
                    </div>
                </div>
        }
    }
    render() {
        const { type } = this.props;
        return (<div className="row">
            {this.getBox(type)}
        </div>)
    }
}

export default HeaderBox;
