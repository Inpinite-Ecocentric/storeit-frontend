/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosInstance as AxiosType } from "axios";
import Cookies from "js-cookie";
import { Token } from "../types/Token";
import { ApiDetails } from "../constants/Api";
import CookieService from "./CookieService";



const BASE_URL = "";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

export default class AxiosService{
    public axiosInstance: AxiosType;
    private cookie = new CookieService();

    constructor(){
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers:{
                "Content-Type" : "application/json",
            },
        });

        this.setRequestInterceptors();
        this.setResponseInterceptors();
    }

    private setRequestInterceptors(){
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                if(config.headers["needsBearer"]){
                    const accessToken = Cookies.get("accessToken")?.valueOf();
                    if(accessToken){
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    } 
                }
                return config;
            }
        )
    }

    private setResponseInterceptors(){
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error : AxiosError) => {
                const originalRequest = error.config as CustomAxiosRequestConfig;

                if(error.response?.status === 401 && !originalRequest._retry){
                    originalRequest._retry = true;

                    try {
                        await this.validateRefreshToken();

                        const newAccessToken = Cookies.get("accessToken")?.valueOf();

                        if(originalRequest.headers){
                            
                            (originalRequest.headers)["Authorization"] = `Bearer ${newAccessToken}`
                        }
                        return this.axiosInstance(originalRequest);
                    } catch(error){
                        console.log(error);
                    }
                } 
            }
        )
    }

    private async validateRefreshToken(): Promise<any> {
        const api = ApiDetails.refreshToken;
        const url = `${BASE_URL}${api[0]}`;

        const refreshToken = Cookies.get("refreshToken")?.valueOf();

        const res = await axios.post(url, {
            refreshToken: refreshToken,
        },{
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data: Token = res.data;
        this.cookie.SetCookies(data);

        return true;
    }

    public get instance(): AxiosType {
        return this.axiosInstance;
      }
}