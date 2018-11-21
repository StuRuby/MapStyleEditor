import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// function App() {
//     return (
//         <div>
//             this is a Test
//         </div>
//     );
// }

const App = (props) => (
    <div>
        The count is {props.count}
        <button onClick={props.increment.bind(this, 10)}>点击+1</button>
    </div>
);

App.propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func
};

const mapState = (state) => ({
    count: state.count
});

const mapDispatch = ({ count: { increment } }) => ({
    increment: (num = 1) => increment(num)
});

export default connect(mapState, mapDispatch)(App);