import { useState } from "react";
import "./App.css";
import { useSEO } from "./hooks/useSEO";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

// const INITIAL_ITEMS: Item[] = [
  // {
  //   id: crypto.randomUUID(),
  //   timestamp: Date.now(),
  //   text: "Video juegos",
  // },
  // {
  //   id: crypto.randomUUID(),
  //   timestamp: Date.now(),
  //   text: "Libros",
  // },
// ];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  useSEO({
    title: `[${items.length}] Mi prueba tecnica`,
    description: `Añadir y eleminar elementos de una lista`,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || !input.value) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text: input.value,
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id);
    });
  };
  return (
    <main>
      <aside>
        <h1>Mi prueba tecnica</h1>
        <h2>Añadir y eleminar elementos de una lista</h2>

        <form onSubmit={handleSubmit} aria-label= 'Añadir elementos a la lista'>
          <label>
            Elemento a introducir:
            <input name="item" required type="text" placeholder="VideoJuegos" />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
          items.length === 0 && <li>No hay elementos en la lista</li>
          }
          {items.map((item) => {
            return (
              <li key={item.id}>
                {item.text}
                <button onClick={createHandleRemoveItem(item.id)}>
                  Eliminar Elemento
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
