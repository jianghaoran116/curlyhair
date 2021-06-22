import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, delay) => {

}

export const useArray = <T>(initArr: T[]) => {
    const [value, setValue] = useState(initArr);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (idx: number) => {
            const copy = [...value];
            copy.splice(idx, 1);
            setValue(copy);
        }
    }
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
}


/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
 export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};