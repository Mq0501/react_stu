import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  addToNumber,
} from "./store/modules/counterStore";
import { useEffect } from "react";
import { fetchChannels } from "./store/modules/channelStore";

export default function App() {
  const { count } = useSelector((state) => state.counter);
  const { channels } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  // 使用useEffect触发异步请求执行
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNumber(10))}>to 10</button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
}
