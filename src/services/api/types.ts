/********** =========== Queries & Params for Api call ========== ***********/
export namespace APIParams {
  export interface PaginationParams {
    page?: number;
    limit?: number;
    hasNext?: boolean;
  }

  export interface Login {
    username: string | undefined;
    password: string | undefined;
  }


}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {


  export interface Pagination {
    page: number;
    limit: number;
    hasNext: boolean;
  }


  export interface Login {
    accessToken: string;
    accessTokenExpire: number;
    refreshToken: string;
    refreshTokenExpire: number;
    accountId: string;
  }

}
