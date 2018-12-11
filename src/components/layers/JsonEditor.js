import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import InputBlock from '../input/InputBlock';
import StringInput from '../input/StringInput';
import jsonlint from 'jsonlint';

// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/lint/lint';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/addon/lint/lint.css';
// import '../../styles/codemirror-maputnik.css';


export default class JSONEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: JSON.stringify(props.layer, null, 2)
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            code: JSON.stringify(props.layer, null, 2)
        };
    }

    onCodeUpdate(newCode) {
        try {
            const _layers = JSON.parse(newCode);
            this.props.onLayerChanged(_layers);
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({
                code: newCode
            });
        }
    }

    resetValue() {
        this.setState({
            code: JSON.stringify(this.props.layer, null, 2)
        });
    }

    render() {
        const options = {
            mode: { name: 'javascript', json: true },
            tabSize: 2,
            theme: 'maputnik',
            viewportMargin: Infinity,
            lineNumbers: true,
            lint: true,
            gutters: ['CodeMirror-lint-markers'],
            scrollbarStyle: 'null',
        };
        return (
            <CodeMirror
                value={this.state.code}
                options={options}
                onBeforeChange={(editor, data, value) => this.onCodeUpdate(value)}
                onFocusChange={focused => focused ? true : this.resetValue()}
            />
        );
    }
}

JSONEditor.propTypes = {
    layer: PropTypes.object.isRequired,
    onLayerChanged: PropTypes.func
};