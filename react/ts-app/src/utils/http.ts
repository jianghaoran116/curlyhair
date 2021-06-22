import { useCallback } from 'react';
import qs from 'qs';
import * as auth from '../auth-provider';
import { useAuth } from '../context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: object;
}

/**
 * http请求
 * @param endpoint - 请求的路径
 * @param Config - 配置
 * @returns - thenable
 */
export const http = async (
    endpoint,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    }

    // get请求要带到URL里
    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) { // token或者未登陆 restful规范
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        });
}

export const useHttp = () => {
    const { user } = useAuth();
    // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    );
};