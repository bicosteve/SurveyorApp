import React from 'react';

const Landing = () => {
    return (
        <div className='container' style={{ marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <div className='row'>
                    <div className='col s12 m4'>
                        <div className='card-panel'>
                            <i className='material-icons medium white-text blue-grey darken-3'>
                                assessment
                            </i>
                            <h4>Know Your Customers</h4>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                    </div>
                    <div className='col s12 m4'>
                        <div className='card-panel'>
                            <i className='material-icons medium white-text blue-grey darken-3'>
                                assistant
                            </i>
                            <h4>Assistant Insights</h4>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                    </div>
                    <div className='col s12 m4'>
                        <div className='card-panel'>
                            <i className='material-icons medium white-text blue-grey darken-3'>
                                credit_card
                            </i>
                            <h4>Work Within Budget</h4>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
