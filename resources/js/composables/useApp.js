import { useAppStore } from "@/stores/appStore";

export const useApp = () => {
    const store = useAppStore();

    return {
        store,
    };
};