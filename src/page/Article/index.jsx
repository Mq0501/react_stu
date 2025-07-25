import { Link, useNavigate } from "react-router";

export default function Article() {
  const navigate = useNavigate();
  return (
    <div>
      我是文章页
      {/* 声明式写法 */}
      <Link to="/login">跳转到登录 </Link>
      {/* 命令式写法 */}
      <button onClick={() => navigate("/login")}>跳转到登录页</button>
      {/* <button onClick={() => navigate("/login?id=001&name=sys")}>
        searchParams传参
      </button> */}
      <button onClick={() => navigate("/login/002")}>params传参</button>
    </div>
  );
}
