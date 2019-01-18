import React from 'react';

export default function EditorLogo() {
    return (
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
                    <span className='maputnik-toolbar-version' >v0.2</span>
                </h1>
            </a>
        </div>
    );
}