import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../Item-status-filter";
import TodoList from "../todo-list";
import './app.css';
import ItemAddForm from "../item-add-form";



export default class App extends Component {

    maxId = 1;

    state  = {
        todoData: [
            this.createTodoItem('Drink Coffee'), //{ label: 'Drink Coffee', important: false, id: 1, done: false },
            this.createTodoItem('Make Awesome App'), //{ label: 'Make Awesome App', important: true, id: 2, done: false },
            this.createTodoItem('Have a lunch')  //{ label: 'Have a lunch', important: false, id: 3, done: false }
        ],
        term: '',
        filter: 'all' // active, all, done
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deletedItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            //todoData.splice(idx, 1); Нельзя изменять существующий state
            // [a, b, c, d, e]
            // [a, b,    d, e]
            // [before][after]
            //const before = todoData.slice(0,idx);
            //const after = todoData.slice(idx+1);
            const newArray = [
                ...todoData.slice(0,idx),
                ...todoData.slice(idx+1)
            ];

            return {
                todoData: newArray
            }
        })
    };
    addItem = (text) => {
        // Generate new ID
        const newItem =this.createTodoItem(text)
        /*const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        }*/
        // Add Item
        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [ ...arr.slice(0,idx), newItem, ...arr.slice(idx+1) ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    search(items, term) {
        if (term.length === 0 ) return items;

        return items.filter((item) => {
            return item.label.toUpperCase().indexOf(term.toUpperCase()) > -1;
        });
    }

    filter(items, filter) {
        switch (filter) {
            case 'active': return items.filter((item) => !item.done);
            case 'done': return items.filter((item) =>  item.done);
            default: return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deletedItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    }
};
