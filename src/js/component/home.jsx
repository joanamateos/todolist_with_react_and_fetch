import React, { useState, useEffect } from "react";

export function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getAPI();
	}, []);

	const getAPI = () => {
		let todoLink =
			"https://assets.breatheco.de/apis/fake/todos/user/joanamateos";

		const fetchTodo = async () => {
			let todosList = await fetch(todoLink, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					if (resp.status == 404) {
						createAPI();
					} else {
						return resp.json();
					}
				})
				.then(data => setTodos(data))
				.catch(error => console.log(error));
		};
		fetchTodo();
	};

	const createAPI = () => {
		let todoLink =
			"https://assets.breatheco.de/apis/fake/todos/user/joanamateos";

		const fetchTodo = async () => {
			let todosList = await fetch(todoLink, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
				.then(resp => {
					if (resp.status == 200) {
						getAPI();
					}
				})
				.then(data => console.log(data))
				.catch(error => console.log(error));
		};
		fetchTodo();
	};

	const updateAPI = newData => {
		let todoLink =
			"https://assets.breatheco.de/apis/fake/todos/user/joanamateos";

		const fetchTodo = async () => {
			let todosList = await fetch(todoLink, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newData)
			})
				.then(resp => {
					if (resp.status == 200) {
						setTodos(newData);
					}
				})
				.then(data => console.log(data))
				.catch(error => console.log(error));
		};
		fetchTodo();
	};

	const deleteAPI = () => {
		let todoLink =
			"https://assets.breatheco.de/apis/fake/todos/user/joanamateos";

		const fetchTodo = async () => {
			let todosList = await fetch(todoLink, {
				method: "DELETE"
			})
				.then(resp => {
					if (resp.status == 200) {
						setTodos([]);
						return resp;
					}
				})
				.then(data => console.log(data))
				.catch(error => console.log(error));
		};
		fetchTodo();
	};

	const [inputValue, setInputValue] = useState("");

	const addTodo = e => {
		if (e.key == "Enter") {
			if (inputValue !== "") {
				const todosNew = todos.concat({
					label: inputValue,
					done: false
				});
				updateAPI(todosNew);
				setInputValue("");
			} else alert("Introduce una tarea");
		}
	};
	const removeTodo = task => {
		const removeItem = todos.filter(item => item.label !== task);
		if (removeItem.length > 0) {
			updateAPI(removeItem);
		} else {
			deleteAPI();
		}
	};
	const Todolist = () => {
		if (todos.length > 0) {
			return (
				<div>
					<ul className="list-group list-group-flush">
						{todos.map((item, index) => (
							<li
								className="list-group-item d-flex justify-content-between align-items-center"
								key={index}>
								{item.label}
								<button
									onClick={() => removeTodo(item.label)}
									className="btn btn-link">
									<i className="fas fa-times"></i>
								</button>
							</li>
						))}
					</ul>
					<hr className="solid" />
					<div className="float-left text-muted mt-2">
						{todos.length} tareas pendientes por completar
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<p>No hay tareas registradas, añade una tarea</p>
				</div>
			);
		}
	};
	return (
		<div className="container text-center mt-5 justify-content-center">
			<h1>Lista de tareas de Joana Mateos</h1>
			<div className="card cardtodos mx-auto">
				<div className="card-body">
					<div className="input-group mb-3 input-group-lg">
						<input
							type="text"
							className="form-control"
							placeholder="¿Qué tareas tienes pendientes?"
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							onKeyUp={addTodo}
						/>
					</div>
					<Todolist />
				</div>
				<div className="card-footer">
					<button type="button" onClick={() => deleteAPI()}>
						Borrar la lista
					</button>
				</div>
			</div>
		</div>
	);
}