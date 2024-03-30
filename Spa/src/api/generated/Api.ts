/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { WeatherForecast } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name GetWeatherForecast
   * @request GET:/api/weatherforecast
   */
  getWeatherForecast = (params: RequestParams = {}) =>
    this.request<WeatherForecast[], any>({
      path: `/api/weatherforecast`,
      method: "GET",
      format: "json",
      ...params,
    });
}
