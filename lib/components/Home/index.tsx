"use client";

import PhantomWalletButton from "@/lib/components/PhantomWalletButton";
import WalletAddressDisplay from "@/lib/components/WalletAddressDisplay";
import { applicationData } from "@/lib/data";
import useTodo from "@/lib/hooks/useTodo";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { publicKey, disconnect } = useWallet();
  const { todos, setTodos, addTodo, updateTodo, removeTodo } = useTodo();

  console.log({ todos });

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  const connectWallet = async () => {
    try {
      setConnected(!!publicKey);
      if (publicKey) {
        setWalletAddress(`${publicKey}`);
        // Load todos from local storage based on wallet address
        const savedTodos = localStorage.getItem(`todos_${publicKey}`);
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [publicKey]);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (connected && publicKey) {
      localStorage.setItem(`todos_${publicKey}`, JSON.stringify(todos));
    }
  }, [todos, connected, publicKey]);

  // Function to disconnect wallet
  const disconnectWallet = () => {
    disconnect();
    setWalletAddress("");
    setTodos([]);
  };

  // Add new todo
  const add = async (e: any) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo = {
      id: 1,
      text: newTodo.trim(),
      completed: false,
    };

    console.log({ todo, publicKey });

    await addTodo(todo, publicKey!);

    setNewTodo("");
  };

  // Toggle todo completion status
  const toggleTodo = async (id: number) => {
    await updateTodo(id, publicKey!);
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    await removeTodo(id, publicKey!);
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  // Calculate stats
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="h-[85vh]  bg-gray-900 text-gray-100">
      <div className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4 flex items-center">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-900/30 rounded-full border-2 border-purple-500/50 overflow-hidden flex items-center justify-center">
              <Image
                className="rounded-full object-cover"
                width={100}
                height={100}
                alt={`${applicationData.app.name}`}
                src="/sol-todo-logo.jpeg"
                quality={90}
              />
            </div>
          </div>

          {/* Wallet Section - Pushed to Right */}
          <div className="ml-auto">
            {!connected ? (
              <PhantomWalletButton title="Connect Phantom" />
            ) : (
              <div className="flex items-center gap-4">
                <WalletAddressDisplay walletAddress={walletAddress} />
                <button
                  onClick={disconnectWallet}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-1 px-3 rounded-lg text-sm transition-all"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome/Stats Banner */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {connected
                  ? "Welcome to Sol-Todo"
                  : "Connect Your Phantom Wallet"}
              </h1>
              <p className="text-gray-400 mb-4">
                {connected
                  ? "Your todo overview and recent activity"
                  : "Connect your wallet to access your Solana assets and activity"}
              </p>

              {!connected && <PhantomWalletButton title="Connect wallet" />}
            </div>

            {connected && (
              <div className="mt-4 md:mt-0 flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{todos.length}</p>
                  <p className="text-gray-400 text-sm">Total Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Todo section - Only visible when connected */}
        {connected && (
          <div className="grid grid-cols-1 gap-6">
            {/* Add new todo form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <form onSubmit={add} className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-grow bg-gray-900 text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Task
                </button>
              </form>
            </div>

            {/* Todo list */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Tasks</h2>
                <div className="flex bg-gray-900 rounded-lg">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded-l-lg transition-colors ${
                      filter === "all"
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={`px-3 py-1 transition-colors ${
                      filter === "active"
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`px-3 py-1 rounded-r-lg transition-colors ${
                      filter === "completed"
                        ? "bg-purple-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              {filteredTodos.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  {filter === "all"
                    ? "No tasks yet. Add your first task above!"
                    : filter === "active"
                    ? "No active tasks. All caught up!"
                    : "No completed tasks yet."}
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredTodos.map((todo, index) => (
                    <li
                      key={`${todo.id}-${index}`}
                      className="bg-gray-900 rounded-lg p-4 border border-gray-700 flex items-center justify-between group"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="mr-3 h-5 w-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <span
                          className={`${
                            todo.completed
                              ? "text-gray-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
