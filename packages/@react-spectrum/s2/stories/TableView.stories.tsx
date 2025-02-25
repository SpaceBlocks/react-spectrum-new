/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action} from '@storybook/addon-actions';
import {ActionButton, Cell, Column, Content, Heading, IllustratedMessage, Link, Row, TableBody, TableHeader, TableView} from '../src';
import {categorizeArgTypes} from './utils';
import FolderOpen from '../spectrum-illustrations/linear/FolderOpen';
import type {Meta} from '@storybook/react';
import {SortDescriptor} from 'react-aria-components';
import {style} from '../style/spectrum-theme' with {type: 'macro'};
import {useAsyncList} from '@react-stately/data';
import {useState} from 'react';

let onActionFunc = action('onAction');
let noOnAction = null;
const onActionOptions = {onActionFunc, noOnAction};

const meta: Meta<typeof TableView> = {
  component: TableView,
  parameters: {
    layout: 'centered',
    controls: {exclude: ['onResize']}
  },
  tags: ['autodocs'],
  args: {
    // Make sure onLoadMore isn't autogenerated
    // @ts-ignore
    onLoadMore: null,
    // Make sure onAction isn't autogenerated
    // @ts-ignore
    onAction: null
  },
  argTypes: {
    ...categorizeArgTypes('Events', ['onAction', 'onLoadMore', 'onResizeStart', 'onResize', 'onResizeEnd', 'onSelectionChange', 'onSortChange']),
    onAction: {
      options: Object.keys(onActionOptions), // An array of serializable values
      mapping: onActionOptions, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
          // 'labels' maps option values to string labels
          onActionFunc: 'onAction enabled',
          noOnAction: 'onAction disabled'
        }
      },
      table: {category: 'Events'}
    }
  }
};

export default meta;

const StaticTable = (args: any) => (
  <TableView aria-label="Files" {...args} styles={style({width: 320, height: 320})}>
    <TableHeader>
      <Column isRowHeader>Name</Column>
      <Column>Type</Column>
      <Column>Date Modified</Column>
      <Column>A</Column>
      <Column>B</Column>
    </TableHeader>
    <TableBody>
      <Row id="1">
        <Cell>Games</Cell>
        <Cell>File folder</Cell>
        <Cell>6/7/2020</Cell>
        <Cell>Dummy content</Cell>
        <Cell>Long long long long long long long cell</Cell>
      </Row>
      <Row id="2">
        <Cell>Program Files</Cell>
        <Cell>File folder</Cell>
        <Cell>4/7/2021</Cell>
        <Cell>Dummy content</Cell>
        <Cell>Long long long long long long long cell</Cell>
      </Row>
      <Row id="3">
        <Cell>bootmgr</Cell>
        <Cell>System file</Cell>
        <Cell>11/20/2010</Cell>
        <Cell>Dummy content</Cell>
        <Cell>Long long long long long long long cell</Cell>
      </Row>
    </TableBody>
  </TableView>
);

export const Example = {
  render: StaticTable,
  args: {
    selectionMode: 'multiple',
    onResize: null,
    onResizeStart: null,
    onResizeEnd: null,
    onLoadMore: null
  }
};

export const DisabledRows = {
  ...Example,
  args: {
    ...Example.args,
    disabledKeys: ['2']
  }
};

let columns = [
  {name: 'Foo', id: 'foo', isRowHeader: true},
  {name: 'Bar', id: 'bar'},
  {name: 'Baz', id: 'baz'},
  {name: 'Yah', id: 'yah'}
];

let items = [
  {id: 1, foo: 'Foo 1', bar: 'Bar 1', baz: 'Baz 1', yah: 'Yah long long long 1'},
  {id: 2, foo: 'Foo 2', bar: 'Bar 2', baz: 'Baz 2', yah: 'Yah long long long 2'},
  {id: 3, foo: 'Foo 3', bar: 'Bar 3', baz: 'Baz 3', yah: 'Yah long long long 3'},
  {id: 4, foo: 'Foo 4', bar: 'Bar 4', baz: 'Baz 4', yah: 'Yah long long long 4'},
  {id: 5, foo: 'Foo 5', bar: 'Bar 5', baz: 'Baz 5', yah: 'Yah long long long 5'},
  {id: 6, foo: 'Foo 6', bar: 'Bar 6', baz: 'Baz 6', yah: 'Yah long long long 6'},
  {id: 7, foo: 'Foo 7', bar: 'Bar 7', baz: 'Baz 7', yah: 'Yah long long long 7'},
  {id: 8, foo: 'Foo 8', bar: 'Bar 8', baz: 'Baz 8', yah: 'Yah long long long 8'},
  {id: 9, foo: 'Foo 9', bar: 'Bar 9', baz: 'Baz 9', yah: 'Yah long long long 9'},
  {id: 10, foo: 'Foo 10', bar: 'Bar 10', baz: 'Baz 10', yah: 'Yah long long long 10'}
];

