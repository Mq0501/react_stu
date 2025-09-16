import { RouteObject } from "react-router-dom";
import { RouteItem } from "@/types/route";

// 动态导入组件（根据后端返回的component路径）
const loadComponent = (componentPath: string) => {
  // 假设组件都放在src/pages目录下，后端返回的路径如"Home"、"User/List"
  return async () => import(`@/pages/admin/${componentPath}`);
};

// 将后端路由配置转换为React Router配置
export const convertRoutes = (backendRoutes: RouteItem[]): RouteObject[] => {
  return backendRoutes.map((route) => {
    const routeObj: RouteObject = {
      path: route.path,
      name: route.name,
      element: route.component ? (
        <RouteComponentLoader componentPath={route.component} />
      ) : null,
      meta: route.meta, // 保留元信息供后续使用
    };

    // 处理子路由
    if (route.children && route.children.length > 0) {
      routeObj.children = convertRoutes(route.children);
    }

    // 处理重定向
    if (route.redirect) {
      routeObj.redirect = route.redirect;
    }

    return routeObj;
  });
};

// 组件加载器（处理加载状态和错误）
const RouteComponentLoader: React.FC<{ componentPath: string }> = ({
  componentPath,
}) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    loadComponent(componentPath)()
      .then((module) => {
        setComponent(module.default);
        setError(null);
      })
      .catch((err) => {
        setError(`组件加载失败: ${err.message}`);
        console.error("组件加载错误:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [componentPath]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;
  if (Component) return <Component />;
  return null;
};
