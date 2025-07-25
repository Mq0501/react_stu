import { useSearchParams, useParams } from "react-router";

export default function Login() {
//   const [params] = useSearchParams();
//   let id = params.get("id");
  const id = useParams().id;
  console.log(id);
  return <div>我是登录页{id}</div>;
}