const DynamicTable = (args: any) => (
  <TableView aria-label="Dynamic table" {...args} styles={style({width: 320, height: 208})}>
    <TableHeader columns={columns}>
      {(column) => (
        <Column width={150} minWidth={150} isRowHeader={column.isRowHeader}>{column.name}</Column>
      )}
    </TableHeader>
    <TableBody items={items}>
      {item => (
        <Row id={item.id} columns={columns}>
          {(column) => {
            return <Cell>{item[column.id]}</Cell>;
          }}
        </Row>
      )}
    </TableBody>
  </TableView>
);

export const Dynamic = {
  render: DynamicTable,
  args: {
    ...Example.args,
    disabledKeys: ['Foo 5']
  }
};

function renderEmptyState() {
  return (
    <IllustratedMessage>
      <FolderOpen />
      <Heading>
        No results
      </Heading>
      <Content>
        <Content>No results found, press <Link href="https://adobe.com" onPress={action('linkPress')}>here</Link> for more info.</Content>
      </Content>
    </IllustratedMessage>
  );
}

const EmptyStateTable = (args: any) => (
  <TableView aria-label="Empty state" {...args} styles={style({height: 320, width: 320})}>
    <TableHeader columns={columns}>
      {(column) => (
        <Column minWidth={200} width={200} isRowHeader={column.isRowHeader}>{column.name}</Column>
      )}
    </TableHeader>
    <TableBody items={[]} renderEmptyState={renderEmptyState}>
      {[]}
    </TableBody>
  </TableView>
);

export const EmptyState = {
  render: EmptyStateTable,
  args: {
    ...Example.args
  }
};

export const LoadingStateNoItems = {
  render: EmptyStateTable,
  args: {
    ...Example.args,
    loadingState: 'loading'
  },
  name: 'loading state, no items',
  parameters: {
    docs: {
      disable: true
    }
  }
};

export const LoadingStateWithItems = {
  render: DynamicTable,
  args: {
    ...Example.args,
    loadingState: 'loadingMore'
  },
  name: 'loading state, has items',
  parameters: {
    docs: {
      disable: true
    }
  }
};

export const LoadingStateWithItemsStatic = {
  render: StaticTable,
  args: {
    ...Example.args,
    loadingState: 'loadingMore'
  },
  name: 'loading state, static items',
  parameters: {
    docs: {
      disable: true
    }
  }
};

let dividerColumns = [
  {name: 'Foo', id: 'foo', isRowHeader: true, showDivider: true},
  {name: 'Bar', id: 'bar'},
  {name: 'Baz', id: 'baz', showDivider: true},
  {name: 'Yah', id: 'yah'}
];

