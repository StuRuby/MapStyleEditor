import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import pkgJson from '../../../package.json';

// const MAP_VIEW_MODES = [
//     {
//         id: 'map',
//         title: 'Map'
//     },
//     {
//         id: 'inspect',
//         title: 'Inspect'
//     }
// ];

export default class Toolbar extends Component {
    render() {
        return (
            <div className='maputnik-toolbar'>
                <div className='maputnik-toolbar-logo-container'>
                    <a
                        href='https://github.com/StuRuby/MapBoxEditor'
                        target='_blank'
                        rel="noopener noreferrer"
                        className='maputnik-toolbar-logo'
                    >
                        <img src='./logo-color.svg' alt='KMap Editor' />
                        <h1>
                            <span className='maputnik-toolbar-name' >KMapEditor</span>
                            <span className='maputnik-toolbar-version' >v0.1</span>
                        </h1>
                    </a>
                </div>
            </div>
        );
    }
}
