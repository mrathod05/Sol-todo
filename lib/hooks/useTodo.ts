import { useEffect, useState } from "react";
import useProgram from "./useProgram";
import usePda from "./usePda";
import { PublicKey } from "@solana/web3.js";

type Todo = { id: number; text: string; completed: boolean };

const useTodo = () => {
  const program = useProgram();
  const { getTodoPda } = usePda();
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const list = await program?.account.todo.all([]);

    if (list?.length) {
      const decodedTodos = list.map((ta) => ({
        ...ta.account,
        text: new TextDecoder("utf-8").decode(ta.account.text), // Decode text field
      }));

      console.log(decodedTodos); // Debugging

      setTodos(decodedTodos as Todo[]); // Store only accounts
      return;
    }

    setTodos([]);
  };

  const addTodo = async (todo: Todo, user: PublicKey) => {
    try {
      const { id, text, completed } = todo;
      const todoPda = getTodoPda(id, user);
      await program?.methods
        .initializeTodo(id, text, completed)
        .accounts({
          todo: todoPda,
          user,
          systemProgram: PublicKey.default,
        })
        .rpc();

      await fetchTodos();
    } catch (error) {
      console.error({ error });
      alert("Some thing went wrong");
    }
  };

  const updateTodo = async (id: Todo["id"], user: PublicKey) => {
    try {
      const todoPda = getTodoPda(id, user);
      await program?.methods
        .updateTodo(id)
        .accounts({
          todo: todoPda,
          user,
          systemProgram: PublicKey.default,
        })
        .rpc();

      await fetchTodos();
    } catch (error) {
      console.error({ error });
      alert("Some thing went wrong");
    }
  };

  const removeTodo = async (id: Todo["id"], user: PublicKey) => {
    try {
      const todoPda = getTodoPda(id, user);
      await program?.methods
        .removeTodo(id)
        .accounts({
          todo: todoPda,
          user,
          systemProgram: PublicKey.default,
        })
        .rpc();

      await fetchTodos();
    } catch (error) {
      console.error({ error });
      alert("Some thing went wrong");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [program]);

  return {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    removeTodo,
  };
};

export default useTodo;
