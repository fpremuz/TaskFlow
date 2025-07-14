export function useAuth() {
  const token = localStorage.getItem("token");
  return { token, isAuthenticated: !!token };
}