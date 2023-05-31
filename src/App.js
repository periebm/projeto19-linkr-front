import { useState } from "react";
import DialogBox from "./components/Dialog";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <SearchBar/>
      <button onClick={()=> setShowModal(true)}>Abrir Modal</button>
      <DialogBox 
        showModal={showModal}
        setShowModal={setShowModal}/>
    </div>
  );
}