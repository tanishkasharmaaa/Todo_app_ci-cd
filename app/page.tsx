import Image from "next/image";
import { Todo } from "./components/Todo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans ">
       <Todo/>
    </div>
  );
}
