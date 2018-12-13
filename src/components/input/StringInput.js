import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// export default function StringInput(props) {
//     const [value, setValue] = useState(props.value || '');
//     let tag;
//     let classNames;
//     if (props.multi) {
//         tag = 'textarea';
//         classNames = ['maputnik-string', 'maputnik-string--multi'];
//     } else {
//         tag = 'input';
//         classNames = ['maputnik-string'];
//     }
//     function handleOnchange() {
//         if (value !== props.value) {
//             props.onChange(value);
//         }
//     }

//     function test(params) {
//         console.log(params);
//     }

//     return React.createElement(tag, {
//         'data-wd-key': props['data-wd-key'],
//         spellCheck: !(tag === 'input'),
//         className: classNames.join(' '),
//         style: props.style,
//         value: props.value,
//         placeholder: props.default,
//         onChange: test,
//         onBlur: handleOnchange
//     });
// }

export default class StringInput extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            value: props.value || ''
        };
    }

    handleOnchange() {
        const { value } = this.state;
        if (value !== this.props.value) {
            this.props.onChange(value);
        }
    }

    render() {
        const props = this.props;
        let tag;
        let classNames;
        if (props.multi) {
            tag = 'textarea';
            classNames = ['maputnik-string', 'maputnik-string--multi'];
        } else {
            tag = 'input';
            classNames = ['maputnik-string'];
        }
        return React.createElement(tag, {
            'data-wd-key': props['data-wd-key'],
            spellCheck: !(tag === 'input'),
            className: classNames.join(' '),
            style: props.style,
            value: this.state.value,
            placeholder: props.default,
            onChange: e => this.setState({ value: e.target.value }),
            onBlur: this.handleOnchange
        });
    }
}

StringInput.propTypes = {
    'data-wd-key': PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    default: PropTypes.string,
    onChange: PropTypes.func,
    multi: PropTypes.bool,
};


