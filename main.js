#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let answer = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        }
    ]);
    if (answer.select === "Add") {
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "add items in the list",
                validate: function (input) {
                    if (input.trim() == "") {
                        return "Please enter a non-empty item.";
                    }
                    return true;
                }
            }
        ]);
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (answer.select === "Update") {
        let UpdateTodo = await inquirer.prompt([
            {
                name: "changeValue",
                type: "list",
                message: "Update items in the list",
                choices: todos.map(item => item)
            }
        ]);
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add items in the list",
            }
        ]);
        let newTodo = todos.filter(val => val !== UpdateTodo.changeValue);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (answer.select === "View") {
        console.log("***** TO_DO LIST *****");
        todos.forEach(todo => console.log(todo));
    }
    if (answer.select === "Delete") {
        let DeleteTodo = await inquirer.prompt([
            {
                name: "deleteValue",
                type: "list",
                message: "Select items to delete",
                choices: todos.map(item => item)
            }
        ]);
        let newTodo = todos.filter(val => val !== DeleteTodo.deleteValue);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    if (answer.select === "Exit") {
        console.log("Exiting Program...");
        condition = false;
    }
}
