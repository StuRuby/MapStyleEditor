import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import DocLabel from '../fields/DocLabel';
import SelectInput from '../input/SelectInput';
import SingleFilterEditor from './SingleFilterEditor';
import FilterEditorBlock from './FilterEditorBlock';
import Button from '../Button';
import { combiningFilterOps } from '../../libs/filterops';
import { latest } from '@mapbox/mapbox-gl-style-spec';


function hasCombiningFilter(filter) {
    return combiningFilterOps.indexOf(filter[0]) >= 0;
}

function hasNestedCombiningFilter(filter) {
    if (hasCombiningFilter(filter)) {
        const combinedFilters = filter.slice(1);
        return filter.slice(1).map(f => hasCombiningFilter(f)).filter(f => f == true).length > 0;
    }
    return false;
}

export default class FilterEditor extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }
    combiningFilter() {
        let filter = this.props.filter || ['all'];
        let combiningOp = filter[0];
        let filters = filter.slice(1);
        if (combiningFilterOps.indexOf(combiningOp) < 0) {
            combiningOp = 'all';
            filters = [filter.slice()];
        }
        return [combiningOp, ...filters];
    }

    onFilterPartChanged(filterIdx, newPart) {
        const newFilter = this.combiningFilter().slice();
        newFilter[filterIdx] = newPart;
        this.props.onChange(newFilter);
    }

    deleteFilterItem(filterIdx) {
        const newFilter = this.combiningFilter().slice();
        newFilter.splice(filterIdx + 1, 1);
        this.props.onChange(newFilter);
    }

    addFilterItem() {
        const newFilterItem = this.combiningFilter().slice();
        newFilterItem.push(['==', 'name', '']);
        this.props.onChange(newFilterItem);
    }

    renderEditorBlocks(filters) {
        return filters.map((filter, idx) =>
            <FilterEditorBlock
                key={idx}
                onDelete={this.deleteFilterItem.bind(null, idx)}
            >
                <SingleFilterEditor
                    properties={this.props.properties}
                    filter={filter}
                    onChange={this.onFilterPartChanged.bind(null, idx + 1)}
                />
            </FilterEditorBlock>);
    }

    render() {
        const filter = this.combiningFilter();
        const combiningOp = filter[0];
        const filters = filter.slice(1);
        if (hasNestedCombiningFilter(filter)) {
            return (
                <div className='maputnik-filter-editor-unsupported'>
                    暂不支持嵌套过滤条件
                </div>
            );
        }
        return (
            <div className='maputnik-filter-editor'>
                <div className='maputnik-filter-editor-compound-select' data-wd-key='layer-filter'>
                    <DocLabel
                        label='Compound Filter'
                        doc={`${latest.layer.filter.doc} Combine multiple filters together by using a compound filter.`}
                    />
                    <SelectInput
                        value={combiningOp}
                        onChange={this.onFilterPartChanged.bind(null, 0)}
                        options={[['all', 'every filter matches'], ['none', 'no filter matches'], ['any', 'any filter matches']]}
                    />
                </div>
                {this.renderEditorBlocks(filters)}
                <div className='maputnik-filter-editor-add-wrapper'>
                    <Button
                        data-wd-key='layer-filter-button'
                        className='maputnik-add-filter'
                        onClick={this.addFilterItem}
                    >
                        添加`Filter`
                    </Button>
                </div>
            </div>
        );
    }
}

FilterEditor.propTypes = {
    properties: PropTypes.object,
    filter: PropTypes.array,
    onChange: PropTypes.func.isRequired
};