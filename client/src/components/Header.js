import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/header.css';

import Stripe from './Stripe';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;

            case false:
                return [
                    <li key='1'>
                        <a href='/auth/google'>
                            <i className='fa fa-google-plus-official fa-2x'></i>
                        </a>
                    </li>,
                    <li key='2'>
                        <a href='/auth/facebook'>
                            <i className='fab fa-facebook fa-2x'></i>
                        </a>
                    </li>,
                ];

            default:
                return [
                    <li key='1'>
                        <Stripe />
                    </li>,
                    <li key='2'>
                        <Link to='/surveys'>
                            <i className='fa fa-plus'></i>
                        </Link>
                    </li>,
                    <li key='3' style={{ margin: '0 7px' }}>
                        Bal - [{this.props.auth.credits}]
                    </li>,
                    <li key='4'>
                        <a href='/api/logout'>
                            <i className='fa fa-sign-out'></i>
                        </a>
                    </li>,
                ];
        }
    }

    render() {
        return (
            <nav className='nav-header blue-grey darken-3'>
                <div className='container '>
                    <div className='nav-wrapper'>
                        <Link
                            to={this.props.auth ? '/surveys' : '/'}
                            className='left brand-logo'>
                            Surveyor!
                        </Link>
                        <ul className='right'>{this.renderContent()}</ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