const ShowDividers = (args: any) => {
  return (
    <TableView aria-label="Show Dividers table" {...args} styles={style({width: 320, height: 208})}>
      <TableHeader columns={dividerColumns}>
        {(column) => (
          <Column width={150} minWidth={150} isRowHeader={column.isRowHeader}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <Row id={item.id} columns={dividerColumns}>
            {(column) => {
              return <Cell showDivider={column.showDivider}>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const ShowDividersStory = {
  render: ShowDividers,
  args: {
    ...Example.args
  },
  name: 'show dividers'
};

let alignColumns = [
  {name: 'Foo', id: 'foo', isRowHeader: true},
  {name: 'Bar', id: 'bar', align: 'center'},
  {name: 'Baz', id: 'baz', align: 'end'},
  {name: 'Yah', id: 'yah', align: 'end'}
];

const TextAlign = (args: any) => {
  return (
    <TableView aria-label="Show Dividers table" {...args} styles={style({width: 320, height: 208})}>
      <TableHeader columns={alignColumns}>
        {(column) => (
          <Column width={150} minWidth={150} isRowHeader={column.isRowHeader} align={column?.align as 'start' | 'center' | 'end'}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <Row id={item.id} columns={alignColumns}>
            {(column) => {
              return <Cell showDivider align={column?.align as 'start' | 'center' | 'end'}>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const TextAlignStory = {
  render: TextAlign,
  args: {
    ...Example.args
  },
  name: 'text align'
};

interface Character {
  name: string,
  height: number,
  mass: number,
  birth_year: number
}

const OnLoadMoreTable = (args: any) => {
  let list = useAsyncList<Character>({
    async load({signal, cursor}) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // Slow down load so progress circle can appear
      await new Promise(resolve => setTimeout(resolve, 2000));
      let res = await fetch(cursor || 'https://swapi.py4e.com/api/people/?search=', {signal});
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  return (
    <TableView {...args} aria-label="Load more table" loadingState={list.loadingState} onLoadMore={list.loadMore} styles={style({width: 320, height: 320})}>
      <TableHeader>
        <Column id="name" isRowHeader>Name</Column>
        <Column id="height">Height</Column>
        <Column id="mass">Mass</Column>
        <Column id="birth_year">Birth Year</Column>
      </TableHeader>
      <TableBody
        items={list.items}>
        {(item) => (
          <Row id={item.name}>
            <Cell>{item.name}</Cell>
            <Cell>{item.height}</Cell>
            <Cell>{item.mass}</Cell>
            <Cell>{item.birth_year}</Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const OnLoadMoreTableStory  = {
  render: OnLoadMoreTable,
  args: {
    ...Example.args
  },
  name: 'async loading table'
};

let sortcolumns = [
  {name: 'Name', id: 'name', isRowHeader: true},
  {name: 'Height', id: 'height'},
  {name: 'Weight', id: 'weight'}
];

let sortitems = [
  {id: 1, name: 'A', height: '1', weight: '3'},
  {id: 2, name: 'B', height: '2', weight: '1'},
  {id: 3, name: 'C', height: '3', weight: '4'},
  {id: 4, name: 'D', height: '4', weight: '2'},
  {id: 5, name: 'E', height: '5', weight: '3'},
  {id: 6, name: 'F', height: '6', weight: '1'},
  {id: 7, name: 'G', height: '7', weight: '4'},
  {id: 8, name: 'H', height: '8', weight: '2'},
  {id: 9, name: 'I', height: '9', weight: '3'},
  {id: 10, name: 'J', height: '10', weight: '1'},
  {id: 11, name: 'K', height: '11', weight: '4'},
  {id: 12, name: 'L', height: '12', weight: '2'},
  {id: 13, name: 'M', height: '13', weight: '3'},
  {id: 14, name: 'N', height: '14', weight: '1'},
  {id: 15, name: 'O', height: '15', weight: '4'},
  {id: 16, name: 'P', height: '16', weight: '2'},
  {id: 17, name: 'Q', height: '17', weight: '3'},
  {id: 18, name: 'R', height: '18', weight: '1'},
  {id: 19, name: 'S', height: '19', weight: '4'},
  {id: 20, name: 'T', height: '20', weight: '2'}
];

const SortableTable = (args: any) => {
  let [items, setItems] = useState(sortitems);
  let [sortDescriptor, setSortDescriptor] = useState({});
  let onSortChange = (sortDescriptor: SortDescriptor) => {
    let {direction = 'ascending', column = 'name'} = sortDescriptor;

    let sorted = items.slice().sort((a, b) => {
      let cmp = a[column] < b[column] ? -1 : 1;
      if (direction === 'descending') {
        cmp *= -1;
      }
      return cmp;
    });

    setItems(sorted);
    setSortDescriptor(sortDescriptor);
  };

  return (
    <TableView aria-label="sortable table" {...args} sortDescriptor={sortDescriptor} onSortChange={onSortChange} styles={style({height: 320})}>
      <TableHeader columns={sortcolumns}>
        {(column) => (
          <Column isRowHeader={column.isRowHeader} allowsSorting>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <Row id={item.id} columns={sortcolumns}>
            {(column) => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const Sorting = {
  ...Example,
  render: SortableTable,
  name: 'sortable'
};

let resizeColumn = [
  {name: 'Name', id: 'name', isRowHeader: true, allowsResizing: true, showDivider: true, align: 'end'},
  {name: 'Height', id: 'height', align: 'center'},
  {name: 'Weight', id: 'weight', allowsResizing: true, align: 'center'}
];

let sortResizeColumns = [
  {name: 'Name', id: 'name', isRowHeader: true, allowsResizing: true, showDivider: true, isSortable: true},
  {name: 'Height', id: 'height', isSortable: true},
  {name: 'Weight', id: 'weight', allowsResizing: true, isSortable: true}
];

const SortableResizableTable = (args: any) => {
  let {isSortable} = args;
  let [items, setItems] = useState(sortitems);
  let [sortDescriptor, setSortDescriptor] = useState({});
  let onSortChange = (sortDescriptor: SortDescriptor) => {
    let {direction = 'ascending', column = 'name'} = sortDescriptor;

    let sorted = items.slice().sort((a, b) => {
      let cmp = a[column] < b[column] ? -1 : 1;
      if (direction === 'descending') {
        cmp *= -1;
      }
      return cmp;
    });

    setItems(sorted);
    setSortDescriptor(sortDescriptor);
  };

  return (
    <TableView aria-label="sortable table" {...args} sortDescriptor={isSortable ? sortDescriptor : null} onSortChange={isSortable ? onSortChange : null} styles={style({width: 384, height: 320})}>
      <TableHeader columns={args.columns}>
        {(column: any) => (
          <Column isRowHeader={column.isRowHeader} allowsSorting={column.isSortable} allowsResizing={column.allowsResizing} align={column.align}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <Row id={item.id} columns={args.columns}>
            {(column: any) => {
              return <Cell showDivider={column.showDivider} align={column.align}>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};

export const ResizingTable = {
  render: SortableResizableTable,
  args: {
    onResizeStart: action('onResizeStart'),
    onResizeEnd: action('onResizeEnd'),
    columns: resizeColumn,
    isSortable: false
  },
  name: 'resizing only table'
};

export const ResizingSortableTable = {
  render: SortableResizableTable,
  args: {
    onResizeStart: action('onResizeStart'),
    onResizeEnd: action('onResizeEnd'),
    columns: sortResizeColumns,
    isSortable: true
  },
  name: 'resizing and sortable table'
};

function AsyncLoadingExample(props) {
  interface Item {
    data: {
      id: string,
      url: string,
      title: string
    }
  }

  let columns = [
    {name: 'Score', id: 'score', defaultWidth: 100, allowsResizing: true, allowsSorting: true},
    {name: 'Title', id: 'title', allowsResizing: true, allowsSorting: true, isRowHeader: true},
    {name: 'Author', id: 'author', defaultWidth: 200, allowsResizing: true, allowsSorting: true},
    {name: 'Comments', id: 'num_comments', defaultWidth: 100, allowsResizing: true, allowsSorting: true}
  ];

  let list = useAsyncList<Item>({
    getKey: (item) => item.data.id,
    async load({signal, cursor}) {
      let url = new URL('https://www.reddit.com/r/upliftingnews.json');
      if (cursor) {
        url.searchParams.append('after', cursor);
      }
      let res = await fetch(url.toString(), {signal});
      let json = await res.json();
      return {items: json.data.children, cursor: json.data.after};
    },
    sort({items, sortDescriptor}) {
      return {
        items: items.length > 0 ? items.slice().sort((a, b) => {
          if (sortDescriptor.column != null) {
            let cmp = a.data[sortDescriptor.column] < b.data[sortDescriptor.column] ? -1 : 1;
            if (sortDescriptor.direction === 'descending') {
              cmp *= -1;
            }
            return cmp;
          } else {
            return 1;
          }
        }) : []
      };
    }
  });

  return (
    <div>
      <ActionButton styles={style({marginBottom: 8})} onPress={() => list.remove(list.items[0].data.id)}>Remove first item</ActionButton>
      <TableView {...props} aria-label="Reddit table" sortDescriptor={list.sortDescriptor} onSortChange={list.sort} selectedKeys={list.selectedKeys} onSelectionChange={list.setSelectedKeys} loadingState={list.loadingState} onLoadMore={list.loadMore} styles={style({width: 1000, height: 400})}>
        <TableHeader columns={columns}>
          {(column) => (
            <Column {...column}>
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={list.items}>
          {item =>
            (<Row id={item.data.id} columns={columns}>
              {(column) => {
                return column.id === 'title'
                  ? <Cell textValue={item.data.title}><Link href={item.data.url} target="_blank" isQuiet>{item.data.title}</Link></Cell>
                  : <Cell>{item.data[column.id]}</Cell>;
              }}
            </Row>)
          }
        </TableBody>
      </TableView>
    </div>
  );
}

export const ResizingUncontrolledSortableColumns = {
  render: (args) => <AsyncLoadingExample {...args} />,
  args: {
    ...Example.args,
    onResizeStart: action('onResizeStart'),
    onResizeEnd: action('onResizeEnd')
  },
  name: 'resizable, sortable, reddit example',
  parameters: {
    docs: {
      disable: true
    }
  }
};

let manyColumns = [] as {name: string, id: string}[];
for (let i = 0; i < 100; i++) {
  manyColumns.push({name: 'Column ' + i, id: 'C' + i});
}

let manyRows = [] as {id: string}[];
for (let i = 0; i < 1000; i++) {
  let row = {id: 'R' + i};
  for (let j = 0; j < 100; j++) {
    row['C' + j] = `${i}, ${j}`;
  }

  manyRows.push(row);
}

export const ManyItems = {
  render: (args) => (
    <TableView aria-label="Many items table" {...args} styles={style({width: 800, height: 400})}>
      <TableHeader columns={manyColumns}>
        {(column) => (
          <Column width={100} minWidth={100} isRowHeader={column.name === 'Column 1'}>{column.name}</Column>
        )}
      </TableHeader>
      <TableBody items={manyRows}>
        {item => (
          <Row id={item.id} columns={manyColumns}>
            {(column) => {
              return <Cell>{item[column.id]}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  ),
  args: {
    ...Example.args
  },
  name: 'many items table',
  parameters: {
    docs: {
      disable: true
    }
  }
};

export const FlexHeight = {
  render: (args) => (
    <div className={style({display: 'flex', width: 400, height: 400, alignItems: 'stretch', flexDirection: 'column'})}>
      <div className={style({backgroundColor: 'blue-200'})}>Flex child 1</div>
      <TableView aria-label="Many items table" {...args}>
        <TableHeader columns={manyColumns}>
          {(column) => (
            <Column width={100} minWidth={100} isRowHeader={column.name === 'Column 1'}>{column.name}</Column>
          )}
        </TableHeader>
        <TableBody items={manyRows}>
          {item => (
            <Row id={item.id} columns={manyColumns}>
              {(column) => {
                return <Cell>{item[column.id]}</Cell>;
              }}
            </Row>
          )}
        </TableBody>
      </TableView>
      <div className={style({backgroundColor: 'blue-200'})}>Flex child 2</div>
    </div>
  ),
  args: {
    ...Example.args
  },
  parameters: {
    docs: {
      disable: true
    }
  },
  name: 'flex calculated height, flex direction column'
};


export const FlexWidth = {
  render: (args) => (
    <div className={style({display: 'flex', width: 400, height: 400, alignItems: 'stretch'})}>
      <div className={style({backgroundColor: 'blue-200'})}>Flex child 1</div>
      <TableView aria-label="Many items table" {...args}>
        <TableHeader columns={manyColumns}>
          {(column) => (
            <Column width={100} minWidth={100} isRowHeader={column.name === 'Column 1'}>{column.name}</Column>
          )}
        </TableHeader>
        <TableBody items={manyRows}>
          {item => (
            <Row id={item.id} columns={manyColumns}>
              {(column) => {
                return <Cell>{item[column.id]}</Cell>;
              }}
            </Row>
          )}
        </TableBody>
      </TableView>
      <div className={style({backgroundColor: 'blue-200'})}>Flex child 2</div>
    </div>
  ),
  args: {
    ...Example.args
  },
  parameters: {
    docs: {
      disable: true
    }
  },
  name: 'flex calculated height, flex direction row'
};
