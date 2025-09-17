import { useQueryClient as useReactQueryClient } from "@tanstack/react-query";

export const useQueryClient = () => {
  return useReactQueryClient();
};

export default useQueryClient;