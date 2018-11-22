import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, StringInput } from '../input';

export default function CommentBlock(props) {
    return (
        <InputBlock
            label='comments'
            doc='Comments for the current layer. This is non-standard and not in the spec.'
            data-wd-key='layer-comment'
        >
            <StringInput
                multi={true}
                value={props.value}
                onChange={props.onChange}
                default='Comment...'
            />
        </InputBlock>
    );
}

CommentBlock.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};